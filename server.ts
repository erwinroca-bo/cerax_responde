import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Body parser with 50mb limit for PDF and presentation documents
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Server-side Gemini initialization as mandated by gemini-api skill
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Admin list and authorized users state
interface UserProfile {
  email: string;
  name: string;
  role: 'admin' | 'compliance_officer' | 'investor' | 'legal_counsel';
  status: 'authorized' | 'pending' | 'revoked';
  requestedAt: string;
  authorizedAt?: string;
  authorizedBy?: string;
  institution?: string;
}

let authorizedUsers: UserProfile[] = [
  {
    email: 'ervinroca@gmail.com',
    name: 'Ervin Roca (Admin Propietario)',
    role: 'admin',
    status: 'authorized',
    requestedAt: '2025-01-01T00:00:00.000Z',
    authorizedAt: '2025-01-01T00:00:00.000Z',
    authorizedBy: 'SYSTEM_OWNER',
    institution: 'CERAX Capital Holdings',
  },
  {
    email: 'erwinroca@gmail.com',
    name: 'Erwin Roca (Admin Principal)',
    role: 'admin',
    status: 'authorized',
    requestedAt: '2025-01-01T00:00:00.000Z',
    authorizedAt: '2025-01-01T00:00:00.000Z',
    authorizedBy: 'SYSTEM_OWNER',
    institution: 'CERAX Capital Holdings',
  },
  {
    email: 'alejandro.valenzuela@pabsa.online',
    name: 'Dr. Alejandro Valenzuela',
    role: 'compliance_officer',
    status: 'authorized',
    requestedAt: '2025-01-10T10:00:00.000Z',
    authorizedAt: '2025-01-10T11:00:00.000Z',
    authorizedBy: 'ervinroca@gmail.com',
    institution: 'PABSA S.A. (Paraguay)',
  },
  {
    email: 'inversor.acreditado@familyoffice.com',
    name: 'Inversor Calificado Binacional',
    role: 'investor',
    status: 'authorized',
    requestedAt: '2025-02-01T15:30:00.000Z',
    authorizedAt: '2025-02-02T09:00:00.000Z',
    authorizedBy: 'ervinroca@gmail.com',
    institution: 'Andean Private Wealth Escrow',
  },
];

// Conversation sessions memory store
interface ConversationSession {
  id: string;
  title: string;
  updatedAt: string;
  documentName?: string;
  messages: Array<{
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
    audioUrl?: string;
    citations?: string[];
  }>;
}

let conversations: ConversationSession[] = [
  {
    id: 'session-demo-1',
    title: 'Análisis Art. 18 Ley 7572 & 11 Torres La Nueva Santa Cruz',
    updatedAt: new Date().toISOString(),
    documentName: 'Dossier_Fiduciario_11_Torres_SantaCruz.pdf',
    messages: [
      {
        id: 'msg-1',
        role: 'user',
        content: '¿Cómo garantizamos que la emisión de los derechos de frutos de las 11 torres en La Nueva Santa Cruz no califique como captación masiva ilegal?',
        timestamp: '15:32',
      },
      {
        id: 'msg-2',
        role: 'assistant',
        content: 'Conforme al Art. 18 de la Ley 7572/2025 de Paraguay, el mega-proyecto "La Nueva Santa Cruz" (11 torres) opera estrictamente bajo colocación privada dirigida a inversores acreditados (ticket mínimo $25,000 USD), sin oferta pública masiva ni intermediación bancaria pasiva. El vehículo SPV cerrado en Asunción (PABSA S.A.) actúa como patrimonio autónomo inembargable canalizado mediante Escrow fiduciario en Banco Continental / BCP.',
        timestamp: '15:32',
        citations: ['Ley 7572/2025 Art. 18', 'Escritura Pública N° 412/2024', 'Circular ASFI/Dir-024'],
      },
    ],
  },
];

// --- AUTH API ROUTES ---
app.get('/api/auth/users', (_req, res) => {
  res.json({ success: true, users: authorizedUsers });
});

app.post('/api/auth/request-access', (req, res) => {
  const { email, name, institution } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email es requerido' });
  }

  const existing = authorizedUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.json({ success: true, user: existing, message: 'Usuario ya registrado' });
  }

  const newUser: UserProfile = {
    email: email.toLowerCase(),
    name: name || email.split('@')[0],
    role: 'investor',
    status: 'pending',
    requestedAt: new Date().toISOString(),
    institution: institution || 'Institución Externa',
  };

  authorizedUsers.push(newUser);
  return res.json({
    success: true,
    user: newUser,
    message: 'Solicitud enviada. El administrador (ervinroca@gmail.com) debe autorizar su acceso.',
  });
});

app.post('/api/auth/authorize', (req, res) => {
  const { adminEmail, targetEmail, action, role } = req.body;

  const isAdmin =
    adminEmail &&
    (adminEmail.toLowerCase() === 'ervinroca@gmail.com' ||
      adminEmail.toLowerCase() === 'erwinroca@gmail.com');

  if (!isAdmin) {
    return res.status(403).json({
      error: 'Acceso denegado: Solo el administrador (ervinroca@gmail.com) puede modificar accesos.',
    });
  }

  const user = authorizedUsers.find((u) => u.email.toLowerCase() === targetEmail.toLowerCase());
  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  if (action === 'approve') {
    user.status = 'authorized';
    user.authorizedAt = new Date().toISOString();
    user.authorizedBy = adminEmail;
    if (role) user.role = role;
  } else if (action === 'revoke') {
    user.status = 'revoked';
  } else if (action === 'update_role' && role) {
    user.role = role;
  }

  return res.json({ success: true, user, users: authorizedUsers });
});

// --- GEMINI API ROUTES ---

// Chat with Gemini Specialist (Dr. Alejandro Valenzuela context)
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { message, history = [], documentContext = '', activeSlide = null } = req.body;

    const systemInstruction = `
Eres el Dr. Alejandro Valenzuela, Oficial de Cumplimiento Senior y Especialista Fiduciario Principal de CERAX RESPONDE, PABSA S.A. (Paraguay) y ESBA S.R.L. (Bolivia).
Tu función es actuar como el especialista de voz interactivo y consultor legal-fiduciario para inversionistas acreditados, directores y comités de riesgo.

Contexto del Negocio y Activos:
- Mega-proyecto RWA: "La Nueva Santa Cruz" (Smart City Corporativa & Residencial, Bolivia).
- 11 Torres ya construidas y concluidas físicamente (Riesgo de obra: 0%, ocupación/entrega 82% operativo).
- Valuación consolidada: $185,000,000 USD (11 edificios físicos matriculados en Derechos Reales con gravamen 0%).
- Cap Rate proyectado: 9.4% anual (rentas puras en USD).
- TIR neta proyectada: 11.8% USD (Cap Rate 9.2%).
- Ticket institucional: $25,000 USD (colocación privada para inversores acreditados).

Marco Legal y Doble Candado Binacional:
1. Paraguay: Ley 7572/2025 (Activo Virtual Regulado Art. 4, Art. 18 de No-Captación masiva sin intermediación bancaria pasiva). Vehículo SPV: PABSA S.A. cerrado en Asunción. Tasa corporativa IRE 10% con exención en dividendos fiduciarios del exterior.
2. Bolivia: Normativa ASFI / Circular Dir-024. Vehículo: ESBA S.R.L. (Sociedad de Objeto Específico + Fideicomiso Mercantil Privado en Banco BCP / Santa Cruz).
3. 5 Capas de Mitigación CERAX: Capa 1 Financiera (TIR 11.8%), Capa 2 Inmobiliaria (11 torres 100% tangibles), Capa 3 Jurídica (SPV cerrado Art. 18), Capa 4 Seguros (Póliza Todo Riesgo & Caución de Título $25M USD), Capa 5 Blockchain (Tokens permisados ERC-3643 con compliance on-chain).
4. Liquidación mensual mediante Escrow Institucional en Banco Continental / BCP.

${documentContext ? `Contexto del Documento/Presentación cargada por el usuario:\n${documentContext}` : ''}
${activeSlide ? `Diapositiva/Página actual en pantalla: Diapositiva ${activeSlide}` : ''}

Pautas de Respuesta:
- Sé preciso, fiduciario, institucional, empático y estructurado.
- Siempre que aplique, cita normativas exactas (p.ej. Art. 18 Ley 7572/2025, Circular ASFI, Escritura Pública 412/2024, Escrow fiduciario).
- Si te piden explicar una diapositiva o presentación PDF, explica con claridad ejecutiva, desglosando los números, la seguridad jurídica y los flujos.
- Habla en español profesional. Mantén respuestas concisas para lectura fluida o síntesis de voz, estructurando con viñetas cuando sea útil.
`;

    const formattedContents: any[] = [];

    // Append up to last 8 messages for context
    const recentHistory = history.slice(-8);
    for (const h of recentHistory) {
      formattedContents.push({
        role: h.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: h.content }],
      });
    }

    formattedContents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: formattedContents,
      config: {
        systemInstruction,
        temperature: 0.3,
      },
    });

    const replyText = response.text || 'Sin respuesta generada';

    // Extract legal citations mentioned
    const citations: string[] = [];
    if (replyText.includes('7572') || replyText.includes('Art. 18')) citations.push('Ley 7572/2025 Art. 18');
    if (replyText.includes('ASFI') || replyText.includes('Dir-024')) citations.push('Circular ASFI/Dir-024');
    if (replyText.includes('412/2024') || replyText.includes('Escritura Pública')) citations.push('Escritura Pública N° 412/2024');
    if (replyText.includes('ERC-3643')) citations.push('Estándar ERC-3643 On-Chain');
    if (replyText.includes('Escrow')) citations.push('Escrow Banco Continental / BCP');

    return res.json({
      success: true,
      text: replyText,
      citations: Array.from(new Set(citations)),
    });
  } catch (error: any) {
    console.error('Error in /api/gemini/chat:', error);
    return res.status(500).json({
      error: error.message || 'Error al procesar consulta con Gemini AI',
    });
  }
});

// Text to Speech using Gemini 3.8 Flash Lite TTS
app.post('/api/gemini/tts', async (req, res) => {
  try {
    const { text, voiceName = 'Puck' } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Texto es requerido' });
    }

    // Clean text for speech: strip markdown markers and citations
    const cleanSpeechText = text
      .replace(/\*\*/g, '')
      .replace(/#{1,6}\s+/g, '')
      .replace(/\[\d+\]/g, '')
      .slice(0, 1500); // Limit to safe TTS chunk size

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-lite-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: cleanSpeechText,
              speechMetadata: {
                style: 'Voz fiduciaria, serena, profesional y ejecutiva en español',
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            // 'Puck', 'Charon', 'Kore', 'Fenrir', 'Zephyr'
            prebuiltVoiceConfig: { voiceName: voiceName || 'Puck' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (base64Audio) {
      return res.json({
        success: true,
        audioBase64: base64Audio,
        mimeType: 'audio/mp3',
      });
    }

    return res.status(502).json({ error: 'No se generó audio' });
  } catch (error: any) {
    console.warn('Gemini TTS error (will fallback to browser voice):', error.message);
    return res.status(500).json({
      error: error.message || 'Error en Gemini TTS',
      fallbackToBrowser: true,
    });
  }
});

// Analyze uploaded PDF or Presentation slides
app.post('/api/gemini/analyze-doc', async (req, res) => {
  try {
    const { fileBase64, fileName, mimeType = 'application/pdf', textExcerpt } = req.body;

    let parts: any[] = [];

    if (fileBase64) {
      parts.push({
        inlineData: {
          mimeType: mimeType || 'application/pdf',
          data: fileBase64,
        },
      });
    }

    const promptText = `
Actúa como el Dr. Alejandro Valenzuela, Auditor Legal y Fiduciario Senior de CERAX.
Analiza este documento de presentación o contrato ("${fileName || 'Presentación RWA'}").
${textExcerpt ? `Texto preliminar extraído: \n${textExcerpt}\n` : ''}

Proporciona un desglose exhaustivo y riguroso en formato JSON con la siguiente estructura:
{
  "documentTitle": string,
  "summary": string,
  "totalPagesOrSlides": number,
  "legalComplianceStatus": "100% REGULADO" | "REQUIERE REVISIÓN" | "COMPATIBLE",
  "applicableNorms": string[],
  "keyMetrics": {
    "valuationUSD": string,
    "projectedYield": string,
    "assetCount": string,
    "escrowBank": string
  },
  "slides": [
    {
      "slideNumber": number,
      "title": string,
      "keyPoints": string[],
      "legalNote": string,
      "speechPitch": string
    }
  ],
  "fiduciaryRecommendations": string[]
}

Asegúrate de responder ÚNICAMENTE con el objeto JSON válido, sin bloques de código markdown innecesarios.
`;

    parts.push({ text: promptText });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [{ parts }],
      config: {
        responseMimeType: 'application/json',
      },
    });

    const jsonStr = response.text || '{}';
    let analysis;
    try {
      analysis = JSON.parse(jsonStr);
    } catch {
      // Fallback clean
      const cleaned = jsonStr.replace(/```json/g, '').replace(/```/g, '').trim();
      analysis = JSON.parse(cleaned);
    }

    return res.json({ success: true, analysis });
  } catch (error: any) {
    console.error('Error in /api/gemini/analyze-doc:', error);
    return res.status(500).json({
      error: error.message || 'Error al analizar el documento',
    });
  }
});

// --- CONVERSATION SESSIONS ROUTES ---
app.get('/api/conversations', (_req, res) => {
  res.json({ success: true, conversations });
});

app.post('/api/conversations', (req, res) => {
  const { title, messages, documentName } = req.body;
  const newSession: ConversationSession = {
    id: `session-${Date.now()}`,
    title: title || `Consulta Fiduciaria ${new Date().toLocaleDateString()}`,
    updatedAt: new Date().toISOString(),
    documentName,
    messages: messages || [],
  };
  conversations.unshift(newSession);
  res.json({ success: true, conversation: newSession });
});

app.delete('/api/conversations/:id', (req, res) => {
  const { id } = req.params;
  conversations = conversations.filter((c) => c.id !== id);
  res.json({ success: true, message: 'Conversación eliminada' });
});

// --- DEV & STATIC ASSET SERVING ---
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CERAX RESPONDE Server listening on port ${PORT}`);
  });
}

startServer();
