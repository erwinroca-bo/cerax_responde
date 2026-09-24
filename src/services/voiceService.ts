// Web Audio and Speech synthesis utility

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

class VoiceManager {
  private recognition: any = null;
  private isListening: boolean = false;
  private currentAudio: HTMLAudioElement | null = null;
  private onTranscriptCallback: ((text: string, isFinal: boolean) => void) | null = null;
  private onStatusCallback: ((status: 'idle' | 'listening' | 'speaking' | 'processing') => void) | null = null;
  private speechSynth: SpeechSynthesis | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = 'es-ES';

        this.recognition.onresult = (event: any) => {
          let interimTranscript = '';
          let finalTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            } else {
              interimTranscript += event.results[i][0].transcript;
            }
          }

          if (this.onTranscriptCallback) {
            if (finalTranscript) {
              this.onTranscriptCallback(finalTranscript.trim(), true);
            } else if (interimTranscript) {
              this.onTranscriptCallback(interimTranscript.trim(), false);
            }
          }
        };

        this.recognition.onerror = (event: any) => {
          console.warn('Speech recognition status/error:', event.error);
          if (event.error !== 'no-speech') {
            this.isListening = false;
            this.updateStatus('idle');
          }
        };

        this.recognition.onend = () => {
          if (this.isListening) {
            try {
              this.recognition.start();
            } catch {
              this.isListening = false;
              this.updateStatus('idle');
            }
          } else {
            this.updateStatus('idle');
          }
        };
      }

      if ('speechSynthesis' in window) {
        this.speechSynth = window.speechSynthesis;
      }
    }
  }

  public setCallbacks(
    onTranscript: (text: string, isFinal: boolean) => void,
    onStatus: (status: 'idle' | 'listening' | 'speaking' | 'processing') => void
  ) {
    this.onTranscriptCallback = onTranscript;
    this.onStatusCallback = onStatus;
  }

  private updateStatus(status: 'idle' | 'listening' | 'speaking' | 'processing') {
    if (this.onStatusCallback) {
      this.onStatusCallback(status);
    }
  }

  public startListening() {
    if (!this.recognition) {
      alert('Tu navegador no soporta reconocimiento de voz nativo. Por favor usa Google Chrome o Microsoft Edge.');
      return false;
    }

    this.stopSpeaking();
    try {
      this.isListening = true;
      this.recognition.start();
      this.updateStatus('listening');
      return true;
    } catch {
      // Already running
      this.updateStatus('listening');
      return true;
    }
  }

  public stopListening() {
    this.isListening = false;
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch {
        // ignore
      }
    }
    this.updateStatus('idle');
  }

  public toggleListening(): boolean {
    if (this.isListening) {
      this.stopListening();
      return false;
    } else {
      return this.startListening();
    }
  }

  public getIsListening(): boolean {
    return this.isListening;
  }

  // Play audio from Gemini TTS base64 or fallback to Web Speech
  public async speakText(
    text: string,
    audioBase64?: string,
    mimeType: string = 'audio/mp3'
  ): Promise<void> {
    this.stopSpeaking();

    if (audioBase64) {
      try {
        this.updateStatus('speaking');
        const audioSrc = `data:${mimeType};base64,${audioBase64}`;
        this.currentAudio = new Audio(audioSrc);

        return new Promise((resolve) => {
          if (!this.currentAudio) return resolve();

          this.currentAudio.onended = () => {
            this.updateStatus('idle');
            resolve();
          };

          this.currentAudio.onerror = () => {
            this.playBrowserSpeech(text).then(resolve);
          };

          this.currentAudio.play().catch(() => {
            this.playBrowserSpeech(text).then(resolve);
          });
        });
      } catch {
        return this.playBrowserSpeech(text);
      }
    } else {
      return this.playBrowserSpeech(text);
    }
  }

  private playBrowserSpeech(text: string): Promise<void> {
    return new Promise((resolve) => {
      if (!this.speechSynth) {
        this.updateStatus('idle');
        return resolve();
      }

      this.updateStatus('speaking');
      const cleanText = text
        .replace(/[*_#`[\]()]/g, ' ')
        .replace(/\s+/g, ' ')
        .slice(0, 1000);

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'es-LA';
      utterance.rate = 1.0;
      utterance.pitch = 0.95;

      const voices = this.speechSynth.getVoices();
      const spanishVoice =
        voices.find((v) => v.lang.startsWith('es') && (v.name.includes('Natural') || v.name.includes('Google'))) ||
        voices.find((v) => v.lang.startsWith('es'));

      if (spanishVoice) {
        utterance.voice = spanishVoice;
      }

      utterance.onend = () => {
        this.updateStatus('idle');
        resolve();
      };

      utterance.onerror = () => {
        this.updateStatus('idle');
        resolve();
      };

      this.speechSynth.speak(utterance);
    });
  }

  public stopSpeaking() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }
    if (this.speechSynth) {
      this.speechSynth.cancel();
    }
    this.updateStatus('idle');
  }
}

export const voiceService = new VoiceManager();
