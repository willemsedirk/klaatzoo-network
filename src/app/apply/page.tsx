"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { applicationQuestions, type Question } from "@/config/questions";
import { submitApplication, checkApplicationExists } from "@/actions/applications";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/FormControls";
import { Card } from "@/components/ui/Card";
import { PageShell } from "@/components/layout/PageShell";

function QuestionField({ question, defaultValue }: { question: Question; defaultValue?: string }) {
  const [previews, setPreviews] = useState<string[]>([]);

  switch (question.type) {
    case "short_text":
      return (
        <Input
          id={question.id}
          name={question.id}
          label={question.label}
          hint={question.description}
          placeholder={question.placeholder}
          required={question.required}
          maxLength={question.maxLength}
          defaultValue={defaultValue}
          readOnly={question.id === "minecraft_username" && !!defaultValue}
          className={question.id === "minecraft_username" && !!defaultValue ? "opacity-70 cursor-not-allowed" : ""}
        />
      );

    case "long_text":
      return (
        <Textarea
          id={question.id}
          name={question.id}
          label={question.label}
          hint={question.description}
          placeholder={question.placeholder}
          required={question.required}
          maxLength={question.maxLength}
          rows={4}
        />
      );

    case "multiple_choice":
      return (
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-[var(--color-text-primary)]">
            {question.label}
            {question.required && <span className="text-[var(--color-mc-red)] ml-0.5">*</span>}
          </label>
          {question.description && (
            <p className="text-xs text-[var(--color-text-muted)]">{question.description}</p>
          )}
          <div className="space-y-2 mt-2">
            {question.options?.map((option) => (
              <label
                key={option}
                className="flex items-center gap-3 p-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] cursor-pointer transition-all duration-200 hover:border-[var(--color-mc-green)] has-[:checked]:border-[var(--color-mc-green)] has-[:checked]:bg-[var(--color-accent-light)]"
              >
                <input
                  type="radio"
                  name={question.id}
                  value={option}
                  required={question.required}
                  className="w-4 h-4 accent-[var(--color-mc-green)]"
                />
                <span className="text-sm text-[var(--color-text-primary)]">{option}</span>
              </label>
            ))}
          </div>
        </div>
      );

    case "image_upload":
      return (
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-[var(--color-text-primary)]">
            {question.label}
            {question.required && <span className="text-[var(--color-mc-red)] ml-0.5">*</span>}
          </label>
          {question.description && (
            <p className="text-xs text-[var(--color-text-muted)]">{question.description}</p>
          )}
          <div className="mt-2">
            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-[var(--color-border)] rounded-[var(--radius-lg)] cursor-pointer bg-[var(--color-bg-elevated)] hover:border-[var(--color-mc-green)] hover:bg-[var(--color-accent-light)]/30 transition-all duration-200">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-10 h-10 mb-3 text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  <span className="font-medium text-[var(--color-mc-green)]">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">
                  PNG, JPG, WebP up to {question.maxFileSizeMB || 5}MB (max {question.maxFiles || 3} files)
                </p>
              </div>
              <input
                type="file"
                name={question.id}
                accept="image/jpeg,image/png,image/webp"
                multiple
                className="hidden"
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  const urls = files.map((f) => URL.createObjectURL(f));
                  setPreviews(urls);
                }}
              />
            </label>
            {previews.length > 0 && (
              <div className="flex gap-3 mt-3 flex-wrap">
                {previews.map((url, i) => (
                  <div key={i} className="relative w-24 h-24 rounded-[var(--radius-md)] overflow-hidden border border-[var(--color-border)]">
                    <img src={url} alt={`Preview ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      );

    default:
      return null;
  }
}

export default function ApplyPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [step, setStep] = useState<"CHECK_USERNAME" | "FORM">("CHECK_USERNAME");
  const [checkedUsername, setCheckedUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.name) {
      setCheckedUsername(session.user.name);
      setStep("FORM");
    }
  }, [status, session]);


  async function handleCheckUsername(formData: FormData) {
    const username = formData.get("minecraft_username") as string;
    if (!username || username.trim().length === 0) {
      setError("Please enter your Minecraft username.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const signInResult = await signIn("applicant", { 
        username: username.trim(), 
        redirect: false 
      });

      if (signInResult?.error) {
        setError("Could not initialize your application session.");
        setLoading(false);
        return;
      }

      const result = await checkApplicationExists(username.trim());
      if (result.exists) {
        router.push("/dashboard");
      } else {
        setCheckedUsername(username.trim());
        setStep("FORM");
      }
    } catch (e) {
      setError("Something went wrong checking your username.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await submitApplication(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else if (result?.success) {
      setSuccess(true);
      setTimeout(() => router.push("/dashboard"), 2000);
    }
  }

  if (success) {
    return (
      <PageShell>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Card padding="lg" className="text-center max-w-md mx-auto">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="font-display font-bold text-2xl text-[var(--color-text-primary)] mb-2">
              Application Submitted!
            </h2>
            <p className="text-[var(--color-text-secondary)]">
              Thanks for applying! Our staff will review your application within 24-48 hours.
              Redirecting to your dashboard...
            </p>
          </Card>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <section className="pt-12 pb-8">
        <h1 className="font-display font-bold text-4xl sm:text-5xl text-[var(--color-text-primary)] mb-4">
          Apply to Join
        </h1>
        <p className="text-[var(--color-text-secondary)] max-w-2xl text-lg">
          {step === "CHECK_USERNAME"
            ? "First, let's see if you've already applied."
            : "Tell us about yourself and your Minecraft experience. We review every application personally."}
        </p>
      </section>

      <section className="pb-20 max-w-2xl" style={{ opacity: 1, visibility: 'visible' }}>
        <Card padding="lg" accent="green">
          {step === "CHECK_USERNAME" ? (
            <form action={handleCheckUsername} className="apply-form space-y-8" style={{ opacity: 1 }}>
              {error && (
                <div className="p-3 bg-[var(--color-danger-light)] border border-[var(--color-mc-red)]/20 rounded-[var(--radius-md)] text-sm text-[var(--color-mc-red)]">
                  {error}
                </div>
              )}
              
              <div>
                <QuestionField 
                  question={applicationQuestions.find(q => q.id === "minecraft_username")!} 
                />
              </div>

              <div className="pt-4 border-t border-[var(--color-border)]">
                <Button type="submit" size="lg" className="w-full" loading={loading}>
                  Continue
                </Button>
              </div>
            </form>
          ) : (
            <form action={handleSubmit} className="apply-form space-y-8" style={{ opacity: 1 }}>
              {error && (
                <div className="p-3 bg-[var(--color-danger-light)] border border-[var(--color-mc-red)]/20 rounded-[var(--radius-md)] text-sm text-[var(--color-mc-red)]">
                  {error}
                </div>
              )}

              {applicationQuestions.map((question, index) => (
                <div key={question.id} style={{ opacity: 1 }}>
                  <QuestionField 
                    question={question} 
                    defaultValue={question.id === "minecraft_username" ? checkedUsername : undefined}
                  />
                </div>
              ))}

              <div className="pt-4 border-t border-[var(--color-border)] flex gap-3">
                <Button type="button" variant="outline" size="lg" onClick={() => setStep("CHECK_USERNAME")} disabled={loading}>
                  Back
                </Button>
                <Button type="submit" size="lg" className="flex-1" loading={loading}>
                  Submit Application
                </Button>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] text-center mt-3">
                By submitting, you agree to follow our server rules and community guidelines.
              </p>
            </form>
          )}
        </Card>
      </section>
    </PageShell>
  );
}
