import React, { useState } from 'react';
import {
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  FileText,
  CheckCircle2,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { CONTROL_LAYERS } from '../data/ceraxData';

interface RiskMitigationLayersProps {
  onAskLayerInVoice: (layerTitle: string, content: string) => void;
  onOpenContractDoc: (docName: string) => void;
}

export const RiskMitigationLayers: React.FC<RiskMitigationLayersProps> = ({
  onAskLayerInVoice,
  onOpenContractDoc,
}) => {
  // Capa 3 is open by default as shown in the screenshot
  const [expandedLayers, setExpandedLayers] = useState<Record<string, boolean>>({
    '03': true,
  });

  const toggleLayer = (num: string) => {
    setExpandedLayers((prev) => ({
      ...prev,
      [num]: !prev[num],
    }));
  };

  return (
    <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 sm:p-6 shadow-xs">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
            Mitigación Integral de Riesgo
          </span>
          <h2 className="font-display text-lg sm:text-xl font-bold text-[#0B192C] mt-0.5">
            Las 5 Capas de Control CERAX (Negocio + Rigor Legal)
          </h2>
        </div>
        <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-[#F1F5F9] text-[#1E293B]">
          Doble Candado Binacional
        </span>
      </div>

      {/* 5 Layer Stack */}
      <div className="space-y-3">
        {CONTROL_LAYERS.map((layer) => {
          const isExpanded = !!expandedLayers[layer.number];
          const isCore = layer.isPrimary;

          return (
            <div
              key={layer.number}
              className={`rounded-xl border transition-all ${
                isCore
                  ? 'border-[#0B192C] bg-[#F8FAFC]'
                  : 'border-[#e2e8f0] bg-white hover:border-[#cbd5e1]'
              }`}
            >
              {/* Header Row */}
              <div
                onClick={() => toggleLayer(layer.number)}
                className="p-4 flex items-center justify-between gap-3 cursor-pointer select-none"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#f1f5f9] text-[#0B192C]">
                    {layer.number}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#0B192C] truncate">
                      {layer.title}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded ${
                      isCore
                        ? 'bg-[#0B192C] text-white'
                        : 'bg-[#fed65b]/40 text-[#735c00]'
                    }`}
                  >
                    {layer.badge}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-[#64748B]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#64748B]" />
                  )}
                </div>
              </div>

              {/* Collapsible Content */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-[#e2e8f0]/60 space-y-3">
                  <p className="text-xs text-[#475569] leading-relaxed">
                    {layer.content}
                  </p>

                  {/* Contracts block for Capa 3 */}
                  {layer.contracts && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {layer.contracts.map((c, i) => (
                        <div
                          key={i}
                          onClick={() => onOpenContractDoc(c.doc)}
                          className="p-3 bg-white border border-[#e2e8f0] hover:border-[#0B192C] rounded-lg cursor-pointer transition-all flex items-start justify-between gap-2 group"
                        >
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                              {c.title}
                            </p>
                            <p className="text-xs font-mono font-semibold text-[#0B192C] mt-0.5 group-hover:text-[#1E3E62]">
                              {c.doc}
                            </p>
                          </div>
                          <FileText className="w-4 h-4 text-[#D4AF37] shrink-0" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Metrics if present */}
                  {layer.metrics && (
                    <div className="grid grid-cols-3 gap-2 pt-1">
                      {layer.metrics.map((m, idx) => (
                        <div key={idx} className="p-2 bg-[#F8FAFC] rounded-lg text-center">
                          <p className="text-[10px] text-[#64748B] font-medium">{m.label}</p>
                          <p className="text-xs font-mono font-bold text-[#0B192C] mt-0.5">
                            {m.val}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => onAskLayerInVoice(layer.title, layer.content)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#735c00] hover:text-[#0B192C] transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Explicar esta capa por voz</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
