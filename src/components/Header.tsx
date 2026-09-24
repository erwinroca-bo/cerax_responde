import React from 'react';
import {
  ShieldCheck,
  ExternalLink,
  Lock,
  UserCheck,
  ChevronDown,
  Sparkles,
  History,
  KeyRound,
} from 'lucide-react';
import { UserProfile } from '../types/cerax';

interface HeaderProps {
  currentUser: UserProfile;
  onOpenSecurity: () => void;
  onOpenHistory: () => void;
  historyCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  onOpenSecurity,
  onOpenHistory,
  historyCount,
}) => {
  const isAdmin = currentUser.email.toLowerCase().includes('roca@gmail.com');

  return (
    <header className="border-b border-[#e2e8f0] bg-white sticky top-0 z-30">
      {/* Upper Navigation Bar */}
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-4">
        {/* Brand & Regime Status */}
        <div className="flex items-center flex-wrap gap-4 sm:gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0B192C] flex items-center justify-center text-[#D4AF37] font-bold text-sm shadow-xs">
              <span className="tracking-tighter">CX</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-[15px] tracking-tight text-[#0B192C]">
                  CERAX RESPONDE
                </span>
              </div>
              <p className="text-[11px] text-[#64748B] font-medium tracking-wide">
                Activos Reales · Acceso Global
              </p>
            </div>
          </div>

          <div className="h-6 w-[1px] bg-[#e2e8f0] hidden md:block" />

          {/* Quick Regime Pills */}
          <div className="flex items-center flex-wrap gap-2 text-[12px]">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F8FAFC] border border-[#e2e8f0] rounded-md font-medium text-[#1E293B]">
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              <span>Paraguay (Ley 7572/2025)</span>
              <span className="px-1.5 py-0.2 text-[10px] uppercase font-bold tracking-wider rounded bg-[#fed65b]/40 text-[#735c00]">
                VIGENTE
              </span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F8FAFC] border border-[#e2e8f0] rounded-md font-medium text-[#1E293B]">
              <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
              <span>Bolivia (Fintech / ASFI)</span>
              <span className="px-1.5 py-0.2 text-[10px] uppercase font-bold tracking-wider rounded bg-[#e2e8f0] text-[#475569]">
                CIRCULAR ASFI
              </span>
            </div>

            <a
              href="https://pabsa.online/cerax"
              target="_blank"
              rel="noreferrer"
              className="hidden lg:inline-flex items-center gap-1 text-[11px] font-mono text-[#64748B] hover:text-[#0B192C] transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              pabsa.online/cerax
            </a>
          </div>
        </div>

        {/* Right Audit & User Authorization State */}
        <div className="flex items-center flex-wrap gap-3">
          {/* Cryptographic Audit Badge */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1 bg-[#F8FAFC] border border-[#e2e8f0] rounded-md">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
            <div className="text-left">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#735c00] leading-none">
                Auditoría Criptográfica Activa
              </p>
              <p className="text-[10px] text-[#64748B] font-mono leading-tight">
                Google Workspace Enterprise
              </p>
            </div>
          </div>

          {/* Conversation History Trigger */}
          <button
            onClick={onOpenHistory}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#334155] hover:text-[#0B192C] bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#e2e8f0] rounded-md transition-all"
            title="Historial de Consultas Fiduciarias"
          >
            <History className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="hidden sm:inline">Historial</span>
            {historyCount > 0 && (
              <span className="px-1.5 py-0.2 text-[10px] font-mono font-bold bg-[#0B192C] text-white rounded-full">
                {historyCount}
              </span>
            )}
          </button>

          {/* User Account / Admin Badge */}
          <button
            onClick={onOpenSecurity}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#cbd5e1] rounded-md transition-all text-left group"
          >
            <div className="w-7 h-7 rounded-full bg-[#0B192C] text-[#D4AF37] flex items-center justify-center font-bold text-xs">
              {isAdmin ? <KeyRound className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-1.5">
                <span className="text-[12px] font-semibold text-[#0B192C]">
                  {isAdmin ? 'Admin / Cumplimiento' : currentUser.name}
                </span>
                <span className="text-[9px] uppercase px-1.5 py-0.2 bg-[#fed65b]/40 text-[#735c00] font-bold rounded">
                  {isAdmin ? 'ervinroca@gmail.com' : currentUser.role}
                </span>
              </div>
              <p className="text-[10px] text-[#64748B]">Oficial Certificado · Control de Acceso</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#94a3b8] group-hover:text-[#0B192C]" />
          </button>
        </div>
      </div>

      {/* Subheader: Active Regime & Compliance Officer Bar */}
      <div className="border-t border-[#f1f5f9] bg-[#f8fafc] px-4 sm:px-6 py-1.5 text-xs text-[#475569]">
        <div className="max-w-[1720px] mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center flex-wrap gap-2.5">
            <span className="font-bold text-[11px] tracking-wider uppercase text-[#0B192C] flex items-center gap-1">
              <span className="w-1.5 h-3 bg-[#D4AF37] rounded-xs inline-block" />
              Régimen Activo:
            </span>

            <div className="inline-flex items-center gap-1 text-[11px]">
              <span className="font-semibold text-[#1e293b]">Normativa Paraguay · Ley 7572/2025</span>
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-[#fed65b] text-[#745c00] tracking-wider">
                VIGENTE & REGLAMENTADO
              </span>
            </div>

            <span className="text-[#cbd5e1] hidden md:inline">|</span>

            <div className="hidden md:inline-flex items-center gap-1 text-[11px]">
              <span>Normativa Boliviana · ASFI / Res. Directorio</span>
              <span className="px-2 py-0.5 text-[10px] font-semibold uppercase rounded bg-[#e2e8f0] text-[#475569]">
                MARCO CRIPTO & SPV
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#1E3E62] text-white flex items-center justify-center text-[10px] font-bold">
                AV
              </div>
              <span className="font-semibold text-[#0B192C]">Dr. Alejandro Valenzuela</span>
              <span className="text-[#64748B] hidden sm:inline">
                Oficial Cumplimiento Senior · @pabsa.online
              </span>
            </div>

            <div className="flex items-center gap-1 text-[#10B981] font-mono text-[10px] font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              <Lock className="w-3 h-3" />
              <span>TLS 1.3 / HSM Encriptado</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
