import { useEffect, useRef, useState } from "react";
import { Mic, Square, Keyboard } from "lucide-react";
import { btn } from "@/components/kit";

/** Simulated voice capture. No speech recognition — the transcript is provided. */
export function VoiceRecorder({
  transcriptSource,
  onSubmit,
  onSwitchToText,
  disabled,
}: {
  transcriptSource: string;
  onSubmit: (text: string) => void;
  onSwitchToText: () => void;
  disabled?: boolean;
}) {
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [levels, setLevels] = useState<number[]>(() => Array(48).fill(0.12));
  const [transcript, setTranscript] = useState("");
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (!recording) return;
    const tick = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    const wave = window.setInterval(() => {
      setLevels((prev) => [
        ...prev.slice(1),
        0.15 + Math.random() * 0.8 * (0.6 + Math.random() * 0.4),
      ]);
    }, 90);
    timers.current = [tick, wave];
    return () => {
      window.clearInterval(tick);
      window.clearInterval(wave);
    };
  }, [recording]);

  function start() {
    setTranscript("");
    setSeconds(0);
    setLevels(Array(48).fill(0.12));
    setRecording(true);
  }

  function stop() {
    setRecording(false);
    setLevels(Array(48).fill(0.12));
    setTranscript(transcriptSource);
  }

  const time = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(
    seconds % 60,
  ).padStart(2, "0")}`;

  return (
    <div className="rounded-md border border-input bg-surface">
      <div className="flex items-center gap-5 px-4 py-4">
        <button
          type="button"
          onClick={recording ? stop : start}
          disabled={disabled}
          aria-label={recording ? "Stop recording" : "Start recording"}
          className="focus-ring inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-border bg-surface-sunken text-foreground transition-colors hover:bg-surface disabled:opacity-50"
        >
          {recording ? (
            <Square className="size-4 fill-current" strokeWidth={1.75} />
          ) : (
            <Mic className="size-5" strokeWidth={1.75} />
          )}
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex h-8 items-end gap-[2px]" aria-hidden="true">
            {levels.map((l, i) => (
              <span
                key={i}
                className="flex-1 rounded-[1px] bg-border"
                style={{
                  height: `${Math.round((recording ? l : 0.1) * 100)}%`,
                  backgroundColor: recording
                    ? "var(--color-muted-foreground)"
                    : undefined,
                  opacity: recording ? 0.55 : 1,
                }}
              />
            ))}
          </div>
          <div className="mt-2 flex items-center gap-3 text-[0.75rem] text-muted-foreground">
            <span className="font-mono tabular-nums">{time}</span>
            <span>
              {recording
                ? "Recording — speak naturally, then stop when you're done."
                : transcript
                  ? "Transcribed. You can edit before sending."
                  : "Press the microphone to begin."}
            </span>
          </div>
        </div>
      </div>

      {transcript ? (
        <div className="border-t border-border px-4 py-3">
          <div className="label-caps">Transcript</div>
          <textarea
            rows={3}
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            className="focus-ring mt-1.5 w-full resize-none bg-transparent text-sm leading-relaxed outline-none"
          />
        </div>
      ) : null}

      <div className="flex items-center justify-between border-t border-border px-2.5 py-2">
        <button type="button" className={btn.ghost} onClick={onSwitchToText}>
          <Keyboard className="size-4" strokeWidth={1.75} />
          Type instead
        </button>
        <button
          type="button"
          className={btn.primary}
          disabled={disabled || recording || transcript.trim().length === 0}
          onClick={() => {
            onSubmit(transcript.trim());
            setTranscript("");
            setSeconds(0);
          }}
        >
          Send response
        </button>
      </div>
    </div>
  );
}
