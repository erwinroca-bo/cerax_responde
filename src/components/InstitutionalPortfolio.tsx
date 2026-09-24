import React from 'react';
import {
  Building,
  ShieldCheck,
  Coins,
  Landmark,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface InstitutionalPortfolioProps {
  onAskStepInVoice: (step: string) => void;
}

export const InstitutionalPortfolio: React.FC<InstitutionalPortfolioProps> = ({
  onAskStepInVoice,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 sm:p-6 shadow-xs">
      {/* Header Badges */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
            Portafolio Institucional RWA
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium text-[#64748B]">
            PABSA S.A. · ESBA S.R.L.
          </span>
          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#fed65b]/40 text-[#735c00]">
            11 Torres Físicas
          </span>
        </div>
      </div>

      {/* Main Title & Executive Summary */}
      <div className="flex items-start gap-3.5 mb-5">
        <div className="w-10 h-10 rounded-xl bg-[#0B192C] text-[#D4AF37] flex items-center justify-center shrink-0 mt-0.5">
          <Building className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0B192C] tracking-tight mb-2">
            Estrategia de Tokenización & Gobernanza Binacional: La Nueva Santa Cruz
          </h2>
          <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
            Estructuración institucional para la digitalización de derechos de frutos civiles
            sobre el complejo inmobiliario más relevante de la región. Operación respaldada con 11
            torres concluidas, sin exposición a riesgo constructivo, canalizada en régimen binacional
            Paraguay (Ley 7572/2025) y Bolivia (Directorio ASFI).
          </p>
        </div>
      </div>

      {/* 4 Metric Chips */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <div className="p-3.5 bg-[#F8FAFC] border border-[#e2e8f0] rounded-xl">
          <p className="text-[11px] text-[#64748B] font-medium">Valuación Consolidada</p>
          <p className="font-mono text-xl font-extrabold text-[#0B192C] mt-0.5">$185.0M</p>
          <p className="text-[10px] text-[#64748B] font-medium mt-0.5">11 Torres Físicas</p>
        </div>

        <div className="p-3.5 bg-[#F8FAFC] border border-[#e2e8f0] rounded-xl">
          <p className="text-[11px] text-[#64748B] font-medium">TIR Neta Proyectada</p>
          <p className="font-mono text-xl font-extrabold text-[#735c00] mt-0.5">11.8% USD</p>
          <p className="text-[10px] text-[#64748B] font-medium mt-0.5">Cap Rate 9.2%</p>
        </div>

        <div className="p-3.5 bg-[#F8FAFC] border border-[#e2e8f0] rounded-xl">
          <p className="text-[11px] text-[#64748B] font-medium">Ticket Institucional</p>
          <p className="font-mono text-xl font-extrabold text-[#0B192C] mt-0.5">$25,000</p>
          <p className="text-[10px] text-[#64748B] font-medium mt-0.5">Colocación Privada</p>
        </div>

        <div className="p-3.5 bg-[#F8FAFC] border border-[#e2e8f0] rounded-xl">
          <p className="text-[11px] text-[#64748B] font-medium">Garantía Subyacente</p>
          <p className="font-mono text-xl font-extrabold text-[#10B981] mt-0.5">100% Real</p>
          <p className="text-[10px] text-[#64748B] font-medium mt-0.5">Gravamen Cero</p>
        </div>
      </div>

      {/* Arquitectura de Retorno & Colateral */}
      <div className="border-t border-[#f1f5f9] pt-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B192C]">
            Arquitectura de Retorno & Colateral
          </h3>
          <span className="text-xs font-mono font-medium text-[#64748B] bg-[#f1f5f9] px-2 py-0.5 rounded">
            Escrow Institucional
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Step 1 */}
          <div
            onClick={() =>
              onAskStepInVoice(
                'Explícame la Capa 1: El Activo de las 11 torres concluidas y su matrícula en Derechos Reales'
              )
            }
            className="p-3.5 bg-[#f8fafc] hover:bg-[#f1f5f9] border border-[#e2e8f0] rounded-xl transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="w-6 h-6 rounded-full bg-[#0B192C] text-white flex items-center justify-center text-xs font-bold font-mono">
                1
              </span>
              <Building className="w-4 h-4 text-[#64748B] group-hover:text-[#0B192C]" />
            </div>
            <h4 className="text-xs font-bold text-[#0B192C] mb-1">Activo</h4>
            <p className="text-[11px] text-[#64748B] leading-relaxed">
              11 torres concluidas y matriculadas en Derechos Reales. Sin riesgo constructivo ni devaluación monetaria.
            </p>
          </div>

          {/* Step 2 */}
          <div
            onClick={() =>
              onAskStepInVoice(
                'Explícame la estructura del SPV y Fideicomiso como patrimonio autónomo inembargable'
              )
            }
            className="p-3.5 bg-[#f8fafc] hover:bg-[#f1f5f9] border border-[#e2e8f0] rounded-xl transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="w-6 h-6 rounded-full bg-[#735c00] text-white flex items-center justify-center text-xs font-bold font-mono">
                2
              </span>
              <ShieldCheck className="w-4 h-4 text-[#735c00]" />
            </div>
            <h4 className="text-xs font-bold text-[#0B192C] mb-1">SPV & Fideicomiso</h4>
            <p className="text-[11px] text-[#64748B] leading-relaxed">
              Patrimonio autónomo inembargable. Cesión irrevocable de frutos comerciales sin oferta masiva abierta.
            </p>
          </div>

          {/* Step 3 */}
          <div
            onClick={() =>
              onAskStepInVoice(
                '¿Cómo funciona la emisión de tokens bajo el estándar permisionado ERC-3643?'
              )
            }
            className="p-3.5 bg-[#f8fafc] hover:bg-[#f1f5f9] border border-[#e2e8f0] rounded-xl transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="w-6 h-6 rounded-full bg-[#0B192C] text-white flex items-center justify-center text-xs font-bold font-mono">
                3
              </span>
              <Coins className="w-4 h-4 text-[#64748B] group-hover:text-[#0B192C]" />
            </div>
            <h4 className="text-xs font-bold text-[#0B192C] mb-1">Token ERC-3643</h4>
            <p className="text-[11px] text-[#64748B] leading-relaxed">
              Representación digital permisionada. Compliance de transferencias y KYC/AML automatizado on-chain.
            </p>
          </div>

          {/* Step 4 */}
          <div
            onClick={() =>
              onAskStepInVoice(
                'Explícame la distribución mensual mediante la cuenta Escrow en Banco Continental / BCP'
              )
            }
            className="p-3.5 bg-[#f8fafc] hover:bg-[#f1f5f9] border border-[#e2e8f0] rounded-xl transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="w-6 h-6 rounded-full bg-[#10B981] text-white flex items-center justify-center text-xs font-bold font-mono">
                4
              </span>
              <Landmark className="w-4 h-4 text-[#10B981]" />
            </div>
            <h4 className="text-xs font-bold text-[#0B192C] mb-1">Distribución Escrow</h4>
            <p className="text-[11px] text-[#64748B] leading-relaxed">
              Liquidación de dividendos mensuales mediante Escrow en Banco Continental / BCP.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
