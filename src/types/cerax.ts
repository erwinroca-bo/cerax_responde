export type UserRole = 'admin' | 'compliance_officer' | 'investor' | 'legal_counsel';
export type UserStatus = 'authorized' | 'pending' | 'revoked';

export interface UserProfile {
  email: string;
  name: string;
  role: UserRole;
  status: UserStatus;
  requestedAt: string;
  authorizedAt?: string;
  authorizedBy?: string;
  institution?: string;
}

export interface SlideData {
  slideNumber: number;
  title: string;
  keyPoints: string[];
  legalNote?: string;
  speechPitch?: string;
  metrics?: Record<string, string>;
}

export interface PresentationDossier {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  fileName: string;
  fileSize: string;
  totalPages: number;
  complianceStatus: '100% REGULADO' | 'REQUIERE REVISIÓN' | 'COMPATIBLE';
  applicableNorms: string[];
  valuationUSD: string;
  projectedYield: string;
  slides: SlideData[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  citations?: string[];
  audioUrl?: string;
  slideReference?: number;
}

export interface ConversationSession {
  id: string;
  title: string;
  updatedAt: string;
  documentName?: string;
  messages: ChatMessage[];
}

export interface AuditRecord {
  id: string;
  date: string;
  tag: string;
  title: string;
  recordingTime?: string;
  fiduciaryEntity: string;
  hash: string;
  summary: string;
  lawArticles: string[];
}
