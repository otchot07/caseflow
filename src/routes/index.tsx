import { createFileRoute, Link } from "@tanstack/react-router";
import { btn } from "@/components/kit";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Caseflow — Report a workplace concern" },
      {
        name: "description",
        content:
          "Describe a workplace concern in your own words. Caseflow guides you through a few questions so the relevant information is captured.",
      },
      { property: "og:title", content: "Caseflow — Report a workplace concern" },
      {
        property: "og:description",
        content:
          "Describe a workplace concern in your own words. Caseflow guides you through a few questions so the relevant information is captured.",
      },
    ],
  }),
  component: EmployeeLanding,
});

function EmployeeLanding() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-6">
          <Link to="/" className="focus-ring text-[0.9375rem] font-semibold tracking-[-0.01em]">
            Caseflow
          </Link>
          <Link
            to="/privacy"
            className="focus-ring text-[0.8125rem] text-muted-foreground hover:text-foreground"
          >
            Privacy
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-6 py-24">
        <div className="w-full max-w-xl text-center">
          <h1 className="text-[2rem] font-semibold leading-[1.2] tracking-[-0.02em] text-foreground">
            Tell us what happened.
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-[0.9375rem] leading-relaxed text-muted-foreground">
            You can describe a workplace concern in your own words. We'll guide you
            through a few questions to make sure the relevant information is
            captured.
          </p>
          <div className="mt-9">
            <Link to="/report" className={btn.primary}>
              Start a report
            </Link>
          </div>
          <p className="mt-5 text-[0.8125rem] text-muted-foreground">
            Your report will be reviewed by an authorized person.
          </p>
        </div>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-5 text-[0.75rem] text-muted-foreground">
          <span>Caseflow — demonstration environment with fictional data.</span>
          <Link to="/login" className="focus-ring hover:text-foreground">
            HR sign in
          </Link>
        </div>
      </footer>
    </div>
  );
}
