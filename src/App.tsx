/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { MegaProjectCard } from './components/MegaProjectCard';
import { InstitutionalPortfolio } from './components/InstitutionalPortfolio';
import { RiskMitigationLayers } from './components/RiskMitigationLayers';
import { BinationalMatrix } from './components/BinationalMatrix';
import { VoiceAssistantPanel } from './components/VoiceAssistantPanel';
import { PresentationViewerModal } from './components/PresentationViewerModal';
import { SecurityAdminModal } from './components/SecurityAdminModal';
import { ConversationHistoryModal } from './components/ConversationHistoryModal';
import { AccessDeniedScreen } from './components/AccessDeniedScreen';
import { FinancialModelModal } from './components/FinancialModelModal';
import { DocumentViewerModal } from './components/DocumentViewerModal';

import {
  UserProfile,
  PresentationDossier,
  ChatMessage,
  ConversationSession,
  AuditRecord,
} from './types/cerax';
import { SAMPLE_PRESENTATIONS, AUDIT_RECORDS } from './data/ceraxData';
import {
  askGeminiSpecialist,
  generateGeminiSpeech,
  analyzeUploadedDocument,
  getAuthorizedUsers,
  authorizeUser,
  requestUserAccess,
  fetchConversations,
  saveConversation,
  deleteConversation,
} from './services/geminiService';
import { voiceService } from './services/voiceService';

export default function App() {
  // Current user state - defaults to Owner Admin ervinroca@gmail.com
  const [currentUser, setCurrentUser] = useState<UserProfile>({
    email: 'ervinroca@gmail.com',
    name: 'Ervin Roca (Admin Propietario)',
    role: 'admin',
    status: 'authorized',
    requestedAt: new Date().toISOString(),
    authorizedAt: new Date().toISOString(),
    authorizedBy: 'SYSTEM_OWNER',
    institution: 'CERAX Capital Holdings',
  });

  const [usersList, setUsersList] = useState<UserProfile[]>([]);
  const [activeModule, setActiveModule] = useState('matriz');

  // Presentation & slides state
  const [activePresentation, setActivePresentation] = useState<PresentationDossier | null>(
    SAMPLE_PRESENTATIONS[0]
  );
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // Chat & conversation state
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      role: 'assistant',
      content:
        'Estimado Inversor / Comité Fiduciario. Soy el Dr. Alejandro Valenzuela, Oficial de Cumplimiento Senior de CERAX RESPONDE.\n\nEstoy a su entera disposición para explicar de forma continua la estructuración de las 11 Torres concluidas en La Nueva Santa Cruz ($185M USD), el cumplimiento estricto del Art. 18 de la Ley 7572/2025 de Paraguay y la canalización fiduciaria por Escrow bancario. Puede hablarme por voz o subir cualquier contrato o presentación en PDF.',
      timestamp: '15:30',
      citations: ['Ley 7572/2025 Art. 18', 'Circular ASFI/Dir-024', 'Escritura Pública N° 412/2024'],
    },
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [conversations, setConversations] = useState<ConversationSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

  // Modal open states
  const [isSecurityOpen, setIsSecurityOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isPresentationViewerOpen, setIsPresentationViewerOpen] = useState(false);
  const [isFinancialModelOpen, setIsFinancialModelOpen] = useState(false);
  const [selectedContractDoc, setSelectedContractDoc] = useState<string | null>(null);

  // Load authorized users and conversations on mount
  useEffect(() => {
    loadUsers();
    loadConversations();
  }, []);

  const loadUsers = async () => {
    try {
      const users = await getAuthorizedUsers();
      if (users && users.length > 0) {
        setUsersList(users);
      }
    } catch (e) {
      console.warn('Could not load users list from server', e);
    }
  };

  const loadConversations = async () => {
    try {
      const convs = await fetchConversations();
      if (convs && convs.length > 0) {
        setConversations(convs);
        setCurrentSessionId(convs[0].id);
      }
    } catch (e) {
      console.warn('Could not load conversations from server', e);
    }
  };

  // Switch between mock/test profiles
  const handleSwitchUser = (user: UserProfile) => {
    setCurrentUser(user);
  };

  // Authorize / Revoke user
  const handleAuthorizeUser = async (
    targetEmail: string,
    action: 'approve' | 'revoke' | 'update_role'
  ) => {
    try {
      const res = await authorizeUser(currentUser.email, targetEmail, action);
      if (res.users) {
        setUsersList(res.users);
      }
    } catch (e: any) {
      alert(e.message || 'Error al autorizar');
    }
  };

  const handleAddUser = async (email: string, name: string, institution: string) => {
    try {
      await requestUserAccess(email, name, institution);
      await authorizeUser(currentUser.email, email, 'approve');
      await loadUsers();
    } catch (e: any) {
      alert(e.message || 'Error al agregar usuario');
    }
  };

  // Send message to Gemini Specialist
  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsChatLoading(true);

    try {
      // Build document context if presentation is loaded
      let documentContext = '';
      if (activePresentation) {
        documentContext = `Documento Activo: "${activePresentation.title}" (${activePresentation.fileName})
Valuación: ${activePresentation.valuationUSD} | Rendimiento: ${activePresentation.projectedYield}
Total Diapositivas: ${activePresentation.totalPages}
Diapositiva Actual: ${activeSlideIndex + 1} - ${activePresentation.slides[activeSlideIndex]?.title || ''}
Puntos clave de la diapositiva:
${activePresentation.slides[activeSlideIndex]?.keyPoints.map((p) => `- ${p}`).join('\n') || ''}`;
      }

      const response = await askGeminiSpecialist(
        text,
        newMessages,
        documentContext,
        activeSlideIndex + 1
      );

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: response.citations,
        slideReference: activeSlideIndex + 1,
      };

      const finalMessages = [...newMessages, assistantMsg];
      setMessages(finalMessages);

      // Play audio explanation automatically
      try {
        const speechRes = await generateGeminiSpeech(response.text);
        await voiceService.speakText(response.text, speechRes.audioBase64);
      } catch (e) {
        console.warn('Auto-speech playback error', e);
      }

      // Auto save or update session
      saveConversation(
        activePresentation ? `Consulta sobre ${activePresentation.title}` : 'Consulta Fiduciaria RWA',
        finalMessages,
        activePresentation?.fileName
      ).then(loadConversations);
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: `Disculpas, ocurrió una intermitencia en el motor heurístico: ${err.message}. Por favor reintente su consulta fiduciaria.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...newMessages, errorMsg]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Upload file (PDF / presentations)
  const handleUploadFile = async (file: File) => {
    setIsChatLoading(true);

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const resultStr = reader.result as string;
        const base64Data = resultStr.split(',')[1] || resultStr;

        const analysisRes = await analyzeUploadedDocument(
          base64Data,
          file.name,
          file.type || 'application/pdf'
        );

        if (analysisRes.analysis) {
          const a = analysisRes.analysis;
          const newDossier: PresentationDossier = {
            id: `uploaded-${Date.now()}`,
            title: a.documentTitle || file.name.replace(/\.[^/.]+$/, ''),
            subtitle: a.summary || 'Presentación analizada por Gemini Legal Core',
            date: new Date().toLocaleDateString('es-ES', { month: 'short', year: 'numeric' }),
            fileName: file.name,
            fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
            totalPages: a.totalPagesOrSlides || 5,
            complianceStatus: a.legalComplianceStatus || '100% REGULADO',
            applicableNorms: a.applicableNorms || ['Ley 7572/2025', 'Régimen Fiduciario'],
            valuationUSD: a.keyMetrics?.valuationUSD || '$185,000,000 USD',
            projectedYield: a.keyMetrics?.projectedYield || '11.8% TIR Neta',
            slides: (a.slides || []).map((s: any, idx: number) => ({
              slideNumber: s.slideNumber || idx + 1,
              title: s.title || `Diapositiva ${idx + 1}`,
              keyPoints: s.keyPoints || ['Punto extraído del documento'],
              legalNote: s.legalNote,
              speechPitch: s.speechPitch,
            })),
          };

          setActivePresentation(newDossier);
          setActiveSlideIndex(0);
          setIsPresentationViewerOpen(true);

          await handleSendMessage(
            `He subido el documento "${file.name}". Como Dr. Valenzuela, dame un resumen ejecutivo fiduciario, el estatus de cumplimiento de las diapositivas y las garantías para inversores.`
          );
        }
      } catch (err: any) {
        console.error('Document analysis error:', err);
        alert(`Error al procesar el archivo: ${err.message}`);
      } finally {
        setIsChatLoading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  // Start new conversation session
  const handleNewSession = () => {
    setMessages([
      {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content:
          'Nueva sesión fiduciaria iniciada. ¿En qué aspecto de las 11 Torres La Nueva Santa Cruz, la Ley 7572 o la mitigación de riesgos de CERAX desea profundizar?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setCurrentSessionId(null);
  };

  // Select existing session
  const handleSelectSession = (session: ConversationSession) => {
    setCurrentSessionId(session.id);
    setMessages(session.messages);
    if (session.documentName) {
      const match = SAMPLE_PRESENTATIONS.find((p) => p.fileName === session.documentName);
      if (match) setActivePresentation(match);
    }
  };

  // Security authorization gate check
  if (currentUser.status !== 'authorized') {
    return (
      <AccessDeniedScreen
        currentUser={currentUser}
        onRequestAccess={async (inst, thesis) => {
          await requestUserAccess(currentUser.email, currentUser.name, inst);
        }}
        onSwitchToAdmin={() => {
          setCurrentUser({
            email: 'ervinroca@gmail.com',
            name: 'Ervin Roca (Admin Propietario)',
            role: 'admin',
            status: 'authorized',
            requestedAt: new Date().toISOString(),
            authorizedAt: new Date().toISOString(),
            authorizedBy: 'SYSTEM_OWNER',
            institution: 'CERAX Capital Holdings',
          });
        }}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f9fb] text-[#191c1e]">
      {/* Top Application Header & Subheader */}
      <Header
        currentUser={currentUser}
        onOpenSecurity={() => setIsSecurityOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        historyCount={conversations.length}
      />

      {/* Main Content Area: 3-column architecture matching Google Stitch screenshot */}
      <main className="flex-1 max-w-[1720px] w-full mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Left Column: Modules & Audits Sidebar */}
          <Sidebar
            activeModule={activeModule}
            onSelectModule={(id) => {
              setActiveModule(id);
              if (id === 'ley-7572') {
                handleSendMessage('Explícame los alcances normativos del Art. 18 de la Ley 7572 de Paraguay sobre no-captación masiva.');
              } else if (id === 'circular-asfi') {
                handleSendMessage('Explícame la resolución de Directorio de ASFI respecto a fideicomisos inmobiliarios privados.');
              } else if (id === 'dossiers') {
                setIsPresentationViewerOpen(true);
              }
            }}
            onSelectAudit={(audit) => {
              setSelectedContractDoc(`${audit.title} (${audit.tag})`);
            }}
            onAskAuditInVoice={(audit) => {
              handleSendMessage(`Explícame por voz el acta fiduciaria del ${audit.date}: "${audit.title}", y sus fundamentos bajo ${audit.tag}.`);
            }}
          />

          {/* Center Column: Core Institutional RWA Dossier & Layers */}
          <section className="flex-1 min-w-0 space-y-6 w-full">
            {/* 1. Mega-Proyecto RWA Hero Card */}
            <MegaProjectCard
              onOpenFinancialModel={() => setIsFinancialModelOpen(true)}
              onOpenFiduciaryDossier={() => {
                setActivePresentation(SAMPLE_PRESENTATIONS[0]);
                setIsPresentationViewerOpen(true);
              }}
              onAskInVoice={(topic) => handleSendMessage(topic)}
            />

            {/* 2. Institutional Portfolio & Architecture */}
            <InstitutionalPortfolio
              onAskStepInVoice={(stepPrompt) => handleSendMessage(stepPrompt)}
            />

            {/* 3. The 5 Risk Mitigation Layers */}
            <RiskMitigationLayers
              onAskLayerInVoice={(title, content) => {
                handleSendMessage(`Explícame la "${title}" de CERAX y cómo mitiga el riesgo: ${content}`);
              }}
              onOpenContractDoc={(docName) => setSelectedContractDoc(docName)}
            />

            {/* 4. Binational Execution Matrix */}
            <BinationalMatrix
              onAskMatrixInVoice={(dimension) => {
                handleSendMessage(`Explícame la dimensión "${dimension}" comparando la estructura de PABSA S.A. en Paraguay y ESBA S.R.L. en Bolivia.`);
              }}
            />

            {/* Sub-footer disclaimer bar matching screenshot */}
            <div className="py-4 border-t border-[#e2e8f0] flex flex-wrap items-center justify-between text-xs text-[#64748B] font-medium gap-3">
              <p>
                <strong className="text-[#0B192C]">PABSA S.A. (Paraguay) · ESBA S.R.L. (Bolivia)</strong> | Sin captación masiva ni custodia propia | SPV & Fideicomiso Escrow
              </p>
              <p className="font-mono text-[11px]">
                CERAX RESPONDE v2025.4-SEC · Cifrado HSM Activo
              </p>
            </div>
          </section>

          {/* Right Column: AI Voice Specialist, PDF Uploader & Live Consult */}
          <VoiceAssistantPanel
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isChatLoading}
            activePresentation={activePresentation}
            onUploadFile={handleUploadFile}
            onSelectPreloadedPresentation={(p) => {
              setActivePresentation(p);
              setActiveSlideIndex(0);
            }}
            onOpenPresentationViewer={() => setIsPresentationViewerOpen(true)}
            activeSlideNumber={activeSlideIndex + 1}
          />
        </div>
      </main>

      {/* MODALS */}

      {/* 1. Presentation & Slides Viewer Modal */}
      {isPresentationViewerOpen && activePresentation && (
        <PresentationViewerModal
          presentation={activePresentation}
          currentSlideIndex={activeSlideIndex}
          onSelectSlide={(idx) => setActiveSlideIndex(idx)}
          onClose={() => setIsPresentationViewerOpen(false)}
          onAskExplainSlide={(slideNum, title) => {
            handleSendMessage(`Por favor explícame en detalle la diapositiva ${slideNum}: "${title}" de la presentación "${activePresentation.title}".`);
          }}
        />
      )}

      {/* 2. Security & Access Console Modal */}
      {isSecurityOpen && (
        <SecurityAdminModal
          currentUser={currentUser}
          users={usersList}
          onClose={() => setIsSecurityOpen(false)}
          onAuthorize={handleAuthorizeUser}
          onSwitchUser={handleSwitchUser}
          onAddUser={handleAddUser}
        />
      )}

      {/* 3. Conversation History Modal */}
      {isHistoryOpen && (
        <ConversationHistoryModal
          sessions={conversations}
          currentSessionId={currentSessionId}
          onClose={() => setIsHistoryOpen(false)}
          onSelectSession={handleSelectSession}
          onNewSession={handleNewSession}
          onDeleteSession={async (id) => {
            await deleteConversation(id);
            await loadConversations();
          }}
        />
      )}

      {/* 4. Financial Model & Yield Simulator */}
      {isFinancialModelOpen && (
        <FinancialModelModal
          onClose={() => setIsFinancialModelOpen(false)}
          onAskInVoice={(prompt) => handleSendMessage(prompt)}
        />
      )}

      {/* 5. Document & Contract Viewer */}
      {selectedContractDoc && (
        <DocumentViewerModal
          documentTitle={selectedContractDoc}
          onClose={() => setSelectedContractDoc(null)}
          onAskInVoice={(docTitle) => handleSendMessage(docTitle)}
        />
      )}
    </div>
  );
}
