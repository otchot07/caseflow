import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Paperclip, ArrowUp, Mic, Keyboard } from "lucide-react";
import { btn } from "@/components/kit";
import { VoiceRecorder } from "@/components/voice-recorder";
import { intakePrompts, type IntakePrompt } from "@/lib/demo-data";

export const Route = createFileRoute("/report")({
  head: () => ({
    meta: [
      { title: "Workplace report — Caseflow" },
      {
        name: "description",
        content:
          "Describe a workplace situation in your own words, by voice or in writing. Caseflow asks only about what still needs clarification.",
      },
      { property: "og:title", content: "Workplace report — Caseflow" },
      {
        property: "og:description",
        content:
          "Describe a workplace situation in your own words, by voice or in writing.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ReportConversation,
});

type Turn =
  | { role: "system"; id: string; text: string }
  | { role: "employee"; id: string; text: string; mode: "voice" | "text" }
  | { role: "attachment"; id: string; text: string };

type Mode = "unset" | "voice" | "text";

/** Picks the next question, skipping anything the employee already covered. */
function nextPrompt(asked: string[], answers: string[]): IntakePrompt | null {
  const said = answers.join(" ").toLowerCase();
  for (const prompt of intakePrompts) {
    if (asked.includes(prompt.id)) continue;
    if (prompt.coveredBy?.some((phrase) => said.includes(phrase))) continue;
    return prompt;
  }
  return null;
}

function ReportConversation() {
  const navigate = useNavigate();
  const first = intakePrompts[0]!;
  const [turns, setTurns] = useState<Turn[]>([
    { role: "system", id: first.id, text: first.question },
  ]);
  const [asked, setAsked] = useState<string[]>([first.id]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [draft, setDraft] = useState("");
  const [mode, setMode] = useState<Mode>("unset");
  const [thinking, setThinking] = useState(false);
  const [done, setDone] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const current = useMemo(
    () => intakePrompts.find((p) => p.id === asked[asked.length - 1]) ?? null,
    [asked],
  );

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [turns, thinking, mode]);

  useEffect(() => {
    if (mode === "text" && !done && !thinking) inputRef.current?.focus();
  }, [mode, done, thinking]);

  function send(value: string, via: "voice" | "text") {
    const text = value.trim();
    if (!text || thinking || done) return;
    const answered = [...answers, text];
    setTurns((prev) => [
      ...prev,
      { role: "employee", id: `a-${prev.length}`, text, mode: via },
    ]);
    setAnswers(answered);
    setDraft("");
    setThinking(true);

    const upcoming = nextPrompt(asked, answered);
    window.setTimeout(() => {
      setThinking(false);
      if (!upcoming) {
        setDone(true);
        return;
      }
      setAsked((prev) => [...prev, upcoming.id]);
      setTurns((prev) => [
        ...prev,
        { role: "system", id: upcoming.id, text: upcoming.question },
      ]);
    }, 800);
  }

  function attach() {
    setTurns((prev) => [
      ...prev,
      {
        role: "attachment",
        id: `f-${prev.length}`,
        text: `scheduling-email-${prev.length}.pdf attached`,
      },
    ]);
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex h-14 w-full max-w-2xl items-center justify-between px-6">
          <div className="flex items-baseline gap-2.5">
            <Link
              to="/"
              className="focus-ring text-[0.9375rem] font-semibold tracking-[-0.01em]"
            >
              Caseflow
            </Link>
            <span className="text-[0.8125rem] text-muted-foreground">
              Workplace report
            </span>
          </div>
          <div className="flex items-center gap-5">
            <span className="text-[0.75rem] text-muted-foreground">
              {done ? "Report prepared" : "Preparing your report"}
            </span>
            <Link
              to="/"
              className="focus-ring text-[0.8125rem] text-muted-foreground hover:text-foreground"
            >
              Exit
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-14">
        {turns.length === 1 ? (
          <p className="mb-10 text-[0.875rem] leading-relaxed text-muted-foreground">
            Tell us what happened in your own words. You can speak or type.
          </p>
        ) : null}

        <div className="space-y-8">
          {turns.map((turn) =>
            turn.role === "system" ? (
              <p
                key={turn.id}
                className="max-w-[34rem] text-[1.0625rem] font-medium leading-snug tracking-[-0.01em] text-foreground"
              >
                {turn.text}
              </p>
            ) : turn.role === "employee" ? (
              <div key={turn.id} className="flex justify-end">
                <div className="max-w-[30rem] border-l-2 border-border pl-4">
                  <div className="label-caps flex items-center gap-1.5">
                    {turn.mode === "voice" ? (
                      <Mic className="size-3" strokeWidth={2} />
                    ) : null}
                    {turn.mode === "voice" ? "You · spoken" : "You"}
                  </div>
                  <p className="mt-1.5 text-[0.875rem] leading-relaxed text-foreground">
                    {turn.text}
                  </p>
                </div>
              </div>
            ) : (
              <div
                key={turn.id}
                className="flex items-center gap-2 text-[0.8125rem] text-muted-foreground"
              >
                <Paperclip className="size-3.5" strokeWidth={1.75} />
                {turn.text}
              </div>
            ),
          )}

          {thinking ? (
            <p className="text-[0.8125rem] text-muted-foreground">
              Reading your answer…
            </p>
          ) : null}

          {done ? (
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
              <p className="text-[0.875rem] text-muted-foreground">
                Thank you. We have enough to put your report together.
              </p>
              <Link to="/report/review" className={btn.primary}>
                See what we&apos;ve captured
              </Link>
            </div>
          ) : null}
          <div ref={endRef} />
        </div>
      </main>

      {!done ? (
        <div className="sticky bottom-0 border-t border-border bg-surface">
          <div className="mx-auto w-full max-w-2xl px-6 py-4">
            {mode === "unset" ? (
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className={btn.primary}
                  onClick={() => setMode("voice")}
                >
                  <Mic className="size-4" strokeWidth={1.75} />
                  Speak
                </button>
                <button
                  type="button"
                  className={btn.secondary}
                  onClick={() => setMode("text")}
                >
                  <Keyboard className="size-4" strokeWidth={1.75} />
                  Type instead
                </button>
              </div>
            ) : mode === "voice" ? (
              <VoiceRecorder
                transcriptSource={current?.example ?? ""}
                disabled={thinking}
                onSwitchToText={() => setMode("text")}
                onSubmit={(text) => send(text, "voice")}
              />
            ) : (
              <div className="rounded-md border border-input bg-surface">
                <label htmlFor="answer" className="sr-only">
                  Your response
                </label>
                <textarea
                  id="answer"
                  ref={inputRef}
                  rows={3}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send(draft, "text");
                    }
                  }}
                  placeholder="Describe what happened…"
                  className="focus-ring w-full resize-none bg-transparent px-3.5 py-3 text-sm leading-relaxed outline-none placeholder:text-muted-foreground/70"
                />
                <div className="flex items-center justify-between border-t border-border px-2.5 py-2">
                  <div className="flex items-center gap-1">
                    <button type="button" className={btn.ghost} onClick={attach}>
                      <Paperclip className="size-4" strokeWidth={1.75} />
                      Attach
                    </button>
                    <button
                      type="button"
                      className={btn.ghost}
                      onClick={() => setMode("voice")}
                    >
                      <Mic className="size-4" strokeWidth={1.75} />
                      Switch to voice
                    </button>
                    {current ? (
                      <button
                        type="button"
                        className={btn.link + " ml-2"}
                        onClick={() => setDraft(current.example)}
                      >
                        Use example answer
                      </button>
                    ) : null}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className={btn.ghost}
                      onClick={() => navigate({ to: "/" })}
                    >
                      Save and continue later
                    </button>
                    <button
                      type="button"
                      className={btn.primary}
                      onClick={() => send(draft, "text")}
                      disabled={thinking || draft.trim().length === 0}
                    >
                      Send
                      <ArrowUp className="size-3.5" strokeWidth={2} />
                    </button>
                  </div>
                </div>
              </div>
            )}
            <p className="mt-2.5 text-[0.75rem] text-muted-foreground">
              Your responses are handled confidentially and reviewed by an
              authorized person.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
