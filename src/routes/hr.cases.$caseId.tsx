import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  Mail,
  MessageSquare,
  Image as ImageIcon,
  FileText,
} from "lucide-react";
import {
  Panel,
  PanelHeader,
  StatusTag,
  Field,
  btn,
  inputClass,
  selectClass,
} from "@/components/kit";
import {
  caseById,
  personById,
  reviewerOptions,
  type EvidenceItem,
} from "@/lib/demo-data";

export const Route = createFileRoute("/hr/cases/$caseId")({
  loader: ({ params }) => {
    const record = caseById(params.caseId);
    if (!record) throw notFound();
    return { record };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Case unavailable — Caseflow" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.record.id} — Caseflow`;
    const description = `Case workspace for ${loaderData.record.id}: initial overview, reported information, timeline, people involved, evidence and human review.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: CaseDetail,
  notFoundComponent: CaseNotFound,
});

function CaseNotFound() {
  return (
    <div className="py-16 text-center">
      <p className="text-sm font-medium">Case not found</p>
      <p className="mt-1 text-[0.8125rem] text-muted-foreground">
        This case reference does not exist in the demonstration data.
      </p>
      <div className="mt-6">
        <Link to="/hr/cases" className={btn.secondary}>
          Back to cases
        </Link>
      </div>
    </div>
  );
}

const evidenceIcon: Record<EvidenceItem["type"], typeof Mail> = {
  EMAIL: Mail,
  MESSAGE: MessageSquare,
  IMAGE: ImageIcon,
  DOCUMENT: FileText,
};

function CaseDetail() {
  const { record } = Route.useLoaderData();
  const [status, setStatus] = useState(record.status);
  const [reviewer, setReviewer] = useState(record.review.reviewer);
  const [notes, setNotes] = useState(record.review.notes);
  const [draftNote, setDraftNote] = useState("");
  const [noteOpen, setNoteOpen] = useState(false);

  return (
    <>
      <Link
        to="/hr/cases"
        className="focus-ring inline-flex items-center gap-1.5 text-[0.8125rem] text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" strokeWidth={1.75} />
        Back to cases
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-6 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-mono text-[1.25rem] font-medium tracking-tight">
              {record.id}
            </h1>
            <StatusTag status={status} />
          </div>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {record.category} · Submitted {record.submitted} · {record.peopleCount}{" "}
            people involved
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={reviewer}
            onChange={(e) => setReviewer(e.target.value)}
            aria-label="Assign reviewer"
            className={selectClass}
          >
            {reviewerOptions.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
          <button
            type="button"
            className={btn.secondary}
            onClick={() => setNoteOpen((v) => !v)}
          >
            Add note
          </button>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as typeof status)}
            aria-label="Change status"
            className={selectClass}
          >
            <option>Awaiting review</option>
            <option>In review</option>
            <option>Closed</option>
          </select>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        <Panel>
          <PanelHeader
            title="Initial overview"
            description="Prepared from submitted information"
          />
          <div className="px-6 py-5">
            <p className="max-w-3xl text-[0.9375rem] leading-relaxed text-foreground">
              {record.overview}
            </p>

            <div className="mt-7 border-t border-border pt-5">
              <h3 className="text-[0.8125rem] font-semibold">
                Information requiring clarification
              </h3>
              <ul className="mt-2.5 space-y-1.5">
                {record.clarifications.map((c) => (
                  <li
                    key={c}
                    className="flex gap-2.5 text-[0.875rem] text-muted-foreground"
                  >
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground/60" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-6 border-l-2 border-border pl-3 text-[0.75rem] leading-relaxed text-muted-foreground">
              This overview summarizes information provided during intake and does not
              establish factual findings.
            </p>
          </div>
        </Panel>

        <Panel>
          <PanelHeader
            title="Reported information"
            description="Statements provided by the reporting employee during intake."
          />
          <div className="grid gap-x-12 gap-y-7 px-6 py-6 md:grid-cols-2">
            <Field label="Reporting employee">
              {record.people
                .filter((p) => p.label === "Reporting employee")
                .map((p) => {
                  const person = personById(p.personId);
                  return (
                    <div key={p.personId}>
                      <div>{person?.name}</div>
                      <div className="text-[0.8125rem] text-muted-foreground">
                        {person?.department} ·{" "}
                        <span className="font-mono">{person?.id}</span>
                      </div>
                    </div>
                  );
                })}
            </Field>

            <Field label="Primary person mentioned">
              {record.people
                .filter((p) => p.label === "Person mentioned")
                .map((p) => {
                  const person = personById(p.personId);
                  return (
                    <div key={p.personId}>
                      <div>{person?.name}</div>
                      <div className="text-[0.8125rem] text-muted-foreground">
                        {person?.role}
                      </div>
                    </div>
                  );
                })}
            </Field>

            <Field label="Potential witnesses">
              {record.people.filter((p) => p.label === "Potential witness").length ===
              0 ? (
                <span className="text-muted-foreground">None recorded</span>
              ) : (
                <ul className="space-y-0.5">
                  {record.people
                    .filter((p) => p.label === "Potential witness")
                    .map((p) => (
                      <li key={p.personId}>{personById(p.personId)?.name}</li>
                    ))}
                </ul>
              )}
            </Field>

            <Field label="Reported category">{record.category}</Field>

            <Field label="Reported impact" className="md:col-span-2">
              <p className="max-w-2xl leading-relaxed">{record.reportedImpact}</p>
            </Field>
          </div>
          <p className="border-t border-border px-6 py-3.5 text-[0.75rem] text-muted-foreground">
            All information in this section is as reported by the employee and has not
            been verified.
          </p>
        </Panel>

        <Panel>
          <PanelHeader title="Timeline" description="Reported sequence of events." />
          <ol className="px-6 py-6">
            {record.timeline.map((event, i) => (
              <li key={event.date} className="grid grid-cols-[9.5rem_1.5rem_1fr] gap-x-2">
                <span className="pb-8 font-mono text-[0.8125rem] text-muted-foreground">
                  {event.date}
                </span>
                <span className="relative flex justify-center">
                  <span className="mt-1.5 size-1.5 rounded-full border border-muted-foreground/50 bg-surface" />
                  {i < record.timeline.length - 1 ? (
                    <span className="absolute top-3 bottom-0 w-px bg-border" />
                  ) : null}
                </span>
                <span className="pb-8 text-[0.875rem] text-foreground">
                  {event.description}
                </span>
              </li>
            ))}
          </ol>
        </Panel>

        <Panel>
          <PanelHeader
            title="People involved"
            description="Individuals associated with this case as recorded during intake."
          />
          <ul className="divide-y divide-border">
            {record.people.map((p) => {
              const person = personById(p.personId);
              if (!person) return null;
              return (
                <li key={p.personId}>
                  <Link
                    to="/hr/people/$personId"
                    params={{ personId: person.id }}
                    className="focus-ring flex items-center gap-4 px-6 py-4 transition-colors hover:bg-surface-sunken"
                  >
                    <div className="flex-1">
                      <div className="text-[0.875rem] font-medium">{person.name}</div>
                      <div className="text-[0.8125rem] text-muted-foreground">
                        {p.label}
                      </div>
                    </div>
                    <div className="hidden text-[0.8125rem] text-muted-foreground sm:block">
                      {person.department} · {person.role}
                    </div>
                    <span className="font-mono text-[0.75rem] text-muted-foreground">
                      {person.id}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Panel>

        <Panel>
          <PanelHeader
            title="Evidence"
            description="Material submitted with the report."
          />
          {record.evidence.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-sm font-medium">No material submitted</p>
              <p className="mx-auto mt-1 max-w-sm text-[0.8125rem] text-muted-foreground">
                The reporting employee did not attach emails, messages or documents
                during intake.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {record.evidence.map((item) => {
                const Icon = evidenceIcon[item.type];
                return (
                  <li key={item.name} className="flex items-center gap-4 px-6 py-3.5">
                    <Icon
                      className="size-4 shrink-0 text-muted-foreground"
                      strokeWidth={1.75}
                    />
                    <div className="flex-1">
                      <div className="text-[0.875rem]">{item.name}</div>
                      <div className="text-[0.8125rem] text-muted-foreground">
                        Related incident: {item.incident}
                      </div>
                    </div>
                    <span className="font-mono text-[0.6875rem] tracking-wider text-muted-foreground">
                      {item.type}
                    </span>
                    <span className="w-24 text-right font-mono text-[0.75rem] text-muted-foreground">
                      {item.date}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </Panel>

        <Panel className="border-primary/25">
          <PanelHeader
            title="Human review"
            description="A qualified reviewer is responsible for assessing this case."
          />
          <div className="grid gap-x-12 gap-y-7 px-6 py-6 md:grid-cols-2">
            <Field label="Assigned reviewer">
              {reviewer === "Unassigned" ? (
                <span className="text-muted-foreground">Not yet assigned</span>
              ) : (
                reviewer
              )}
            </Field>
            <Field label="Status">
              <StatusTag status={status} />
            </Field>
            <Field label="Last updated">{record.review.lastUpdated}</Field>
            <Field label="Case history">
              {notes.length} internal note{notes.length === 1 ? "" : "s"} recorded
            </Field>
          </div>

          <div className="border-t border-border px-6 py-5">
            <div className="label-caps">Internal notes</div>
            {notes.length === 0 ? (
              <p className="mt-2 text-[0.875rem] text-muted-foreground">
                No internal notes yet. Notes are visible only to authorized
                employee-relations personnel.
              </p>
            ) : (
              <ul className="mt-3 space-y-3">
                {notes.map((n, i) => (
                  <li key={i} className="rounded-md border border-border px-4 py-3">
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="text-[0.8125rem] font-medium">{n.author}</span>
                      <span className="font-mono text-[0.75rem] text-muted-foreground">
                        {n.date}
                      </span>
                    </div>
                    <p className="mt-1.5 text-[0.875rem] leading-relaxed text-foreground">
                      {n.body}
                    </p>
                  </li>
                ))}
              </ul>
            )}

            {noteOpen ? (
              <div className="mt-4">
                <label htmlFor="note" className="sr-only">
                  New internal note
                </label>
                <textarea
                  id="note"
                  rows={3}
                  value={draftNote}
                  onChange={(e) => setDraftNote(e.target.value)}
                  placeholder="Add an internal note…"
                  className={`${inputClass} resize-none`}
                />
                <div className="mt-2.5 flex items-center gap-2">
                  <button
                    type="button"
                    className={btn.primary}
                    disabled={draftNote.trim().length === 0}
                    onClick={() => {
                      setNotes((prev) => [
                        ...prev,
                        {
                          author: reviewer === "Unassigned" ? "HR Administrator" : reviewer,
                          date: "9 Sep 2026, 08:20",
                          body: draftNote.trim(),
                        },
                      ]);
                      setDraftNote("");
                      setNoteOpen(false);
                    }}
                  >
                    Save note
                  </button>
                  <button
                    type="button"
                    className={btn.secondary}
                    onClick={() => {
                      setDraftNote("");
                      setNoteOpen(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                className={`${btn.secondary} mt-4`}
                onClick={() => setNoteOpen(true)}
              >
                Add note
              </button>
            )}
          </div>
        </Panel>
      </div>
    </>
  );
}
