import React from 'react';
import { BINATIONAL_MATRIX } from '../data/ceraxData';
import { Scale, Sparkles } from 'lucide-react';

interface BinationalMatrixProps {
  onAskMatrixInVoice: (dimension: string) => void;
}

export const BinationalMatrix: React.FC<BinationalMatrixProps> = ({
  onAskMatrixInVoice,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 sm:p-6 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
            Matriz Binacional de Ejecución
          </span>
          <h3 className="font-display text-base sm:text-lg font-bold text-[#0B192C] mt-0.5">
            Gobernanza Binacional: PABSA S.A. vs. ESBA S.R.L.
          </h3>
        </div>
        <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#F1F5F9] text-[#1E293B]">
          CERAX-RWA-2025
        </span>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#e2e8f0] bg-[#f8fafc]">
              <th className="py-3 px-3.5 font-bold uppercase tracking-wider text-[#64748B] w-1/4">
                Dimensión Clave
              </th>
              <th className="py-3 px-3.5 font-bold uppercase tracking-wider text-[#0B192C] w-[37.5%]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                  <span>PABSA S.A. (Paraguay)</span>
                </div>
              </th>
              <th className="py-3 px-3.5 font-bold uppercase tracking-wider text-[#0B192C] w-[37.5%]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#1E3E62]" />
                  <span>ESBA S.R.L. (Bolivia)</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f1f5f9]">
            {BINATIONAL_MATRIX.map((row, idx) => (
              <tr
                key={idx}
                className="hover:bg-[#f8fafc] transition-colors group"
              >
                <td className="py-3.5 px-3.5 font-semibold text-[#0B192C] align-top bg-[#fafafa]/50">
                  <div className="flex items-start justify-between gap-1">
                    <span>{row.dimension}</span>
                    <button
                      onClick={() => onAskMatrixInVoice(row.dimension)}
                      className="opacity-0 group-hover:opacity-100 text-[#735c00] hover:text-[#0B192C] transition-opacity"
                      title="Preguntar con IA"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
                <td className="py-3.5 px-3.5 text-[#475569] leading-relaxed align-top">
                  {row.paraguay}
                </td>
                <td className="py-3.5 px-3.5 text-[#475569] leading-relaxed align-top">
                  {row.bolivia}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
