import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  UserCheck,
  UserX,
  KeyRound,
  Lock,
  CheckCircle2,
  AlertCircle,
  Plus,
  RefreshCw,
  LogOut,
  Mail,
} from 'lucide-react';
import { UserProfile, UserRole } from '../types/cerax';

interface SecurityAdminModalProps {
  currentUser: UserProfile;
  users: UserProfile[];
  onClose: () => void;
  onAuthorize: (targetEmail: string, action: 'approve' | 'revoke' | 'update_role', role?: UserRole) => Promise<void>;
  onSwitchUser: (user: UserProfile) => void;
  onAddUser: (email: string, name: string, institution: string) => Promise<void>;
}

export const SecurityAdminModal: React.FC<SecurityAdminModalProps> = ({
  currentUser,
  users,
  onClose,
  onAuthorize,
  onSwitchUser,
  onAddUser,
}) => {
  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [newInstitution, setNewInstitution] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionSuccessMsg, setActionSuccessMsg] = useState('');

  const isAdmin = currentUser.email.toLowerCase().includes('roca@gmail.com');

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim()) return;
    setIsSubmitting(true);
    await onAddUser(newEmail.trim(), newName.trim(), newInstitution.trim());
    setNewEmail('');
    setNewName('');
    setNewInstitution('');
    setIsSubmitting(false);
    setActionSuccessMsg('Cuenta de Google registrada en la lista de control de accesos.');
    setTimeout(() => setActionSuccessMsg(''), 4000);
  };

  const handleQuickAction = async (targetEmail: string, action: 'approve' | 'revoke') => {
    await onAuthorize(targetEmail, action);
    setActionSuccessMsg(
      action === 'approve'
        ? `Acceso concedido a ${targetEmail} por ervinroca@gmail.com`
        : `Acceso revocado para ${targetEmail}`
    );
    setTimeout(() => setActionSuccessMsg(''), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0B192C]/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-[#D4AF37]/30 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#e2e8f0] flex items-center justify-between bg-[#F8FAFC]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0B192C] text-[#D4AF37] flex items-center justify-center">
              <KeyRound className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-[#0B192C]">
                Consola de Seguridad & Control de Accesos
              </h3>
              <p className="text-xs text-[#64748B]">
                Autenticación Google OAuth 2.0 · Administrador: ervinroca@gmail.com
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

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Active Session Info */}
          <div className="p-4 bg-[#F8FAFC] border border-[#e2e8f0] rounded-xl">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                  Sesión Activa de Google
                </span>
                <p className="text-sm font-bold text-[#0B192C] mt-0.5">{currentUser.name}</p>
                <p className="text-xs font-mono text-[#64748B]">{currentUser.email}</p>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md ${
                    currentUser.status === 'authorized'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}
                >
                  {currentUser.status === 'authorized' ? 'ACCESO AUTORIZADO' : 'PENDIENTE'}
                </span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-[#0B192C] text-[#D4AF37]">
                  {isAdmin ? 'ADMINISTRADOR GENERAL' : currentUser.role}
                </span>
              </div>
            </div>

            {/* Quick Demo Profile Switcher */}
            <div className="mt-3 pt-3 border-t border-[#e2e8f0] flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[11px] font-semibold text-[#64748B]">
                Simular sesión como:
              </span>
              {users.map((u) => (
                <button
                  key={u.email}
                  onClick={() => onSwitchUser(u)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                    currentUser.email === u.email
                      ? 'bg-[#0B192C] text-[#D4AF37] font-bold'
                      : 'bg-white border border-[#cbd5e1] text-[#334155] hover:bg-[#f1f5f9]'
                  }`}
                >
                  {u.email.includes('roca') ? 'ervinroca@gmail.com (Admin)' : u.name}
                </button>
              ))}
            </div>
          </div>

          {/* Feedback Message */}
          {actionSuccessMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{actionSuccessMsg}</span>
            </div>
          )}

          {/* Authorized Accounts List */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B192C]">
                Usuarios y Permisos Fiduciarios ({users.length})
              </h4>
              <span className="text-[11px] text-[#64748B]">
                {isAdmin
                  ? 'Tienes facultades para autorizar o revocar'
                  : 'Solo ervinroca@gmail.com puede autorizar'}
              </span>
            </div>

            <div className="border border-[#e2e8f0] rounded-xl overflow-hidden divide-y divide-[#f1f5f9]">
              {users.map((u) => {
                const isTargetAdmin = u.email.toLowerCase().includes('roca@gmail.com');
                return (
                  <div
                    key={u.email}
                    className="p-3.5 bg-white hover:bg-[#f8fafc] flex flex-wrap items-center justify-between gap-3 text-xs"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#0B192C]">{u.name}</span>
                        {isTargetAdmin && (
                          <span className="px-1.5 py-0.2 rounded bg-[#fed65b] text-[#745c00] text-[9px] font-bold">
                            OWNER
                          </span>
                        )}
                      </div>
                      <p className="font-mono text-[#64748B] text-[11px]">{u.email}</p>
                      {u.institution && (
                        <p className="text-[10px] text-[#94a3b8]">{u.institution}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          u.status === 'authorized'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : u.status === 'pending'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {u.status === 'authorized'
                          ? 'AUTORIZADO'
                          : u.status === 'pending'
                          ? 'PENDIENTE'
                          : 'REVOCADO'}
                      </span>

                      {/* Admin controls */}
                      {isAdmin && !isTargetAdmin && (
                        <div className="flex items-center gap-1.5">
                          {u.status !== 'authorized' ? (
                            <button
                              onClick={() => handleQuickAction(u.email, 'approve')}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-[10px] font-bold transition-colors"
                            >
                              Autorizar
                            </button>
                          ) : (
                            <button
                              onClick={() => handleQuickAction(u.email, 'revoke')}
                              className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-md text-[10px] font-semibold transition-colors"
                            >
                              Revocar
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Add New Authorized User form (for Admin) */}
          {isAdmin && (
            <form
              onSubmit={handleAddSubmit}
              className="p-4 bg-[#F8FAFC] border border-[#e2e8f0] rounded-xl space-y-3"
            >
              <h4 className="text-xs font-bold text-[#0B192C] flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-[#D4AF37]" />
                <span>Pre-autorizar Cuenta de Google de Nuevo Usuario</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <input
                  type="email"
                  required
                  placeholder="cuenta@gmail.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="px-3 py-2 bg-white border border-[#cbd5e1] rounded-lg text-xs"
                />
                <input
                  type="text"
                  placeholder="Nombre Completo"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="px-3 py-2 bg-white border border-[#cbd5e1] rounded-lg text-xs"
                />
                <input
                  type="text"
                  placeholder="Institución o Family Office"
                  value={newInstitution}
                  onChange={(e) => setNewInstitution(e.target.value)}
                  className="px-3 py-2 bg-white border border-[#cbd5e1] rounded-lg text-xs"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !newEmail.trim()}
                className="px-4 py-2 bg-[#0B192C] hover:bg-[#1E3E62] text-white rounded-lg text-xs font-bold transition-colors"
              >
                Registrar y Conceder Acceso
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-[#f8fafc] border-t border-[#e2e8f0] flex items-center justify-between text-[11px] text-[#64748B]">
          <span className="font-mono">Cifrado HSM · Google Auth Token Activo</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white border border-[#cbd5e1] hover:bg-[#f1f5f9] text-[#0B192C] rounded-lg font-semibold"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
