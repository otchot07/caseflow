import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, Panel, PanelHeader, btn, inputClass } from "@/components/kit";

export const Route = createFileRoute("/hr/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Caseflow" },
      {
        name: "description",
        content:
          "Organization details, users and permissions, notifications, privacy and data retention settings.",
      },
      { property: "og:title", content: "Settings — Caseflow" },
      {
        property: "og:description",
        content:
          "Organization details, users and permissions, notifications, privacy and data retention settings.",
      },
    ],
  }),
  component: SettingsPage,
});

const tabs = [
  "Organization",
  "Users & permissions",
  "Notifications",
  "Privacy",
  "Data retention",
] as const;

const users = [
  { name: "K. Sandberg", email: "k.sandberg@example-company.eu", role: "Administrator" },
  { name: "M. Petrova", email: "m.petrova@example-company.eu", role: "Reviewer" },
  { name: "J. Lindqvist", email: "j.lindqvist@example-company.eu", role: "Reviewer" },
  { name: "A. Sorensen", email: "a.sorensen@example-company.eu", role: "Read only" },
];

function Row({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid items-start gap-3 px-6 py-5 md:grid-cols-[18rem_1fr]">
      <div>
        <div className="text-[0.875rem] font-medium">{label}</div>
        {description ? (
          <div className="mt-0.5 text-[0.8125rem] text-muted-foreground">
            {description}
          </div>
        ) : null}
      </div>
      <div className="max-w-md">{children}</div>
    </div>
  );
}

function Toggle({ defaultOn = false, label }: { defaultOn?: boolean; label: string }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => setOn((v) => !v)}
      className={`focus-ring relative h-5 w-9 rounded-full border transition-colors ${
        on ? "border-primary bg-primary" : "border-input bg-surface-sunken"
      }`}
    >
      <span
        className={`absolute top-0.5 size-3.5 rounded-full bg-surface transition-all ${
          on ? "left-[1.125rem]" : "left-0.5"
        } ${on ? "" : "border border-input"}`}
      />
    </button>
  );
}

function SettingsPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Organization");

  return (
    <>
      <PageHeader
        title="Settings"
        subtitle="Configuration for intake, review and data handling."
      />

      <div className="flex flex-wrap gap-1 border-b border-border">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`focus-ring -mb-px border-b-2 px-3 py-2 text-[0.8125rem] transition-colors ${
              tab === t
                ? "border-primary font-medium text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {tab === "Organization" ? (
          <Panel>
            <PanelHeader title="Organization" description="Basic organization details." />
            <div className="divide-y divide-border">
              <Row label="Organization name">
                <input className={inputClass} defaultValue="Example Company GmbH" />
              </Row>
              <Row label="Primary location">
                <input className={inputClass} defaultValue="Berlin, Germany" />
              </Row>
              <Row label="Employee-relations contact">
                <input
                  className={inputClass}
                  defaultValue="employee-relations@example-company.eu"
                />
              </Row>
              <Row label="Case reference format" description="Applied to new cases.">
                <input className={inputClass} defaultValue="HR-YYYY-NNNN" />
              </Row>
            </div>
            <div className="border-t border-border px-6 py-4">
              <button type="button" className={btn.primary}>
                Save changes
              </button>
            </div>
          </Panel>
        ) : null}

        {tab === "Users & permissions" ? (
          <Panel>
            <PanelHeader
              title="Users & permissions"
              description="People with access to case records."
              action={
                <button type="button" className={btn.secondary}>
                  Invite user
                </button>
              }
            />
            <table className="w-full text-left text-[0.875rem]">
              <thead>
                <tr className="border-b border-border">
                  <th className="label-caps px-6 py-2.5 font-semibold">Name</th>
                  <th className="label-caps px-6 py-2.5 font-semibold">Email</th>
                  <th className="label-caps px-6 py-2.5 font-semibold">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {users.map((u) => (
                  <tr key={u.email}>
                    <td className="px-6 py-3.5 font-medium">{u.name}</td>
                    <td className="px-6 py-3.5 text-muted-foreground">{u.email}</td>
                    <td className="px-6 py-3.5 text-muted-foreground">{u.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>
        ) : null}

        {tab === "Notifications" ? (
          <Panel>
            <PanelHeader
              title="Notifications"
              description="Email notifications for reviewers."
            />
            <div className="divide-y divide-border">
              <Row label="New case submitted" description="Sent to all administrators.">
                <Toggle defaultOn label="New case submitted" />
              </Row>
              <Row label="Case assigned to me">
                <Toggle defaultOn label="Case assigned to me" />
              </Row>
              <Row
                label="Case awaiting review for more than 48 hours"
                description="Reminder to administrators."
              >
                <Toggle defaultOn label="Case awaiting review reminder" />
              </Row>
              <Row label="Weekly summary">
                <Toggle label="Weekly summary" />
              </Row>
            </div>
          </Panel>
        ) : null}

        {tab === "Privacy" ? (
          <Panel>
            <PanelHeader
              title="Privacy"
              description="How case information is disclosed and recorded."
            />
            <div className="divide-y divide-border">
              <Row
                label="Record access in case history"
                description="Every view of a case record is logged."
              >
                <Toggle defaultOn label="Record access in case history" />
              </Row>
              <Row
                label="Allow anonymous intake"
                description="Employees may submit without providing their name."
              >
                <Toggle label="Allow anonymous intake" />
              </Row>
              <Row
                label="Restrict evidence downloads"
                description="Attachments can be viewed but not downloaded."
              >
                <Toggle defaultOn label="Restrict evidence downloads" />
              </Row>
            </div>
          </Panel>
        ) : null}

        {tab === "Data retention" ? (
          <Panel>
            <PanelHeader
              title="Data retention"
              description="Retention periods applied after case closure."
            />
            <div className="divide-y divide-border">
              <Row label="Closed case records">
                <select className={inputClass} defaultValue="24 months">
                  <option>12 months</option>
                  <option>24 months</option>
                  <option>36 months</option>
                </select>
              </Row>
              <Row label="Attachments">
                <select className={inputClass} defaultValue="12 months">
                  <option>6 months</option>
                  <option>12 months</option>
                  <option>24 months</option>
                </select>
              </Row>
              <Row label="Draft reports" description="Unsubmitted employee drafts.">
                <select className={inputClass} defaultValue="30 days">
                  <option>14 days</option>
                  <option>30 days</option>
                  <option>90 days</option>
                </select>
              </Row>
              <Row
                label="Anonymize instead of delete"
                description="Retain statistics without identifying information."
              >
                <Toggle defaultOn label="Anonymize instead of delete" />
              </Row>
            </div>
            <div className="border-t border-border px-6 py-4">
              <button type="button" className={btn.primary}>
                Save changes
              </button>
            </div>
          </Panel>
        ) : null}
      </div>
    </>
  );
}
