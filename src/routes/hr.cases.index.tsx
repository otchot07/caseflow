import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PageHeader, Panel, StatusTag, inputClass, selectClass } from "@/components/kit";
import { cases, categories } from "@/lib/demo-data";

export const Route = createFileRoute("/hr/cases/")({
  head: () => ({
    meta: [
      { title: "Cases — Caseflow" },
      {
        name: "description",
        content:
          "All submitted workplace cases with category, submission date, people involved and assigned reviewer.",
      },
      { property: "og:title", content: "Cases — Caseflow" },
      {
        property: "og:description",
        content:
          "All submitted workplace cases with category, submission date, people involved and assigned reviewer.",
      },
    ],
  }),
  component: CasesPage,
});

const statusOptions = ["Status: all", "Awaiting review", "In review", "Closed"];
const dateOptions = ["Date: all time", "Last 7 days", "Last 30 days", "Last 90 days"];

function CasesPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState(statusOptions[0]);
  const [category, setCategory] = useState("Category: all");
  const [dateRange, setDateRange] = useState(dateOptions[0]);

  const filtered = useMemo(() => {
    const today = new Date("2026-09-09");
    const days =
      dateRange === "Last 7 days"
        ? 7
        : dateRange === "Last 30 days"
          ? 30
          : dateRange === "Last 90 days"
            ? 90
            : null;

    return cases
      .filter((c) => (status === statusOptions[0] ? true : c.status === status))
      .filter((c) => (category === "Category: all" ? true : c.category === category))
      .filter((c) => {
        if (!days) return true;
        const diff =
          (today.getTime() - new Date(c.submittedISO).getTime()) / 86_400_000;
        return diff <= days;
      })
      .filter((c) =>
        `${c.id} ${c.subject} ${c.category} ${c.assignedTo}`
          .toLowerCase()
          .includes(query.trim().toLowerCase()),
      );
  }, [query, status, category, dateRange]);

  return (
    <>
      <PageHeader
        title="Cases"
        subtitle="All reports submitted through intake, including closed cases."
      />

      <Panel>
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
            {statusOptions.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Filter by category"
            className={selectClass}
          >
            {["Category: all", ...categories].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            aria-label="Filter by date"
            className={selectClass}
          >
            {dateOptions.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
          <span className="ml-auto font-mono text-[0.75rem] text-muted-foreground">
            {filtered.length} of {cases.length}
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="text-sm font-medium">No cases found</p>
            <p className="mx-auto mt-1 max-w-sm text-[0.8125rem] text-muted-foreground">
              No case matches the current search and filters. Try clearing the date
              range or category.
            </p>
          </div>
        ) : (
          <table className="w-full text-left text-[0.875rem]">
            <thead>
              <tr className="border-b border-border">
                <th className="label-caps px-6 py-2.5 font-semibold">Case ID</th>
                <th className="label-caps px-6 py-2.5 font-semibold">Category</th>
                <th className="label-caps px-6 py-2.5 font-semibold">Submitted</th>
                <th className="label-caps px-6 py-2.5 text-right font-semibold">
                  People involved
                </th>
                <th className="label-caps px-6 py-2.5 font-semibold">Assigned to</th>
                <th className="label-caps px-6 py-2.5 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((c) => (
                <tr key={c.id} className="group transition-colors hover:bg-surface-sunken">
                  <td className="px-6 py-3.5">
                    <Link
                      to="/hr/cases/$caseId"
                      params={{ caseId: c.id }}
                      className="focus-ring font-mono text-[0.8125rem] group-hover:text-primary"
                    >
                      {c.id}
                    </Link>
                  </td>
                  <td className="px-6 py-3.5">{c.category}</td>
                  <td className="px-6 py-3.5 text-muted-foreground">{c.submitted}</td>
                  <td className="px-6 py-3.5 text-right font-mono text-[0.8125rem] text-muted-foreground">
                    {c.peopleCount}
                  </td>
                  <td className="px-6 py-3.5 text-muted-foreground">{c.assignedTo}</td>
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
