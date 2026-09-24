import React from 'react';
import {
  X,
  FileText,
  ShieldCheck,
  Sparkles,
  Download,
  CheckCircle2,
  Lock,
} from 'lucide-react';

interface DocumentViewerModalProps {
  documentTitle: string;
  onClose: () => void;
  onAskInVoice: (docTitle: string) => void;
}

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({
  documentTitle,
  onClose,
  onAskInVoice,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#0B192C]/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-[#D4AF37]/30 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#e2e8f0] flex items-center justify-between bg-[#F8FAFC]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0B192C] text-[#D4AF37] flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display text-sm sm:text-base font-bold text-[#0B192C]">
                {documentTitle}
              </h3>
              <p className="text-xs text-[#64748B]">
                Protocolo Notarial Binacional · Certificado en Cadena de Custodia
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

        {/* Legal Text Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs font-mono text-[#334155] leading-relaxed bg-[#fcfcfd]">
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 flex items-center gap-2 font-sans font-semibold text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Documento protocolizado ante Escribanía Pública y verificado en CNV / ASFI</span>
          </div>

          <div className="border border-[#e2e8f0] p-4 rounded-xl bg-white space-y-3">
            <p className="font-bold text-[#0B192C] uppercase text-[11px]">
              CLÁUSULA PRIMERA (DEL OBJETO Y PATRIMONIO AUTÓNOMO):
            </p>
            <p>
              PABSA S.A. en su calidad de SPV Fiduciario y ESBA S.R.L. en calidad de sociedad de
              propósito especial declaran la afectación irrevocable de los derechos de frutos civiles y
              arrendamiento sobre las 11 torres concluidas situadas en La Nueva Santa Cruz a favor del
              patrimonio fiduciario autónomo e inembargable.
            </p>

            <p className="font-bold text-[#0B192C] uppercase text-[11px] pt-2 border-t border-[#f1f5f9]">
              CLÁUSULA SEGUNDA (DE LA NO-CAPTACIÓN MASIVA Y ART. 18 LEY 7572):
            </p>
            <p>
              La estructuración se acoge de pleno derecho a las excepciones del Art. 18 de la Ley
              7572/2025 de la República del Paraguay, por cuanto la emisión no constituye intermediación
              financiera pasiva bancaria ni oferta pública masiva, operando exclusivamente mediante
              colocación privada individualizada a inversores acreditados.
            </p>

            <p className="font-bold text-[#0B192C] uppercase text-[11px] pt-2 border-t border-[#f1f5f9]">
              CLÁUSULA TERCERA (DEL ESCROW Y REPATRIACIÓN DE DIVIDENDOS):
            </p>
            <p>
              Todos los cobros de arrendamientos en dólares estadounidenses son canalizados mediante la
              cuenta escrow fiduciaria en Banco Continental / BCP, procediendo a su liquidación mensual
              conforme a las reglas de prelación y con estricta retención tributaria reducida (IRE 10%).
            </p>
          </div>

          <div className="p-3 bg-[#F8FAFC] border border-[#e2e8f0] rounded-xl flex items-center justify-between text-[11px] text-[#64748B]">
            <span className="flex items-center gap-1.5 font-sans">
              <Lock className="w-3.5 h-3.5 text-[#10B981]" />
              Firma Digital HSM: SHA256-49F-2025-PABSA-ESBA
            </span>
            <span className="font-bold text-[#0B192C]">ESTADO: VIGENTE</span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-[#f8fafc] border-t border-[#e2e8f0] flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => {
              onAskInVoice(
                `Por favor analiza y explícame las implicaciones jurídicas de las cláusulas del documento "${documentTitle}", especialmente el Art. 18 de no-captación y la protección del patrimonio autónomo.`
              );
              onClose();
            }}
            className="px-4 py-2 bg-[#0B192C] hover:bg-[#1E3E62] text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-colors"
          >
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>Explicar este Documento por Voz con IA</span>
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
