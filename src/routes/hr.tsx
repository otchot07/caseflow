import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import {
  LayoutList,
  Folder,
  Users,
  BarChart3,
  Settings as SettingsIcon,
} from "lucide-react";

export const Route = createFileRoute("/hr")({
  component: HrShell,
});

const nav = [
  { to: "/hr", label: "Overview", icon: LayoutList, exact: true },
  { to: "/hr/cases", label: "Cases", icon: Folder },
  { to: "/hr/people", label: "People", icon: Users },
  { to: "/hr/reports", label: "Reports", icon: BarChart3 },
] as const;

const navLinkClass =
  "focus-ring flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[0.8125rem] text-muted-foreground transition-colors hover:bg-surface-sunken hover:text-foreground";
const navActiveClass = "bg-accent-soft text-accent-foreground font-medium";

function HrShell() {
  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 flex w-[15.5rem] flex-col border-r border-border bg-sidebar">
        <div className="flex h-14 items-center px-5">
          <Link to="/hr" className="focus-ring text-[0.9375rem] font-semibold tracking-[-0.01em]">
            Caseflow
          </Link>
        </div>

        <nav className="flex-1 px-3 py-3">
          <ul className="space-y-0.5">
            {nav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  activeOptions={{ exact: "exact" in item ? item.exact : false }}
                  className={navLinkClass}
                  activeProps={{ className: navActiveClass }}
                >
                  <item.icon className="size-4" strokeWidth={1.75} />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="my-3 h-px bg-border" />

          <ul>
            <li>
              <Link
                to="/hr/settings"
                className={navLinkClass}
                activeProps={{ className: navActiveClass }}
              >
                <SettingsIcon className="size-4" strokeWidth={1.75} />
                Settings
              </Link>
            </li>
          </ul>
        </nav>

        <div className="border-t border-border px-5 py-4">
          <div className="text-[0.8125rem] font-medium text-foreground">
            HR Administrator
          </div>
          <div className="text-[0.75rem] text-muted-foreground">Organization</div>
        </div>
      </aside>

      <div className="pl-[15.5rem]">
        <main className="mx-auto w-full max-w-6xl px-10 py-12">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
