import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import type { CaseStatus } from "@/lib/demo-data";

export function Panel({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      className={cn("rounded-md border border-border bg-surface", className)}
    >
      {children}
    </section>
  );
}

export function PanelHeader({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-start justify-between gap-6 border-b border-border px-6 py-4",
        className,
      )}
    >
      <div>
        <h2 className="text-[0.9375rem] font-semibold text-foreground">{title}</h2>
        {description ? (
          <p className="mt-0.5 text-[0.8125rem] text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 pb-8">
      <div>
        <h1 className="text-[1.375rem] font-semibold tracking-[-0.015em] text-foreground">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

export function StatusTag({ status }: { status: CaseStatus | string }) {
  const tone =
    status === "Awaiting review"
      ? "border-warning/25 bg-warning-soft text-warning"
      : status === "In review"
        ? "border-primary/20 bg-accent-soft text-accent-foreground"
        : "border-border bg-surface-sunken text-muted-foreground";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 text-[0.75rem] font-medium",
        tone,
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          status === "Awaiting review"
            ? "bg-warning"
            : status === "In review"
              ? "bg-primary"
              : "bg-muted-foreground/60",
        )}
      />
      {status}
    </span>
  );
}

export function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="label-caps">{label}</div>
      <div className="mt-1.5 text-sm text-foreground">{children}</div>
    </div>
  );
}

const buttonBase =
  "focus-ring inline-flex items-center justify-center gap-2 rounded-md border text-[0.8125rem] font-medium transition-colors disabled:opacity-50";

export const btn = {
  primary: cn(
    buttonBase,
    "border-primary bg-primary px-3.5 py-2 text-primary-foreground hover:bg-primary/92",
  ),
  secondary: cn(
    buttonBase,
    "border-border bg-surface px-3.5 py-2 text-foreground hover:bg-surface-sunken",
  ),
  ghost: cn(
    buttonBase,
    "border-transparent px-2.5 py-1.5 text-muted-foreground hover:bg-surface-sunken hover:text-foreground",
  ),
  link: "focus-ring text-[0.8125rem] font-medium text-primary underline-offset-4 hover:underline",
};

export const inputClass =
  "focus-ring w-full rounded-md border border-input bg-surface px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/70";

export function Mono({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-[0.8125rem] tracking-tight">{children}</span>
  );
}
