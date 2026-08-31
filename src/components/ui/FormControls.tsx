import { cn } from "@/lib/utils";
import { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, forwardRef } from "react";

/* ── Input ─────────────────────────────────────────────── */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-[var(--color-text-primary)]">
            {label}
            {props.required && <span className="text-[var(--color-mc-red)] ml-0.5">*</span>}
          </label>
        )}
        {hint && (
          <p className="text-xs text-[var(--color-text-muted)]">{hint}</p>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "w-full px-4 py-2.5 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-[var(--radius-md)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]",
            "transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-mc-green)] focus:border-transparent",
            error && "border-[var(--color-mc-red)] focus:ring-[var(--color-mc-red)]",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-xs text-[var(--color-mc-red)] mt-1">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

/* ── Textarea ──────────────────────────────────────────── */
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-[var(--color-text-primary)]">
            {label}
            {props.required && <span className="text-[var(--color-mc-red)] ml-0.5">*</span>}
          </label>
        )}
        {hint && (
          <p className="text-xs text-[var(--color-text-muted)]">{hint}</p>
        )}
        <textarea
          ref={ref}
          id={id}
          className={cn(
            "w-full px-4 py-2.5 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-[var(--radius-md)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] resize-y min-h-[100px]",
            "transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-mc-green)] focus:border-transparent",
            error && "border-[var(--color-mc-red)] focus:ring-[var(--color-mc-red)]",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-xs text-[var(--color-mc-red)] mt-1">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

/* ── Select ────────────────────────────────────────────── */
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options: { value: string; label: string }[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, hint, options, id, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-[var(--color-text-primary)]">
            {label}
            {props.required && <span className="text-[var(--color-mc-red)] ml-0.5">*</span>}
          </label>
        )}
        {hint && (
          <p className="text-xs text-[var(--color-text-muted)]">{hint}</p>
        )}
        <select
          ref={ref}
          id={id}
          className={cn(
            "w-full px-4 py-2.5 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-[var(--radius-md)] text-sm text-[var(--color-text-primary)]",
            "transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-mc-green)] focus:border-transparent",
            error && "border-[var(--color-mc-red)] focus:ring-[var(--color-mc-red)]",
            className
          )}
          {...props}
        >
          <option value="">Select an option...</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-xs text-[var(--color-mc-red)] mt-1">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Input, Textarea, Select };
export type { InputProps, TextareaProps, SelectProps };
