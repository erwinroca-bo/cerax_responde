import React from 'react';
import {
  FileSpreadsheet,
  Scale,
  Building2,
  ScrollText,
  ShieldAlert,
  GraduationCap,
  Sparkles,
  ArrowRight,
  FileCheck,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import { AUDIT_RECORDS } from '../data/ceraxData';
import { AuditRecord } from '../types/cerax';

interface SidebarProps {
  activeModule: string;
  onSelectModule: (id: string) => void;
  onSelectAudit: (audit: AuditRecord) => void;
  onAskAuditInVoice: (audit: AuditRecord) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeModule,
  onSelectModule,
  onSelectAudit,
  onAskAuditInVoice,
}) => {
  const modules = [
    { id: 'matriz', label: 'Matriz de Cumplimiento', icon: FileSpreadsheet },
    { id: 'ley-7572', label: 'Ley 7572 Paraguay', icon: Scale },
    { id: 'circular-asfi', label: 'Circular ASFI Bolivia', icon: Building2 },
    { id: 'dossiers', label: 'Dossiers de Emisión RWA', icon: ScrollText },
    { id: 'spv-fideicomisos', label: 'SPV & Fideicomisos', icon: ShieldAlert },
    { id: 'academia', label: 'Academia Certificada', icon: GraduationCap },
  ];

  return (
    <aside className="w-full lg:w-72 shrink-0 flex flex-col gap-6">
      {/* Regulated Modules Menu */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] p-4 shadow-xs">
        <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-3 px-2">
          Módulos Regulados
        </h3>
        <nav className="space-y-1">
          {modules.map((m) => {
            const Icon = m.icon;
            const isActive = activeModule === m.id;
            return (
              <button
                key={m.id}
                onClick={() => onSelectModule(m.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all text-left ${
                  isActive
                    ? 'bg-[#0B192C] text-white shadow-xs'
                    : 'text-[#334155] hover:bg-[#f1f5f9] hover:text-[#0B192C]'
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? 'text-[#D4AF37]' : 'text-[#64748B]'
                  }`}
                />
                <span className="flex-1 truncate">{m.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Gemini Legal Core Highlight Card */}
        <div className="mt-4 p-3 bg-[#F8FAFC] border border-[#e2e8f0] rounded-lg">
          <div className="flex items-center gap-2 text-[#0B192C] font-semibold text-xs mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Gemini AI Legal Core</span>
          </div>
          <p className="text-[11px] text-[#64748B] leading-relaxed">
            Motor heurístico entrenado con gacetas normativas binacionales.
          </p>
        </div>
      </div>

      {/* Auditorías & Actas */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-1.5">
            <FileCheck className="w-4 h-4 text-[#D4AF37]" />
            <h3 className="text-xs font-bold text-[#0B192C]">Auditorías & Actas</h3>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#f1f5f9] text-[#475569] font-mono">
            {AUDIT_RECORDS.length} Docs
          </span>
        </div>

        <div className="space-y-3">
          {AUDIT_RECORDS.slice(0, 2).map((audit) => (
            <div
              key={audit.id}
              className="p-3 bg-[#f8fafc] hover:bg-[#f1f5f9] border border-[#e2e8f0] rounded-lg transition-all group"
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-[10px] text-[#64748B] font-mono">{audit.date}</span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#fed65b]/50 text-[#745c00]">
                  {audit.tag}
                </span>
              </div>
              <h4
                onClick={() => onSelectAudit(audit)}
                className="text-xs font-semibold text-[#0B192C] group-hover:text-[#1E3E62] cursor-pointer line-clamp-2 leading-snug mb-2"
              >
                {audit.title}
              </h4>
              <div className="flex items-center justify-between text-[10px] text-[#64748B] pt-1 border-t border-[#e2e8f0]/60">
                <span className="font-mono">{audit.recordingTime || audit.fiduciaryEntity}</span>
                <button
                  onClick={() => onAskAuditInVoice(audit)}
                  className="inline-flex items-center gap-1 font-semibold text-[#0B192C] hover:text-[#735c00] transition-colors"
                >
                  <span>Explicar por Voz</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
