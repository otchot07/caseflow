import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Paperclip, ArrowUp } from "lucide-react";
import { btn } from "@/components/kit";
import { intakeQuestions } from "@/lib/demo-data";

export const Route = createFileRoute("/report")({
  head: () => ({
    meta: [
      { title: "Report intake — Caseflow" },
      {
        name: "description",
        content:
          "A guided interview that captures the situation, dates, people involved and any related material.",
      },
      { property: "og:title", content: "Report intake — Caseflow" },
      {
        property: "og:description",
        content:
          "A guided interview that captures the situation, dates, people involved and any related material.",
      },
    ],
  }),
  component: ReportIntake,
});

type Entry = { question: string; answer: string | null };

const seeded: Entry[] = [
  {
    question: intakeQuestions[0] ?? "",
    answer:
      "I've been having problems with my manager for the last few months. It started with changes to my schedule that were made without discussing them with me first.",
  },
  {
    question: intakeQuestions[1] ?? "",
    answer:
      "Around the middle of June. I can't remember the exact date, but it was the week before our team planning meeting.",
  },
];

function ReportIntake() {
  const navigate = useNavigate();
  const [entries, setEntries] = useState<Entry[]>([
    ...seeded,
    { question: intakeQuestions[2] ?? "", answer: null },
  ]);
  const [draft, setDraft] = useState("");
  const [attachments, setAttachments] = useState<string[]>([]);

  const answered = entries.filter((e) => e.answer !== null).length;
  const current = entries.length;
  const total = intakeQuestions.length;

  function submitAnswer() {
    const value = draft.trim();
    if (!value) return;
    setEntries((prev) => {
      const next = [...prev];
      const last = next[next.length - 1];
      if (last) next[next.length - 1] = { question: last.question, answer: value };
      if (next.length < total) {
        next.push({ question: intakeQuestions[next.length] ?? "", answer: null });
      }
      return next;
    });
    setDraft("");
  }

  const complete = answered + 1 > total || entries.every((e) => e.answer !== null) && entries.length === total;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex h-14 w-full max-w-3xl items-center justify-between px-6">
          <Link to="/" className="focus-ring text-[0.9375rem] font-semibold tracking-[-0.01em]">
            Caseflow
          </Link>
          <div className="flex items-center gap-5">
            <span className="font-mono text-[0.75rem] text-muted-foreground">
              {Math.min(current, total)} of {total}
            </span>
            <Link
              to="/"
              className="focus-ring text-[0.8125rem] text-muted-foreground hover:text-foreground"
            >
              Exit
            </Link>
          </div>
        </div>
        <div className="h-px w-full bg-border">
          <div
            className="h-px bg-primary transition-all duration-500"
            style={{ width: `${(Math.min(current, total) / total) * 100}%` }}
          />
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
        <div className="border-b border-border pb-6">
          <h1 className="text-[1.125rem] font-semibold tracking-[-0.015em]">
            Guided report
          </h1>
          <p className="mt-1 text-[0.8125rem] text-muted-foreground">
            Answer in your own words. You can skip anything you are unsure about and
            add it later.
          </p>
        </div>

        <ol className="mt-8 space-y-9">
          {entries.map((entry, i) => (
            <li key={i} className="grid grid-cols-[2.25rem_1fr] gap-x-4">
              <span className="pt-0.5 font-mono text-[0.75rem] text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="text-[0.9375rem] font-medium text-foreground">
                  {entry.question}
                </p>
                {entry.answer ? (
                  <div className="mt-3 rounded-md border border-border bg-surface px-4 py-3">
                    <div className="label-caps">Your answer</div>
                    <p className="mt-1.5 text-[0.875rem] leading-relaxed text-foreground">
                      {entry.answer}
                    </p>
                  </div>
                ) : (
                  <p className="mt-2 text-[0.8125rem] text-muted-foreground">
                    Waiting for your answer below.
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>

        {attachments.length > 0 ? (
          <div className="mt-8 rounded-md border border-border bg-surface px-4 py-3">
            <div className="label-caps">Attached material</div>
            <ul className="mt-2 space-y-1">
              {attachments.map((a) => (
                <li key={a} className="text-[0.8125rem] text-foreground">
                  {a}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {complete ? (
          <div className="mt-10 flex items-center justify-between gap-4 rounded-md border border-border bg-surface px-5 py-4">
            <p className="text-[0.875rem] text-muted-foreground">
              All questions answered. You can now review what has been captured.
            </p>
            <Link to="/report/review" className={btn.primary}>
              Continue to review
            </Link>
          </div>
        ) : null}
      </main>

      <div className="sticky bottom-0 border-t border-border bg-surface">
        <div className="mx-auto w-full max-w-3xl px-6 py-4">
          <div className="rounded-md border border-input bg-surface">
            <label htmlFor="answer" className="sr-only">
              Your answer
            </label>
            <textarea
              id="answer"
              rows={2}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  submitAnswer();
                }
              }}
              placeholder={complete ? "All questions answered." : "Type your answer…"}
              disabled={complete}
              className="focus-ring w-full resize-none bg-transparent px-3.5 py-3 text-sm outline-none placeholder:text-muted-foreground/70"
            />
            <div className="flex items-center justify-between border-t border-border px-2.5 py-2">
              <button
                type="button"
                className={btn.ghost}
                onClick={() =>
                  setAttachments((prev) => [
                    ...prev,
                    `attachment-${prev.length + 1}.pdf`,
                  ])
                }
              >
                <Paperclip className="size-4" strokeWidth={1.75} />
                Attach
              </button>
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
                  onClick={submitAnswer}
                  disabled={complete || draft.trim().length === 0}
                >
                  Send
                  <ArrowUp className="size-3.5" strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>
          <p className="mt-2.5 text-[0.75rem] text-muted-foreground">
            Your answers are saved as a draft until you submit the report.
          </p>
        </div>
      </div>
    </div>
  );
}
