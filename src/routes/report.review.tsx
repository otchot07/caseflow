import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { FileText, Image as ImageIcon, MessageSquare, Mail } from "lucide-react";
import { Panel, PanelHeader, btn } from "@/components/kit";

export const Route = createFileRoute("/report/review")({
  head: () => ({
    meta: [
      { title: "Review your report — Caseflow" },
      {
        name: "description",
        content:
          "Review the situation, people involved, timeline and attached material before submitting your report.",
      },
      { property: "og:title", content: "Review your report — Caseflow" },
      {
        property: "og:description",
        content:
          "Review the situation, people involved, timeline and attached material before submitting your report.",
      },
    ],
  }),
  component: ReviewReport,
});

const timeline = [
  { date: "12 June", description: "First reported disagreement." },
  { date: "18 July", description: "Second reported incident." },
  { date: "7 September", description: "Most recent reported incident." },
];

const documents = [
  { name: "Scheduling email.pdf", meta: "EMAIL · 7 Sep 2026", icon: Mail },
  { name: "Teams conversation.txt", meta: "MESSAGE · 7 Sep 2026", icon: MessageSquare },
  { name: "Screenshot.png", meta: "IMAGE · 7 Sep 2026", icon: ImageIcon },
  { name: "My own notes.docx", meta: "DOCUMENT · 8 Sep 2026", icon: FileText },
];

function EditAction() {
  return (
    <button type="button" className={btn.ghost}>
      Edit
    </button>
  );
}

function ReviewReport() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex h-14 w-full max-w-3xl items-center justify-between px-6">
          <Link to="/" className="focus-ring text-[0.9375rem] font-semibold tracking-[-0.01em]">
            Caseflow
          </Link>
          <Link
            to="/report"
            className="focus-ring text-[0.8125rem] text-muted-foreground hover:text-foreground"
          >
            Back to questions
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
        <h1 className="text-[1.375rem] font-semibold tracking-[-0.02em]">
          Review your report
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Check the information below before submitting. You can edit any section.
        </p>

        {submitted ? (
          <Panel className="mt-8 px-6 py-5">
            <h2 className="text-sm font-semibold">Report submitted</h2>
            <p className="mt-1.5 text-[0.875rem] text-muted-foreground">
              Your report has been received and will be reviewed by an authorized
              person. Reference:{" "}
              <span className="font-mono text-foreground">HR-2026-0143</span>
            </p>
          </Panel>
        ) : null}

        <div className="mt-8 space-y-6">
          <Panel>
            <PanelHeader title="Situation" action={<EditAction />} />
            <div className="px-6 py-5 text-[0.875rem] leading-relaxed text-foreground">
              Repeated disagreements with my manager about changes to my working
              schedule since June. The changes were made without prior discussion,
              and a conversation on 7 September became heated in front of two
              colleagues.
            </div>
          </Panel>

          <Panel>
            <PanelHeader title="People involved" action={<EditAction />} />
            <dl className="divide-y divide-border">
              <div className="grid gap-1 px-6 py-4 sm:grid-cols-[13rem_1fr]">
                <dt className="label-caps pt-0.5">Reporting employee</dt>
                <dd className="text-[0.875rem]">Jonas Hartmann — Engineering</dd>
              </div>
              <div className="grid gap-1 px-6 py-4 sm:grid-cols-[13rem_1fr]">
                <dt className="label-caps pt-0.5">Person(s) mentioned</dt>
                <dd className="text-[0.875rem]">Daniel Müller — Engineering Manager</dd>
              </div>
              <div className="grid gap-1 px-6 py-4 sm:grid-cols-[13rem_1fr]">
                <dt className="label-caps pt-0.5">Potential witnesses</dt>
                <dd className="text-[0.875rem]">Lena Fischer, Sarah Klein</dd>
              </div>
            </dl>
          </Panel>

          <Panel>
            <PanelHeader title="Timeline" action={<EditAction />} />
            <ol className="divide-y divide-border">
              {timeline.map((t) => (
                <li key={t.date} className="grid gap-1 px-6 py-4 sm:grid-cols-[13rem_1fr]">
                  <span className="font-mono text-[0.8125rem] text-muted-foreground">
                    {t.date}
                  </span>
                  <span className="text-[0.875rem]">{t.description}</span>
                </li>
              ))}
            </ol>
          </Panel>

          <Panel>
            <PanelHeader title="Documents and attachments" action={<EditAction />} />
            <ul className="divide-y divide-border">
              {documents.map((d) => (
                <li key={d.name} className="flex items-center gap-3 px-6 py-3.5">
                  <d.icon
                    className="size-4 shrink-0 text-muted-foreground"
                    strokeWidth={1.75}
                  />
                  <span className="text-[0.875rem]">{d.name}</span>
                  <span className="ml-auto font-mono text-[0.75rem] text-muted-foreground">
                    {d.meta}
                  </span>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel>
            <PanelHeader title="Additional information" action={<EditAction />} />
            <div className="px-6 py-5 text-[0.875rem] leading-relaxed text-foreground">
              I have not reported this before. I would prefer that my colleagues are
              not contacted before I have spoken to someone in employee relations.
            </div>
          </Panel>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-border pt-6">
          <button
            type="button"
            className={btn.primary}
            onClick={() => setSubmitted(true)}
          >
            Submit report
          </button>
          <button
            type="button"
            className={btn.secondary}
            onClick={() => navigate({ to: "/" })}
          >
            Save as draft
          </button>
        </div>
        <p className="mt-4 text-[0.75rem] leading-relaxed text-muted-foreground">
          Your report is accessible only to authorized employee-relations personnel.
          Access is recorded in the case history.
        </p>
      </main>
    </div>
  );
}
