import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PageHeader, Panel, PanelHeader, StatusTag, btn, inputClass, selectClass } from "@/components/kit";
import { cases, overviewStats } from "@/lib/demo-data";

export const Route = createFileRoute("/hr/")({
  head: () => ({
    meta: [
      { title: "Overview — Caseflow" },
      {
        name: "description",
        content: "Review and manage workplace cases submitted through Caseflow.",
      },
      { property: "og:title", content: "Overview — Caseflow" },
      {
        property: "og:description",
        content: "Review and manage workplace cases submitted through Caseflow.",
      },
    ],
  }),
  component: OverviewPage,
});

const statuses = ["All statuses", "Awaiting review", "In review", "Closed"];

function OverviewPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState(statuses[0]);

  const recent = useMemo(
    () =>
      cases
        .filter((c) => (status === statuses[0] ? true : c.status === status))
        .filter((c) =>
          `${c.id} ${c.subject} ${c.category}`
            .toLowerCase()
            .includes(query.trim().toLowerCase()),
        )
        .slice(0, 6),
    [query, status],
  );

  return (
    <>
      <PageHeader title="Overview" subtitle="Review and manage workplace cases." />

      <div className="grid grid-cols-2 divide-border border-y border-border sm:grid-cols-4 sm:divide-x">
        {overviewStats.map((s) => (
          <div key={s.label} className="px-5 py-5 first:pl-0">
            <div className="label-caps">{s.label}</div>
            <div className="mt-2 font-mono text-[1.375rem] font-medium tracking-tight text-foreground">
              {s.value}
            </div>
          </div>
        ))}
      </div>

      <Panel className="mt-10">
        <PanelHeader
          title="Recent cases"
          description="Cases submitted in the last 30 days."
          action={
            <Link to="/hr/cases" className={btn.secondary}>
              All cases
            </Link>
          }
        />

        <div className="flex flex-wrap items-center gap-3 border-b border-border px-6 py-3.5">
          <div className="relative w-full max-w-xs">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              strokeWidth={1.75}
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search cases..."
              aria-label="Search cases"
              className={`${inputClass} pl-9`}
            />
          </div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            aria-label="Filter by status"
            className={selectClass}
          >
            {statuses.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        {recent.length === 0 ? (
          <div className="px-6 py-14 text-center">
            <p className="text-sm font-medium">No cases match your filters</p>
            <p className="mt-1 text-[0.8125rem] text-muted-foreground">
              Adjust the search term or status filter to see more results.
            </p>
          </div>
        ) : (
          <table className="w-full text-left text-[0.875rem]">
            <thead>
              <tr className="border-b border-border">
                <th className="label-caps px-6 py-2.5 font-semibold">Case</th>
                <th className="label-caps px-6 py-2.5 font-semibold">Subject</th>
                <th className="label-caps px-6 py-2.5 font-semibold">Submitted</th>
                <th className="label-caps px-6 py-2.5 text-right font-semibold">People</th>
                <th className="label-caps px-6 py-2.5 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recent.map((c) => (
                <tr key={c.id} className="group transition-colors hover:bg-surface-sunken">
                  <td className="px-6 py-3.5">
                    <Link
                      to="/hr/cases/$caseId"
                      params={{ caseId: c.id }}
                      className="focus-ring font-mono text-[0.8125rem] text-foreground group-hover:text-primary"
                    >
                      {c.id}
                    </Link>
                  </td>
                  <td className="px-6 py-3.5">{c.subject}</td>
                  <td className="px-6 py-3.5 text-muted-foreground">
                    {c.submittedRelative}
                  </td>
                  <td className="px-6 py-3.5 text-right font-mono text-[0.8125rem] text-muted-foreground">
                    {c.peopleCount}
                  </td>
                  <td className="px-6 py-3.5">
                    <StatusTag status={c.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Panel>
    </>
  );
}
