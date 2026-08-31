"use client";

import { useState } from "react";
import Link from "next/link";
import { loginAction } from "@/actions/auth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/FormControls";
import { Card } from "@/components/ui/Card";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await loginAction(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-[var(--color-mc-green)] rounded-[var(--radius-xl)] flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
            K
          </div>
          <h1 className="font-display font-bold text-3xl text-[var(--color-text-primary)]">
            Staff Portal
          </h1>
          <p className="text-[var(--color-text-secondary)] mt-2">
            Sign in with your staff credentials
          </p>
        </div>

        <Card padding="lg" accent="green">
          <form action={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 bg-[var(--color-danger-light)] border border-[var(--color-mc-red)]/20 rounded-[var(--radius-md)] text-sm text-[var(--color-mc-red)]">
                {error}
              </div>
            )}

            <Input
              id="email"
              name="email"
              type="email"
              label="Email"
              placeholder="you@example.com"
              required
              autoComplete="email"
            />

            <Input
              id="password"
              name="password"
              type="password"
              label="Password"
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />

            <Button type="submit" className="w-full" loading={loading}>
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-[var(--color-text-secondary)]">
            Looking to apply?{" "}
            <Link href="/apply" className="font-medium text-[var(--color-mc-green)] hover:underline">
              Submit an Application
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
