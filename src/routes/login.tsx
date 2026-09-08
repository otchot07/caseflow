import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { btn, inputClass } from "@/components/kit";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Caseflow" },
      {
        name: "description",
        content: "Sign in to Caseflow to review and manage workplace cases.",
      },
      { property: "og:title", content: "Sign in — Caseflow" },
      {
        property: "og:description",
        content: "Sign in to Caseflow to review and manage workplace cases.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 py-16">
      <div className="w-full max-w-[22rem]">
        <Link to="/" className="focus-ring text-[0.9375rem] font-semibold tracking-[-0.01em]">
          Caseflow
        </Link>

        <h1 className="mt-10 text-[1.25rem] font-semibold tracking-[-0.015em]">Sign in</h1>

        <form
          className="mt-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ to: "/hr" });
          }}
        >
          <div>
            <label htmlFor="email" className="mb-1.5 block text-[0.8125rem] font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              defaultValue="k.sandberg@example-company.eu"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-[0.8125rem] font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              defaultValue="demo-password"
              className={inputClass}
            />
          </div>

          <button type="submit" className={`${btn.primary} w-full`}>
            Sign in
          </button>
        </form>

        <div className="mt-5">
          <button type="button" className={btn.link}>
            Forgot password?
          </button>
        </div>
      </div>
    </div>
  );
}
