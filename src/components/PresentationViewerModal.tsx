import React from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Volume2,
  Sparkles,
  FileText,
  ShieldCheck,
  Building,
  CheckCircle2,
} from 'lucide-react';
import { PresentationDossier } from '../types/cerax';

interface PresentationViewerModalProps {
  presentation: PresentationDossier;
  currentSlideIndex: number;
  onSelectSlide: (index: number) => void;
  onClose: () => void;
  onAskExplainSlide: (slideNumber: number, title: string) => void;
}

export const PresentationViewerModal: React.FC<PresentationViewerModalProps> = ({
  presentation,
  currentSlideIndex,
  onSelectSlide,
  onClose,
  onAskExplainSlide,
}) => {
  const currentSlide = presentation.slides[currentSlideIndex] || presentation.slides[0];
  const total = presentation.slides.length;

  const handlePrev = () => {
    if (currentSlideIndex > 0) onSelectSlide(currentSlideIndex - 1);
  };

  const handleNext = () => {
    if (currentSlideIndex < total - 1) onSelectSlide(currentSlideIndex + 1);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0B192C]/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-[#D4AF37]/30 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-[#e2e8f0] flex items-center justify-between bg-[#F8FAFC]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0B192C] text-[#D4AF37] flex items-center justify-center font-bold">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display text-sm sm:text-base font-bold text-[#0B192C]">
                {presentation.title}
              </h3>
              <p className="text-xs text-[#64748B]">{presentation.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
              {presentation.complianceStatus}
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#64748B] hover:bg-[#e2e8f0] hover:text-[#0B192C] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Slide Visual Presentation Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#f8fafc]">
          <div className="bg-white rounded-2xl border border-[#cbd5e1] p-6 sm:p-8 shadow-sm">
            {/* Slide Header */}
            <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-4 mb-5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                  Diapositiva {currentSlide.slideNumber} de {total}
                </span>
              </div>
              <span className="text-xs font-mono text-[#94a3b8]">
                CERAX Institutional Dossier · 2025
              </span>
            </div>

            {/* Slide Title */}
            <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[#0B192C] mb-5 tracking-tight">
              {currentSlide.title}
            </h2>

            {/* Key Bullet Points */}
            <div className="space-y-3 mb-6">
              {currentSlide.keyPoints.map((pt, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-[#f8fafc] rounded-xl border border-[#e2e8f0]">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-[#334155] leading-relaxed font-medium">
                    {pt}
                  </p>
                </div>
              ))}
            </div>

            {/* Metrics if present on this slide */}
            {currentSlide.metrics && (
              <div className="grid grid-cols-3 gap-3 mb-5">
                {Object.entries(currentSlide.metrics).map(([key, val], idx) => (
                  <div key={idx} className="p-3 bg-[#F8FAFC] border border-[#e2e8f0] rounded-xl text-center">
                    <p className="text-[10px] text-[#64748B] font-medium">{key}</p>
                    <p className="text-sm sm:text-base font-mono font-bold text-[#0B192C] mt-0.5">
                      {val}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Legal Note callout */}
            {currentSlide.legalNote && (
              <div className="p-3.5 bg-amber-50/60 border border-[#fed65b] rounded-xl flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#735c00] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#735c00]">
                    Sustento Legal & Fiduciario:
                  </p>
                  <p className="text-xs text-[#745c00] mt-0.5 font-medium">
                    {currentSlide.legalNote}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="px-5 py-3.5 bg-white border-t border-[#e2e8f0] flex flex-wrap items-center justify-between gap-3">
          {/* Navigation */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentSlideIndex === 0}
              className="p-2 rounded-lg border border-[#e2e8f0] text-[#0B192C] disabled:opacity-30 hover:bg-[#f1f5f9] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono font-semibold text-[#64748B]">
              {currentSlideIndex + 1} / {total}
            </span>
            <button
              onClick={handleNext}
              disabled={currentSlideIndex === total - 1}
              className="p-2 rounded-lg border border-[#e2e8f0] text-[#0B192C] disabled:opacity-30 hover:bg-[#f1f5f9] transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* AI Voice Trigger on this slide */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onAskExplainSlide(currentSlide.slideNumber, currentSlide.title);
                onClose();
              }}
              className="px-4 py-2 bg-[#0B192C] hover:bg-[#1E3E62] text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-colors shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Pedir al Especialista Explicar Diapositiva {currentSlide.slideNumber}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
