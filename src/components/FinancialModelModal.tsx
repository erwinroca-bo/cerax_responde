import React, { useState } from 'react';
import {
  X,
  Calculator,
  TrendingUp,
  DollarSign,
  Landmark,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

interface FinancialModelModalProps {
  onClose: () => void;
  onAskInVoice: (prompt: string) => void;
}

export const FinancialModelModal: React.FC<FinancialModelModalProps> = ({
  onClose,
  onAskInVoice,
}) => {
  const [investmentAmount, setInvestmentAmount] = useState(50000);
  const capRate = 0.094; // 9.4%
  const tirRate = 0.118; // 11.8%

  const annualRentUSD = Math.round(investmentAmount * capRate);
  const monthlyDividendUSD = Math.round(annualRentUSD / 12);
  const fiveYearTotalEst = Math.round(investmentAmount * (1 + tirRate * 5));

  return (
    <div className="fixed inset-0 z-50 bg-[#0B192C]/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-[#D4AF37]/30 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#e2e8f0] flex items-center justify-between bg-[#F8FAFC]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0B192C] text-[#D4AF37] flex items-center justify-center">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-[#0B192C]">
                Modelo Financiero & Retorno Fiduciario
              </h3>
              <p className="text-xs text-[#64748B]">
                11 Torres Concluidas · La Nueva Santa Cruz · Valuación $185,000,000 USD
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#64748B] hover:bg-[#e2e8f0] hover:text-[#0B192C] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs">
          {/* Investment Slider */}
          <div className="p-4 bg-[#F8FAFC] border border-[#e2e8f0] rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-[#64748B] uppercase tracking-wider text-[11px]">
                Ticket de Asignación Privada (USD)
              </span>
              <span className="font-mono text-lg font-bold text-[#0B192C]">
                ${investmentAmount.toLocaleString()} USD
              </span>
            </div>
            <input
              type="range"
              min={25000}
              max={500000}
              step={5000}
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(Number(e.target.value))}
              className="w-full accent-[#0B192C] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#94a3b8] font-mono mt-1">
              <span>Mínimo: $25,000 (Acreditado)</span>
              <span>$250,000</span>
              <span>Máximo: $500,000</span>
            </div>
          </div>

          {/* Projections Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 bg-white border border-[#e2e8f0] rounded-xl">
              <p className="text-[11px] text-[#64748B] font-medium">Dividendo Mensual Estimado</p>
              <p className="font-mono text-xl font-bold text-[#10B981] mt-1">
                ${monthlyDividendUSD.toLocaleString()} USD
              </p>
              <p className="text-[10px] text-[#64748B] mt-1">Liquidación vía Escrow BCP / Continental</p>
            </div>

            <div className="p-4 bg-white border border-[#e2e8f0] rounded-xl">
              <p className="text-[11px] text-[#64748B] font-medium">Renta Anual (Cap Rate 9.4%)</p>
              <p className="font-mono text-xl font-bold text-[#735c00] mt-1">
                ${annualRentUSD.toLocaleString()} USD
              </p>
              <p className="text-[10px] text-[#64748B] mt-1">Rentas netas contratos corporativos</p>
            </div>

            <div className="p-4 bg-white border border-[#e2e8f0] rounded-xl">
              <p className="text-[11px] text-[#64748B] font-medium">Retorno 5 Años (TIR 11.8%)</p>
              <p className="font-mono text-xl font-bold text-[#0B192C] mt-1">
                ${fiveYearTotalEst.toLocaleString()} USD
              </p>
              <p className="text-[10px] text-[#64748B] mt-1">Flujo acumulado + plusvalía subyacente</p>
            </div>
          </div>

          {/* Fiduciary Escrow details */}
          <div className="p-4 bg-amber-50/60 border border-[#fed65b] rounded-xl flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#735c00] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-[#735c00] text-xs">
                Seguridad de Flujos & Patrimonio Autónomo
              </h4>
              <p className="text-[11px] text-[#745c00] mt-1 leading-relaxed">
                Los dividendos no transitan por cuentas corporativas de PABSA ni ESBA. Se transfieren
                directamente desde la cuenta escrow fiduciaria de recaudo de rentas a la cuenta bancaria
                designada del inversor, o a su wallet permisionada ERC-3643 en stablecoins reguladas.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-[#f8fafc] border-t border-[#e2e8f0] flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => {
              onAskInVoice(
                `Explícame detalladamente las proyecciones del modelo financiero para una asignación de $${investmentAmount.toLocaleString()} USD, considerando el Cap Rate del 9.4% y la distribución mensual por Escrow fiduciario.`
              );
              onClose();
            }}
            className="px-4 py-2 bg-[#0B192C] hover:bg-[#1E3E62] text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-colors"
          >
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>Explicar este Modelo Financiero por Voz</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-white border border-[#cbd5e1] hover:bg-[#f1f5f9] text-[#0B192C] rounded-xl text-xs font-semibold"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
