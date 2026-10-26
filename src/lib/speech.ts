import { useCallback, useEffect, useRef, useState } from "react";

// ---------------------------------------------------------------------------
// Listening: the browser's built-in French voice (free, works offline).
// ---------------------------------------------------------------------------

export const ttsSupported = typeof window !== "undefined" && "speechSynthesis" in window;

function frenchVoice(): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices();
  const fr = voices.filter((v) => v.lang.toLowerCase().startsWith("fr"));
  // Prefer natural / online voices, then France French.
  return (
    fr.find((v) => /natural|online|google|premium|enhanced/i.test(v.name) && v.lang === "fr-FR") ??
    fr.find((v) => v.lang === "fr-FR") ??
    fr[0]
  );
}

export function hasFrenchVoice(): boolean {
  return ttsSupported && Boolean(frenchVoice());
}

/** Speaks French text sentence by sentence (long utterances get cut off in some browsers). */
export function speak(text: string, opts: { rate?: number; onEnd?: () => void } = {}) {
  if (!ttsSupported) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const parts = text.split(/(?<=[.!?…»])\s+|\n+/).map((p) => p.trim()).filter(Boolean);
  const voice = frenchVoice();
  parts.forEach((part, i) => {
    const u = new SpeechSynthesisUtterance(part);
    u.lang = "fr-FR";
    if (voice) u.voice = voice;
    u.rate = opts.rate ?? 1;
    if (i === parts.length - 1) {
      u.onend = () => opts.onEnd?.();
      u.onerror = () => opts.onEnd?.();
    }
    synth.speak(u);
  });
}

export function stopSpeaking() {
  if (ttsSupported) window.speechSynthesis.cancel();
}

// ---------------------------------------------------------------------------
// Speaking: record with MediaRecorder; transcribe with the browser's speech
// recognition where available (Chrome, Edge, Android, recent Safari).
// ---------------------------------------------------------------------------

interface RecognitionResultEvent {
  resultIndex: number;
  results: ArrayLike<{ isFinal: boolean; 0: { transcript: string } }>;
}
interface Recognition {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((e: RecognitionResultEvent) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
}
type RecognitionCtor = new () => Recognition;

function recognitionCtor(): RecognitionCtor | undefined {
  if (typeof window === "undefined") return undefined;
  const w = window as unknown as { SpeechRecognition?: RecognitionCtor; webkitSpeechRecognition?: RecognitionCtor };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition;
}

export const recognitionSupported = Boolean(recognitionCtor());
export const recordingSupported =
  typeof navigator !== "undefined" && Boolean(navigator.mediaDevices?.getUserMedia) && typeof MediaRecorder !== "undefined";

export type RecorderStatus = "idle" | "recording" | "done";

export function useRecorder(maxSeconds = 120) {
  const [status, setStatus] = useState<RecorderStatus>("idle");
  const [transcript, setTranscript] = useState("");
  const [interim, setInterim] = useState("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState("");

  const recorder = useRef<MediaRecorder | null>(null);
  const recognition = useRef<Recognition | null>(null);
  const stream = useRef<MediaStream | null>(null);
  const timer = useRef<number | null>(null);
  const active = useRef(false);
  const finals = useRef("");

  const cleanup = useCallback(() => {
    active.current = false;
    if (timer.current) window.clearInterval(timer.current);
    timer.current = null;
    recognition.current?.abort();
    recognition.current = null;
    stream.current?.getTracks().forEach((t) => t.stop());
    stream.current = null;
  }, []);

  const stop = useCallback(() => {
    if (!active.current) return;
    active.current = false;
    if (timer.current) window.clearInterval(timer.current);
    recognition.current?.stop();
    if (recorder.current?.state === "recording") recorder.current.stop();
    else cleanup();
  }, [cleanup]);

  const start = useCallback(async () => {
    setError("");
    setTranscript("");
    setInterim("");
    finals.current = "";
    setSeconds(0);
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
    try {
      stream.current = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      setError("We couldn't use your microphone. Allow microphone access in your browser and try again.");
      return;
    }
    const chunks: Blob[] = [];
    const rec = new MediaRecorder(stream.current);
    rec.ondataavailable = (e) => e.data.size && chunks.push(e.data);
    rec.onstop = () => {
      setAudioUrl(URL.createObjectURL(new Blob(chunks, { type: rec.mimeType || "audio/webm" })));
      setTranscript(finals.current.trim());
      setInterim("");
      setStatus("done");
      // Release the microphone, but let recognition deliver its last results.
      stream.current?.getTracks().forEach((t) => t.stop());
      stream.current = null;
    };
    recorder.current = rec;
    rec.start();
    active.current = true;
    setStatus("recording");

    const Ctor = recognitionCtor();
    if (Ctor) {
      const startRecognition = () => {
        const r = new Ctor();
        r.lang = "fr-FR";
        r.continuous = true;
        r.interimResults = true;
        r.onresult = (e) => {
          let live = "";
          for (let i = e.resultIndex; i < e.results.length; i++) {
            const res = e.results[i];
            if (res.isFinal) finals.current += ` ${res[0].transcript}`;
            else live += res[0].transcript;
          }
          setTranscript(finals.current.trim());
          setInterim(live);
        };
        r.onerror = (e) => {
          if (e.error === "not-allowed" || e.error === "service-not-allowed") {
            setError("Speech recognition isn't allowed in this browser, but your recording still works.");
          }
        };
        // Browsers end recognition after a pause: restart while still recording.
        r.onend = () => {
          if (active.current) {
            try {
              startRecognition();
            } catch {
              // ignore
            }
          }
        };
        recognition.current = r;
        try {
          r.start();
        } catch {
          // already started
        }
      };
      startRecognition();
    }

    const began = Date.now();
    timer.current = window.setInterval(() => {
      const s = Math.round((Date.now() - began) / 1000);
      setSeconds(s);
      if (s >= maxSeconds) stop();
    }, 500);
  }, [audioUrl, maxSeconds, stop]);

  useEffect(() => () => cleanup(), [cleanup]);

  return { status, transcript, interim, audioUrl, seconds, error, start, stop };
}
