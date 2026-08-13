import { forwardRef } from 'react';
import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hint, className = '', id, ...props },
  ref,
) {
  const inputId = id ?? props.name;
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-semibold text-slate">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={`rounded-xl border bg-white px-4 py-2.5 text-slate outline-none transition-colors placeholder:text-slate/40 focus:ring-2 ${
          error
            ? 'border-coral focus:border-coral focus:ring-coral/20'
            : 'border-slate/20 focus:border-orange focus:ring-orange/20'
        } ${className}`}
        {...props}
      />
      {hint && !error && <span className="text-xs text-slate/50">{hint}</span>}
      {error && <span className="text-xs font-medium text-coral">{error}</span>}
    </div>
  );
});

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { label, error, className = '', id, ...props },
  ref,
) {
  const inputId = id ?? props.name;
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-semibold text-slate">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={inputId}
        rows={props.rows ?? 3}
        className={`rounded-xl border bg-white px-4 py-2.5 text-slate outline-none transition-colors placeholder:text-slate/40 focus:ring-2 ${
          error
            ? 'border-coral focus:border-coral focus:ring-coral/20'
            : 'border-slate/20 focus:border-orange focus:ring-orange/20'
        } ${className}`}
        {...props}
      />
      {error && <span className="text-xs font-medium text-coral">{error}</span>}
    </div>
  );
});

export function FormError({ children }: { children: ReactNode }) {
  if (!children) return null;
  return (
    <div className="rounded-xl border border-coral/30 bg-coral/10 px-4 py-3 text-sm text-coral">
      {children}
    </div>
  );
}