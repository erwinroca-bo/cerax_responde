import React from 'react';
import {
  X,
  History,
  MessageSquare,
  FileText,
  Calendar,
  Trash2,
  Download,
  Plus,
  ArrowRight,
} from 'lucide-react';
import { ConversationSession } from '../types/cerax';

interface ConversationHistoryModalProps {
  sessions: ConversationSession[];
  currentSessionId: string | null;
  onClose: () => void;
  onSelectSession: (session: ConversationSession) => void;
  onNewSession: () => void;
  onDeleteSession: (id: string) => Promise<void>;
}

export const ConversationHistoryModal: React.FC<ConversationHistoryModalProps> = ({
  sessions,
  currentSessionId,
  onClose,
  onSelectSession,
  onNewSession,
  onDeleteSession,
}) => {
  const exportSession = (session: ConversationSession) => {
    const text = session.messages
      .map(
        (m) =>
          `[${m.timestamp}] ${m.role === 'assistant' ? 'Dr. Alejandro Valenzuela' : 'Usuario'}:\n${m.content}\n`
      )
      .join('\n');
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${session.title.replace(/\s+/g, '_')}_historial.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0B192C]/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-[#D4AF37]/30 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#e2e8f0] flex items-center justify-between bg-[#F8FAFC]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0B192C] text-[#D4AF37] flex items-center justify-center">
              <History className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-[#0B192C]">
                Historial de Consultas Fiduciarias
              </h3>
              <p className="text-xs text-[#64748B]">
                Registro cronológico con dictámenes y transcripciones por voz
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onNewSession();
                onClose();
              }}
              className="px-3 py-1.5 bg-[#0B192C] hover:bg-[#1E3E62] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Nueva Consulta</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#64748B] hover:bg-[#e2e8f0] hover:text-[#0B192C] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sessions List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {sessions.length === 0 ? (
            <div className="text-center py-12 text-[#64748B]">
              <MessageSquare className="w-10 h-10 mx-auto mb-2 text-[#cbd5e1]" />
              <p className="text-xs font-semibold">No hay sesiones guardadas aún.</p>
              <p className="text-[11px] mt-1">Inicia una conversación con el especialista por voz o chat.</p>
            </div>
          ) : (
            sessions.map((session) => {
              const isCurrent = session.id === currentSessionId;
              return (
                <div
                  key={session.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isCurrent
                      ? 'border-[#0B192C] bg-[#F8FAFC]'
                      : 'border-[#e2e8f0] bg-white hover:border-[#cbd5e1]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-[#0B192C] truncate">
                          {session.title}
                        </h4>
                        {isCurrent && (
                          <span className="px-1.5 py-0.2 rounded bg-[#fed65b] text-[#745c00] text-[9px] font-bold">
                            ACTUAL
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#64748B] mt-0.5 flex items-center gap-2">
                        <Calendar className="w-3 h-3 text-[#94a3b8]" />
                        <span>{new Date(session.updatedAt).toLocaleString()}</span>
                        <span>·</span>
                        <span>{session.messages.length} mensajes</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => exportSession(session)}
                        className="p-1.5 rounded text-[#64748B] hover:text-[#0B192C] hover:bg-[#f1f5f9]"
                        title="Descargar transcripción"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDeleteSession(session.id)}
                        className="p-1.5 rounded text-[#64748B] hover:text-rose-600 hover:bg-rose-50"
                        title="Eliminar sesión"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          onSelectSession(session);
                          onClose();
                        }}
                        className="px-3 py-1 bg-[#0B192C] text-white hover:bg-[#1E3E62] rounded-md text-xs font-semibold flex items-center gap-1"
                      >
                        <span>Cargar</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {session.documentName && (
                    <div className="flex items-center gap-1.5 text-[10px] text-[#735c00] bg-amber-50 px-2 py-1 rounded border border-amber-200/50 mt-1">
                      <FileText className="w-3 h-3" />
                      <span className="truncate">Documento: {session.documentName}</span>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-[#f8fafc] border-t border-[#e2e8f0] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white border border-[#cbd5e1] hover:bg-[#f1f5f9] text-[#0B192C] rounded-lg text-xs font-semibold"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
