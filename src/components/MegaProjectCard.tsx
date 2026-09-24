import React from 'react';
import {
  Building2,
  TrendingUp,
  ShieldCheck,
  Percent,
  Calculator,
  FileText,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface MegaProjectCardProps {
  onOpenFinancialModel: () => void;
  onOpenFiduciaryDossier: () => void;
  onAskInVoice: (topic: string) => void;
}

export const MegaProjectCard: React.FC<MegaProjectCardProps> = ({
  onOpenFinancialModel,
  onOpenFiduciaryDossier,
  onAskInVoice,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden shadow-xs">
      {/* Card Header & Badge */}
      <div className="p-4 sm:p-5 border-b border-[#f1f5f9] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-xs bg-[#D4AF37]" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#0B192C]">
            Mega-Proyecto RWA
          </span>
        </div>
        <span className="px-2.5 py-0.5 text-xs font-mono font-bold rounded-md bg-[#F1F5F9] text-[#1E293B]">
          11 Torres
        </span>
      </div>

      {/* Hero Architectural Visual Banner */}
      <div className="relative h-56 sm:h-64 overflow-hidden group">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
          alt="La Nueva Santa Cruz 11 Torres Concluidas"
          className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C] via-[#0B192C]/50 to-transparent flex flex-col justify-end p-5 sm:p-6 text-white">
          <span className="text-[11px] uppercase tracking-widest font-mono font-semibold text-[#fed65b] mb-1">
            11 Torres Construidas · RWA Asset-Backed
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-1">
            La Nueva Santa Cruz
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 font-light flex items-center gap-2">
            <span>Smart City Corporativa & Residencial</span>
            <span className="text-[#fed65b]">·</span>
            <span>Bolivia</span>
          </p>
        </div>
      </div>

      {/* 4 Key Institutional KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#e2e8f0] border-b border-[#e2e8f0]">
        <div className="bg-white p-4">
          <p className="text-[11px] text-[#64748B] font-medium">Valuación Total</p>
          <p className="font-mono text-lg sm:text-xl font-bold text-[#0B192C] mt-0.5">
            $185,000,000
          </p>
          <p className="text-[10px] text-[#94a3b8] font-medium mt-0.5">USD · 11 Edificios</p>
        </div>

        <div className="bg-white p-4">
          <p className="text-[11px] text-[#64748B] font-medium">Cap Rate Proyectado</p>
          <p className="font-mono text-lg sm:text-xl font-bold text-[#735c00] mt-0.5">
            9.4% Anual
          </p>
          <p className="text-[10px] text-[#94a3b8] font-medium mt-0.5">Rentas USD puras</p>
        </div>

        <div className="bg-white p-4">
          <p className="text-[11px] text-[#64748B] font-medium">Riesgo Obra</p>
          <p className="font-mono text-lg sm:text-xl font-bold text-[#10B981] mt-0.5">
            0% (Terminadas)
          </p>
          <p className="text-[10px] text-[#94a3b8] font-medium mt-0.5">Activos físicos en pie</p>
        </div>

        <div className="bg-white p-4">
          <p className="text-[11px] text-[#64748B] font-medium">Ocupación / Entrega</p>
          <p className="font-mono text-lg sm:text-xl font-bold text-[#1E3E62] mt-0.5">
            82% Operativo
          </p>
          <p className="text-[10px] text-[#94a3b8] font-medium mt-0.5">Flujos activos</p>
        </div>
      </div>

      {/* Estatus de Fases RWA */}
      <div className="p-4 sm:p-5 border-b border-[#f1f5f9]">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B192C]">
            Estatus de Fases RWA
          </h4>
          <span className="text-xs font-mono font-semibold text-[#735c00] bg-[#fed65b]/30 px-2 py-0.5 rounded">
            Fase 2 Activa
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 bg-[#f8fafc] rounded-xl border border-[#e2e8f0]">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-[#1E293B]">Fase 1 · Torres 1 a 3</span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                100% Suscrito
              </span>
            </div>
            <p className="text-[11px] text-[#64748B] font-mono">$42M USD · Fideicomiso</p>
            <div className="w-full bg-[#e2e8f0] h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-[#10B981] h-full w-full rounded-full" />
            </div>
          </div>

          <div className="p-3 bg-[#f8fafc] rounded-xl border-2 border-[#D4AF37]">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-[#0B192C]">Fase 2 · Torres 4 a 7</span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#fed65b] text-[#745c00]">
                Ronda Abierta
              </span>
            </div>
            <p className="text-[11px] text-[#64748B] font-mono">$68M USD</p>
            <div className="w-full bg-[#e2e8f0] h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-[#D4AF37] h-full w-3/5 rounded-full" />
            </div>
          </div>

          <div className="p-3 bg-[#f8fafc] rounded-xl border border-[#e2e8f0]">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-[#1E293B]">Fase 3 · Torres 8 a 11</span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#e2e8f0] text-[#475569]">
                Q4 2025
              </span>
            </div>
            <p className="text-[11px] text-[#64748B] font-mono">$75M USD · Reserva Institucional</p>
            <div className="w-full bg-[#e2e8f0] h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-[#94a3b8] h-full w-1/5 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 sm:p-5 bg-[#F8FAFC] flex flex-wrap items-center gap-3">
        <button
          onClick={onOpenFinancialModel}
          className="flex-1 min-w-[200px] h-11 px-4 bg-[#0B192C] hover:bg-[#1E3E62] text-white rounded-xl text-xs font-bold tracking-wide flex items-center justify-center gap-2 transition-colors shadow-xs"
        >
          <Calculator className="w-4 h-4 text-[#D4AF37]" />
          <span>Modelo Financiero</span>
        </button>

        <button
          onClick={onOpenFiduciaryDossier}
          className="flex-1 min-w-[200px] h-11 px-4 bg-white hover:bg-[#f1f5f9] text-[#0B192C] border border-[#cbd5e1] rounded-xl text-xs font-bold tracking-wide flex items-center justify-center gap-2 transition-colors shadow-xs"
        >
          <FileText className="w-4 h-4 text-[#D4AF37]" />
          <span>Fiduciario Binacional (PDF)</span>
        </button>

        <button
          onClick={() =>
            onAskInVoice(
              'Explícame en detalle la valuación de las 11 torres en La Nueva Santa Cruz y el Cap Rate del 9.4% anual'
            )
          }
          className="px-3 h-11 bg-[#fed65b]/20 hover:bg-[#fed65b]/40 text-[#745c00] border border-[#fed65b] rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
          title="Consultar al Especialista de Voz"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Explicar con IA</span>
        </button>
      </div>
    </div>
  );
};
