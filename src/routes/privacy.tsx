import { createFileRoute, Link } from "@tanstack/react-router";
import { Panel } from "@/components/kit";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy — Caseflow" },
      {
        name: "description",
        content:
          "How information submitted through Caseflow is handled, who can access it and how long it is retained.",
      },
      { property: "og:title", content: "Privacy — Caseflow" },
      {
        property: "og:description",
        content:
          "How information submitted through Caseflow is handled, who can access it and how long it is retained.",
      },
    ],
  }),
  component: PrivacyPage,
});

const sections = [
  {
    title: "Who can see your report",
    body: "Reports are accessible only to authorized employee-relations personnel. Access is recorded in the case history. Colleagues and line managers do not receive access to a report unless they are formally assigned to review it.",
  },
  {
    title: "What is captured",
    body: "Only the information you provide during intake is captured: your description of the situation, the dates and people you mention, any material you attach and any additional context you add before submitting.",
  },
  {
    title: "How the information is used",
    body: "Submitted information is used to prepare an initial overview for the reviewer. An overview summarizes what was reported and does not establish factual findings. Decisions are taken by a qualified reviewer.",
  },
  {
    title: "Retention",
    body: "Case records are retained for 24 months after closure, after which they are deleted or anonymized in line with the organization's data retention policy.",
  },
];

function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-6">
          <Link to="/" className="focus-ring text-[0.9375rem] font-semibold tracking-[-0.01em]">
            Caseflow
          </Link>
          <Link
            to="/"
            className="focus-ring text-[0.8125rem] text-muted-foreground hover:text-foreground"
          >
            Back
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-16">
        <h1 className="text-[1.5rem] font-semibold tracking-[-0.02em]">Privacy</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          A short summary of how information submitted through Caseflow is handled.
        </p>

        <Panel className="mt-8 divide-y divide-border">
          {sections.map((s) => (
            <div key={s.title} className="px-6 py-5">
              <h2 className="text-sm font-semibold">{s.title}</h2>
              <p className="mt-1.5 text-[0.875rem] leading-relaxed text-muted-foreground">
                {s.body}
              </p>
            </div>
          ))}
        </Panel>
      </main>
    </div>
  );
}
