import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Panel, PanelHeader, Field, StatusTag, btn } from "@/components/kit";
import { personById, casesForPerson } from "@/lib/demo-data";

export const Route = createFileRoute("/hr/people/$personId")({
  loader: ({ params }) => {
    const person = personById(params.personId);
    if (!person) throw notFound();
    return { person, associated: casesForPerson(person.id) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Employee unavailable — Caseflow" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const title = `${loaderData.person.name} — Caseflow`;
    const description = `Organizational profile for ${loaderData.person.name}, ${loaderData.person.role} in ${loaderData.person.department}, including associated cases.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: PersonProfile,
  notFoundComponent: PersonNotFound,
});

function PersonNotFound() {
  return (
    <div className="py-16 text-center">
      <p className="text-sm font-medium">Employee not found</p>
      <p className="mt-1 text-[0.8125rem] text-muted-foreground">
        This employee ID does not exist in the demonstration data.
      </p>
      <div className="mt-6">
        <Link to="/hr/people" className={btn.secondary}>
          Back to people
        </Link>
      </div>
    </div>
  );
}

function PersonProfile() {
  const { person, associated } = Route.useLoaderData();

  return (
    <>
      <Link
        to="/hr/people"
        className="focus-ring inline-flex items-center gap-1.5 text-[0.8125rem] text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" strokeWidth={1.75} />
        Back to people
      </Link>

      <div className="mt-4 border-b border-border pb-6">
        <h1 className="text-[1.375rem] font-semibold tracking-[-0.02em]">
          {person.name}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {person.role} · {person.department}
        </p>
      </div>

      <div className="mt-8 space-y-6">
        <Panel>
          <PanelHeader title="Organizational profile" />
          <div className="grid gap-x-12 gap-y-7 px-6 py-6 md:grid-cols-2">
            <Field label="Name">{person.name}</Field>
            <Field label="Employee ID">
              <span className="font-mono text-[0.8125rem]">{person.id}</span>
            </Field>
            <Field label="Department">{person.department}</Field>
            <Field label="Role">{person.role}</Field>
            <Field label="Manager">{person.manager}</Field>
          </div>
        </Panel>

        <Panel>
          <PanelHeader
            title="Associated cases"
            description="Cases in which this employee is recorded as reporting employee, person mentioned or potential witness."
          />
          {associated.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-sm font-medium">No associated cases</p>
              <p className="mt-1 text-[0.8125rem] text-muted-foreground">
                This employee is not associated with any case in the current records.
              </p>
            </div>
          ) : (
            <table className="w-full text-left text-[0.875rem]">
              <thead>
                <tr className="border-b border-border">
                  <th className="label-caps px-6 py-2.5 font-semibold">Case</th>
                  <th className="label-caps px-6 py-2.5 font-semibold">Association</th>
                  <th className="label-caps px-6 py-2.5 font-semibold">Submitted</th>
                  <th className="label-caps px-6 py-2.5 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {associated.map((c) => (
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
                    <td className="px-6 py-3.5 text-muted-foreground">
                      {c.people.find((p) => p.personId === person.id)?.label}
                    </td>
                    <td className="px-6 py-3.5 text-muted-foreground">{c.submitted}</td>
                    <td className="px-6 py-3.5">
                      <StatusTag status={c.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Panel>
      </div>
    </>
  );
}
