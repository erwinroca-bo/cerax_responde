import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Upload,
  FileText,
  Send,
  Sparkles,
  CheckCircle2,
  Play,
  Square,
  ShieldCheck,
  ChevronRight,
  Loader2,
  Paperclip,
  Maximize2,
  Sliders,
} from 'lucide-react';
import { ChatMessage, PresentationDossier } from '../types/cerax';
import { voiceService } from '../services/voiceService';
import { generateGeminiSpeech, askGeminiSpecialist } from '../services/geminiService';

interface VoiceAssistantPanelProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => Promise<void>;
  isLoading: boolean;
  activePresentation: PresentationDossier | null;
  onUploadFile: (file: File) => void;
  onSelectPreloadedPresentation: (pres: PresentationDossier) => void;
  onOpenPresentationViewer: () => void;
  activeSlideNumber: number;
}

export const VoiceAssistantPanel: React.FC<VoiceAssistantPanelProps> = ({
  messages,
  onSendMessage,
  isLoading,
  activePresentation,
  onUploadFile,
  onSelectPreloadedPresentation,
  onOpenPresentationViewer,
  activeSlideNumber,
}) => {
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState<'idle' | 'listening' | 'speaking' | 'processing'>('idle');
  const [selectedVoice, setSelectedVoice] = useState('Puck'); // Puck / Kore / Zephyr
  const [autoSpeechEnabled, setAutoSpeechEnabled] = useState(true);
  const [playingMessageId, setPlayingMessageId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize voice callbacks
  useEffect(() => {
    voiceService.setCallbacks(
      (transcript, isFinal) => {
        setInputText(transcript);
        if (isFinal && transcript.trim().length > 3) {
          handleSend(transcript.trim());
        }
      },
      (status) => {
        setVoiceStatus(status);
        setIsListening(status === 'listening');
      }
    );

    return () => {
      voiceService.stopSpeaking();
      voiceService.stopListening();
    };
  }, []);

  // Auto scroll chat to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleToggleVoice = () => {
    if (isListening) {
      voiceService.stopListening();
    } else {
      voiceService.startListening();
    }
  };

  const handleSend = async (overrideText?: string) => {
    const textToSend = overrideText || inputText;
    if (!textToSend.trim() || isLoading) return;

    setInputText('');
    await onSendMessage(textToSend);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const handlePlayAudio = async (msg: ChatMessage) => {
    if (playingMessageId === msg.id) {
      voiceService.stopSpeaking();
      setPlayingMessageId(null);
      return;
    }

    setPlayingMessageId(msg.id);
    try {
      const speechRes = await generateGeminiSpeech(msg.content, selectedVoice);
      await voiceService.speakText(msg.content, speechRes.audioBase64);
    } catch (e) {
      console.warn('Speech playback failed', e);
    } finally {
      setPlayingMessageId(null);
    }
  };

  const quickPrompts = [
    'Verificar 11 torres',
    'Dictamen ASFI',
    'Rendimiento USD',
    'Ley 7572 Art. 18',
  ];

  return (
    <div className="w-full xl:w-96 shrink-0 flex flex-col gap-4">
      {/* 1. Capacitador IA por Voz Card */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] p-4 sm:p-5 shadow-xs">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#0B192C] text-[#D4AF37] flex items-center justify-center">
              <Mic className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-[#0B192C]">Capacitador IA por Voz</h3>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#fed65b] text-[#745c00] font-mono">
            Gemini 2.5
          </span>
        </div>

        {/* Audio Spectrum Card */}
        <div className="bg-[#0B192C] rounded-xl p-4 text-white relative overflow-hidden mb-3">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-2">
            <span className="uppercase tracking-widest text-[#fed65b]">Espectro Vocal</span>
            <span>48.0 kHz · 24-bit</span>
          </div>

          {/* Dynamic Frequency Waveform */}
          <div className="h-12 flex items-center justify-center gap-1.5 py-1">
            {[4, 12, 24, 38, 48, 30, 44, 20, 36, 48, 28, 14, 8].map((h, i) => (
              <div
                key={i}
                className={`w-1 rounded-full transition-all duration-200 ${
                  voiceStatus === 'listening' || voiceStatus === 'speaking'
                    ? 'bg-[#fed65b] animate-pulse'
                    : 'bg-[#fed65b]/40'
                }`}
                style={{
                  height:
                    voiceStatus === 'listening' || voiceStatus === 'speaking'
                      ? `${Math.max(8, (h * (1 + Math.sin(Date.now() / 200 + i))) % 42)}px`
                      : `${h * 0.4}px`,
                }}
              />
            ))}
          </div>

          <p className="text-center text-[11px] font-mono text-slate-300 mt-2">
            {voiceStatus === 'listening' && (
              <span className="text-[#10B981] font-semibold animate-pulse">
                Gemini Legal Activo · Escuchando...
              </span>
            )}
            {voiceStatus === 'speaking' && (
              <span className="text-[#fed65b] font-semibold">
                Dr. Valenzuela · Explicando por Voz...
              </span>
            )}
            {voiceStatus === 'idle' && (
              <span className="text-slate-400">Gemini Legal Activo · Listo</span>
            )}
          </p>
        </div>

        {/* Voice Control Buttons & Voice Selector */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleVoice}
            className={`flex-1 h-11 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs ${
              isListening
                ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                : 'bg-[#735c00] hover:bg-[#574500] text-white'
            }`}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            <span>{isListening ? 'Detener Voz' : 'Pulsar / Hablar'}</span>
          </button>

          <select
            value={selectedVoice}
            onChange={(e) => setSelectedVoice(e.target.value)}
            className="h-11 px-2.5 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-[11px] font-medium text-[#0B192C] focus:outline-hidden"
            title="Seleccionar Persona de Voz"
          >
            <option value="Puck">Voz ES-LATAM (Dr. Valenzuela)</option>
            <option value="Kore">Voz Especialista Femenina</option>
            <option value="Zephyr">Voz Ejecutiva Neutra</option>
          </select>
        </div>
      </div>

      {/* 2. Subir Contrato o Presentación PDF */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] p-4 sm:p-5 shadow-xs">
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-[#cbd5e1] hover:border-[#0B192C] rounded-xl p-4 text-center cursor-pointer transition-colors group bg-[#f8fafc]"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.pptx,.xlsx,.txt"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                onUploadFile(e.target.files[0]);
              }
            }}
          />
          <Upload className="w-6 h-6 text-[#64748B] group-hover:text-[#0B192C] mx-auto mb-1.5 transition-colors" />
          <h4 className="text-xs font-bold text-[#0B192C]">
            Subir contrato o balance (PDF, XLSX)
          </h4>
          <p className="text-[10px] text-[#64748B] mt-0.5">
            Escrutinio normativo instantáneo con citas de ley
          </p>
        </div>

        {/* Active Presentation Quick Badge & Reader Trigger */}
        {activePresentation && (
          <div className="mt-3 p-3 bg-[#F8FAFC] border border-[#e2e8f0] rounded-xl flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <FileText className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[#0B192C] truncate">
                  {activePresentation.fileName}
                </p>
                <p className="text-[10px] text-[#64748B]">
                  Diapositiva {activeSlideNumber} de {activePresentation.totalPages} ·{' '}
                  <span className="text-[#10B981] font-bold">100% REGULADO</span>
                </p>
              </div>
            </div>

            <button
              onClick={onOpenPresentationViewer}
              className="px-2 py-1 bg-[#0B192C] hover:bg-[#1E3E62] text-white rounded-md text-[10px] font-bold shrink-0 flex items-center gap-1 transition-colors"
            >
              <Maximize2 className="w-3 h-3" />
              <span>Ver Diapos</span>
            </button>
          </div>
        )}
      </div>

      {/* 3. Consultoría en Tiempo Real Chat Stream */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] p-4 sm:p-5 shadow-xs flex flex-col flex-1 min-h-[460px]">
        {/* Stream Header */}
        <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-3 mb-3">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B192C]">
              Consultoría en Tiempo Real
            </h4>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-[10px] font-mono font-medium text-[#64748B]">
                Gemini AI Legal Core: En Línea v2025.4-SEC
              </span>
            </div>
          </div>
        </div>

        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto max-h-[380px] space-y-3 pr-1 text-xs">
          {messages.map((msg) => {
            const isAssistant = msg.role === 'assistant';
            return (
              <div
                key={msg.id}
                className={`p-3.5 rounded-xl border ${
                  isAssistant
                    ? 'bg-[#F8FAFC] border-[#e2e8f0]'
                    : 'bg-[#0B192C] text-white border-transparent ml-4'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] mb-1.5">
                  <span
                    className={`font-bold uppercase tracking-wider ${
                      isAssistant ? 'text-[#735c00]' : 'text-[#fed65b]'
                    }`}
                  >
                    {isAssistant ? 'Gemini Legal Core' : 'Tú'}
                  </span>
                  <span className={isAssistant ? 'text-[#94a3b8]' : 'text-slate-300'}>
                    {msg.timestamp}
                  </span>
                </div>

                <p
                  className={`leading-relaxed whitespace-pre-line ${
                    isAssistant ? 'text-[#1E293B]' : 'text-white'
                  }`}
                >
                  {msg.content}
                </p>

                {/* Citations if available */}
                {isAssistant && msg.citations && msg.citations.length > 0 && (
                  <div className="mt-2.5 pt-2 border-t border-[#e2e8f0] flex flex-wrap gap-1">
                    {msg.citations.map((c, i) => (
                      <span
                        key={i}
                        className="px-1.5 py-0.5 rounded bg-amber-50 border border-amber-200 text-[#745c00] text-[9px] font-mono font-bold"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                )}

                {/* Voice Replay Trigger for Assistant */}
                {isAssistant && (
                  <div className="mt-2 flex justify-end">
                    <button
                      onClick={() => handlePlayAudio(msg)}
                      className="inline-flex items-center gap-1 text-[10px] font-bold text-[#64748B] hover:text-[#0B192C] transition-colors"
                      title="Escuchar explicación por voz"
                    >
                      {playingMessageId === msg.id ? (
                        <>
                          <Square className="w-3 h-3 text-rose-500 fill-current" />
                          <span className="text-rose-600">Pausar</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>Escuchar</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#e2e8f0] flex items-center gap-2 text-xs text-[#64748B]">
              <Loader2 className="w-4 h-4 animate-spin text-[#D4AF37]" />
              <span>Dr. Valenzuela analizando normativas y contexto fiduciario...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        <div className="pt-3 border-t border-[#f1f5f9]">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] mb-1.5">
            Prompts Rápidos:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p)}
                className="px-2.5 py-1 bg-[#F1F5F9] hover:bg-[#e2e8f0] text-[#1E293B] rounded-md text-[11px] font-medium transition-colors"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Input & Send Bar */}
        <div className="mt-3 flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Consultar artículo o pedir explicación..."
              className="w-full h-10 pl-3 pr-8 bg-[#f8fafc] border border-[#cbd5e1] focus:border-[#0B192C] focus:bg-white rounded-xl text-xs text-[#0B192C] placeholder-[#94a3b8] focus:outline-hidden transition-all"
            />
            <button
              onClick={handleToggleVoice}
              className={`absolute right-2 top-2 p-1 rounded-md transition-colors ${
                isListening ? 'text-rose-500' : 'text-[#94a3b8] hover:text-[#0B192C]'
              }`}
              title="Voz continua"
            >
              <Mic className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => handleSend()}
            disabled={!inputText.trim() || isLoading}
            className="w-10 h-10 rounded-xl bg-[#0B192C] hover:bg-[#1E3E62] disabled:opacity-40 text-white flex items-center justify-center shrink-0 transition-colors shadow-xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4. Certificación Fiduciaria Seal */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] p-4 sm:p-5 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck className="w-4 h-4 text-[#10B981]" />
          <h4 className="text-xs font-bold text-[#0B192C]">Certificación Fiduciaria</h4>
        </div>
        <p className="text-[11px] text-[#475569] leading-relaxed">
          Conforme al <strong>Art. 18 de la Ley 7572/2025</strong> de Paraguay, el mega-proyecto{' '}
          <strong>La Nueva Santa Cruz (11 Torres)</strong> no incurre en captación masiva ni
          intermediación pasiva no autorizada.
        </p>
        <div className="mt-3 pt-2 border-t border-[#f1f5f9] flex items-center justify-between text-[10px] font-mono">
          <span className="text-[#64748B]">Hash Doc: #49F-2025</span>
          <span className="font-bold text-[#10B981] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            100% REGULADO
          </span>
        </div>
      </div>
    </div>
  );
};
