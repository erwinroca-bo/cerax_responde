import { ChatMessage, ConversationSession, UserProfile } from '../types/cerax';

export interface ChatResponse {
  success: boolean;
  text: string;
  citations: string[];
}

export async function askGeminiSpecialist(
  message: string,
  history: ChatMessage[] = [],
  documentContext: string = '',
  activeSlide: number | null = null
): Promise<ChatResponse> {
  const response = await fetch('/api/gemini/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message,
      history,
      documentContext,
      activeSlide,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Error del servidor (${response.status})`);
  }

  return response.json();
}

export async function generateGeminiSpeech(
  text: string,
  voiceName: string = 'Puck'
): Promise<{ audioBase64?: string; mimeType?: string; fallbackToBrowser?: boolean }> {
  try {
    const response = await fetch('/api/gemini/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, voiceName }),
    });

    if (!response.ok) {
      return { fallbackToBrowser: true };
    }

    return response.json();
  } catch {
    return { fallbackToBrowser: true };
  }
}

export async function analyzeUploadedDocument(
  fileBase64: string,
  fileName: string,
  mimeType: string,
  textExcerpt?: string
) {
  const response = await fetch('/api/gemini/analyze-doc', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fileBase64,
      fileName,
      mimeType,
      textExcerpt,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || 'Error al analizar el documento');
  }

  return response.json();
}

// User authorization API
export async function getAuthorizedUsers(): Promise<UserProfile[]> {
  const response = await fetch('/api/auth/users');
  const data = await response.json();
  return data.users || [];
}

export async function requestUserAccess(email: string, name: string, institution?: string) {
  const response = await fetch('/api/auth/request-access', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, name, institution }),
  });
  return response.json();
}

export async function authorizeUser(
  adminEmail: string,
  targetEmail: string,
  action: 'approve' | 'revoke' | 'update_role',
  role?: string
) {
  const response = await fetch('/api/auth/authorize', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ adminEmail, targetEmail, action, role }),
  });
  return response.json();
}

// Conversation history API
export async function fetchConversations(): Promise<ConversationSession[]> {
  const response = await fetch('/api/conversations');
  const data = await response.json();
  return data.conversations || [];
}

export async function saveConversation(
  title: string,
  messages: ChatMessage[],
  documentName?: string
) {
  const response = await fetch('/api/conversations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, messages, documentName }),
  });
  return response.json();
}

export async function deleteConversation(id: string) {
  const response = await fetch(`/api/conversations/${id}`, {
    method: 'DELETE',
  });
  return response.json();
}
