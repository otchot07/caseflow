import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PageHeader, Panel, inputClass } from "@/components/kit";
import { people } from "@/lib/demo-data";

export const Route = createFileRoute("/hr/people/")({
  head: () => ({
    meta: [
      { title: "People — Caseflow" },
      {
        name: "description",
        content:
          "Organizational directory of employees with department, role and employee identifier.",
      },
      { property: "og:title", content: "People — Caseflow" },
      {
        property: "og:description",
        content:
          "Organizational directory of employees with department, role and employee identifier.",
      },
    ],
  }),
  component: PeoplePage,
});

function PeoplePage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      people.filter((p) =>
        `${p.name} ${p.id} ${p.department} ${p.role}`
          .toLowerCase()
          .includes(query.trim().toLowerCase()),
      ),
    [query],
  );

  return (
    <>
      <PageHeader title="People" subtitle="Organizational directory." />

      <Panel>
        <div className="border-b border-border px-6 py-3.5">
          <div className="relative w-full max-w-xs">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              strokeWidth={1.75}
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search employees..."
              aria-label="Search employees"
              className={`${inputClass} pl-9`}
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="text-sm font-medium">No employees found</p>
            <p className="mt-1 text-[0.8125rem] text-muted-foreground">
              Try a different name, employee ID or department.
            </p>
          </div>
        ) : (
          <table className="w-full text-left text-[0.875rem]">
            <thead>
              <tr className="border-b border-border">
                <th className="label-caps px-6 py-2.5 font-semibold">Name</th>
                <th className="label-caps px-6 py-2.5 font-semibold">Employee ID</th>
                <th className="label-caps px-6 py-2.5 font-semibold">Department</th>
                <th className="label-caps px-6 py-2.5 font-semibold">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((p) => (
                <tr key={p.id} className="group transition-colors hover:bg-surface-sunken">
                  <td className="px-6 py-3.5">
                    <Link
                      to="/hr/people/$personId"
                      params={{ personId: p.id }}
                      className="focus-ring font-medium group-hover:text-primary"
                    >
                      {p.name}
                    </Link>
                  </td>
                  <td className="px-6 py-3.5 font-mono text-[0.8125rem] text-muted-foreground">
                    {p.id}
                  </td>
                  <td className="px-6 py-3.5">{p.department}</td>
                  <td className="px-6 py-3.5 text-muted-foreground">{p.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Panel>
    </>
  );
}
