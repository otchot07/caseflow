import { createFileRoute } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PageHeader, Panel, PanelHeader } from "@/components/kit";
import { casesByCategory, casesByStatus, casesOverTime } from "@/lib/demo-data";

export const Route = createFileRoute("/hr/reports")({
  head: () => ({
    meta: [
      { title: "Reports — Caseflow" },
      {
        name: "description",
        content:
          "Case volume by category and status, submissions over time and average time to initial review.",
      },
      { property: "og:title", content: "Reports — Caseflow" },
      {
        property: "og:description",
        content:
          "Case volume by category and status, submissions over time and average time to initial review.",
      },
    ],
  }),
  component: ReportsPage,
});

const axis = {
  stroke: "var(--muted-foreground)",
  fontSize: 11,
  tickLine: false,
} as const;

function ChartTooltip() {
  return (
    <Tooltip
      cursor={{ fill: "var(--surface-sunken)" }}
      contentStyle={{
        borderRadius: 6,
        border: "1px solid var(--border)",
        background: "var(--surface)",
        fontSize: 12,
        boxShadow: "none",
      }}
    />
  );
}

function ReportsPage() {
  return (
    <>
      <PageHeader
        title="Reports"
        subtitle="Case volume and handling times across the organization."
      />

      <div className="grid grid-cols-2 divide-border border-y border-border sm:grid-cols-4 sm:divide-x">
        {[
          { label: "Average time to initial review", value: "1.8 days" },
          { label: "Cases submitted (30 days)", value: "9" },
          { label: "Cases closed (30 days)", value: "6" },
          { label: "Median time to closure", value: "11 days" },
        ].map((s) => (
          <div key={s.label} className="px-5 py-5 first:pl-0">
            <div className="label-caps">{s.label}</div>
            <div className="mt-2 font-mono text-[1.25rem] font-medium tracking-tight">
              {s.value}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Panel>
          <PanelHeader title="Cases by category" description="Last 12 months." />
          <div className="px-4 py-5">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart
                data={casesByCategory}
                layout="vertical"
                margin={{ left: 8, right: 16 }}
              >
                <CartesianGrid horizontal={false} stroke="var(--border)" />
                <XAxis type="number" {...axis} axisLine={false} />
                <YAxis
                  type="category"
                  dataKey="category"
                  width={132}
                  {...axis}
                  axisLine={false}
                />
                <ChartTooltip />
                <Bar dataKey="count" fill="var(--chart-1)" radius={2} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel>
          <PanelHeader title="Cases by status" description="Current distribution." />
          <div className="px-4 py-5">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={casesByStatus} margin={{ left: 0, right: 8 }}>
                <CartesianGrid vertical={false} stroke="var(--border)" />
                <XAxis dataKey="status" {...axis} axisLine={false} />
                <YAxis {...axis} axisLine={false} width={28} />
                <ChartTooltip />
                <Bar dataKey="count" fill="var(--chart-2)" radius={2} barSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel className="lg:col-span-2">
          <PanelHeader
            title="Cases over time"
            description="Submitted and closed cases per month."
          />
          <div className="px-4 py-5">
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={casesOverTime} margin={{ left: 0, right: 12 }}>
                <CartesianGrid vertical={false} stroke="var(--border)" />
                <XAxis dataKey="month" {...axis} axisLine={false} />
                <YAxis {...axis} axisLine={false} width={28} />
                <ChartTooltip />
                <Line
                  type="monotone"
                  dataKey="submitted"
                  stroke="var(--chart-1)"
                  strokeWidth={1.75}
                  dot={{ r: 2.5 }}
                />
                <Line
                  type="monotone"
                  dataKey="closed"
                  stroke="var(--chart-5)"
                  strokeWidth={1.75}
                  dot={{ r: 2.5 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-3 flex items-center gap-5 px-2 text-[0.75rem] text-muted-foreground">
              <span className="flex items-center gap-2">
                <span
                  className="h-px w-4"
                  style={{ background: "var(--chart-1)" }}
                />
                Submitted
              </span>
              <span className="flex items-center gap-2">
                <span
                  className="h-px w-4"
                  style={{ background: "var(--chart-5)" }}
                />
                Closed
              </span>
            </div>
          </div>
        </Panel>
      </div>
    </>
  );
}
