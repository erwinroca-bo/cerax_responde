import React, { useState } from 'react';
import {
  ShieldAlert,
  Lock,
  Mail,
  CheckCircle2,
  Building,
  KeyRound,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { UserProfile } from '../types/cerax';

interface AccessDeniedScreenProps {
  currentUser: UserProfile;
  onRequestAccess: (institution: string, thesis: string) => Promise<void>;
  onSwitchToAdmin: () => void;
}

export const AccessDeniedScreen: React.FC<AccessDeniedScreenProps> = ({
  currentUser,
  onRequestAccess,
  onSwitchToAdmin,
}) => {
  const [institution, setInstitution] = useState('');
  const [thesis, setThesis] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    await onRequestAccess(institution, thesis);
    setIsSending(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0B192C] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-[#D4AF37]/40 p-6 sm:p-8 text-center">
        {/* Shield Icon */}
        <div className="w-14 h-14 rounded-2xl bg-[#0B192C] text-[#D4AF37] flex items-center justify-center mx-auto mb-4 border border-[#D4AF37]/30 shadow-sm">
          <Lock className="w-7 h-7" />
        </div>

        <span className="px-3 py-1 bg-amber-50 border border-amber-200 text-[#735c00] text-xs font-mono font-bold rounded-full uppercase tracking-wider">
          Control de Acceso Fiduciario
        </span>

        <h2 className="font-display text-2xl font-extrabold text-[#0B192C] mt-3 mb-2 tracking-tight">
          Acceso Pendiente de Autorización
        </h2>

        <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mb-5">
          Para acceder a la plataforma <strong>CERAX RESPONDE</strong> y al expediente fiduciario de
          activos reales (La Nueva Santa Cruz · 11 Torres), su cuenta de Google debe ser
          expresamente validada y autorizada por el administrador:
        </p>

        <div className="p-3 bg-[#F8FAFC] border border-[#e2e8f0] rounded-xl text-left text-xs mb-5 font-mono">
          <p className="text-[#64748B] text-[10px] uppercase font-bold">Cuenta de Google detectada:</p>
          <p className="text-[#0B192C] font-semibold text-sm mt-0.5">{currentUser.email}</p>
          <p className="text-[#735c00] text-[11px] mt-1 font-sans">
            Administrador Autorizador:{' '}
            <strong className="text-[#0B192C]">ervinroca@gmail.com</strong>
          </p>
        </div>

        {submitted ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs text-left mb-5">
            <div className="flex items-center gap-2 font-bold mb-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Solicitud enviada a ervinroca@gmail.com</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              El administrador ha recibido la notificación. Una vez aprobado en la consola de
              seguridad, su cuenta tendrá acceso completo a las consultas de voz y dossiers
              fiduciarios.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 text-left mb-5">
            <div>
              <label className="block text-[11px] font-bold text-[#64748B] uppercase mb-1">
                Institución / Family Office / Empresa:
              </label>
              <input
                type="text"
                required
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                placeholder="Ej. Inversiones Andinas S.A."
                className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#cbd5e1] rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#64748B] uppercase mb-1">
                Motivo / Interés de Consulta RWA:
              </label>
              <textarea
                rows={2}
                required
                value={thesis}
                onChange={(e) => setThesis(e.target.value)}
                placeholder="Evaluación de inversión institucional en 11 Torres La Nueva Santa Cruz..."
                className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#cbd5e1] rounded-lg text-xs"
              />
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="w-full py-2.5 bg-[#0B192C] hover:bg-[#1E3E62] text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
            >
              <span>Enviar Solicitud a ervinroca@gmail.com</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
            </button>
          </form>
        )}

        {/* Demo Fast Switch for Evaluator */}
        <div className="pt-4 border-t border-[#f1f5f9] text-xs">
          <p className="text-[11px] text-[#64748B] mb-2">Para evaluar la app inmediatamente:</p>
          <button
            onClick={onSwitchToAdmin}
            className="w-full py-2 bg-[#fed65b] hover:bg-[#ffe088] text-[#745c00] font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Ingresar como Administrador (ervinroca@gmail.com)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
