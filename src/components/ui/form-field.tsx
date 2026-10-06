"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";

const control =
  "rounded-button border text-base text-brand-grey transition-colors outline-none placeholder:text-brand-charcoal/60 focus:ring-2";
const controlState = (error?: string) =>
  error
    ? "border-brand-orange-deep focus:ring-brand-orange/20"
    : "border-line focus:border-brand-grey focus:ring-brand-amber/40";

type BaseProps = {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  /** Tampilkan "(optional)" di samping label */
  optional?: boolean;
  placeholder?: string;
};

function Label({ label, optional }: { label: string; optional?: boolean }) {
  return (
    <span className="text-sm font-semibold text-brand-grey">
      {label} {optional && <span className="font-normal text-brand-charcoal">(optional)</span>}
    </span>
  );
}

function ErrorText({ error }: { error?: string }) {
  return error ? <span className="text-xs font-medium text-brand-orange-deep">{error}</span> : null;
}

/** Input satu baris dengan label dan pesan error. */
export function TextField({
  label,
  name,
  value,
  onChange,
  error,
  optional,
  placeholder,
  type = "text",
  autoComplete,
}: BaseProps & { type?: string; autoComplete?: string }) {
  return (
    <label className="flex flex-col gap-2">
      <Label label={label} optional={optional} />
      <input
        type={type}
        name={name}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        className={cn(control, "h-12 px-4", controlState(error))}
      />
      <ErrorText error={error} />
    </label>
  );
}

/** Textarea dengan label dan pesan error. */
export function TextAreaField({
  label,
  name,
  value,
  onChange,
  error,
  optional,
  placeholder,
  rows = 4,
}: BaseProps & { rows?: number }) {
  return (
    <label className="flex flex-col gap-2">
      <Label label={label} optional={optional} />
      <textarea
        name={name}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        className={cn(control, "resize-y px-4 py-3", controlState(error))}
      />
      <ErrorText error={error} />
    </label>
  );
}

/** Pesan error kirim formulir (di atas tombol submit). */
export function FormError({ children }: { children: React.ReactNode }) {
  return (
    <p
      role="alert"
      className="rounded-xl bg-brand-orange/10 px-4 py-3 text-sm font-medium text-brand-orange-deep"
    >
      {children}
    </p>
  );
}

/** Tampilan sukses setelah formulir terkirim: centang amber + judul + teks. */
export function FormSuccess({ title, body, className }: { title: string; body: string; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex flex-col items-center justify-center gap-5 text-center", className)}
      role="status"
    >
      <motion.span
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 320, damping: 18 }}
        className="flex size-16 items-center justify-center rounded-full bg-brand-amber text-brand-grey"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M5 12l5 5L20 7" />
        </svg>
      </motion.span>
      <h2 className="text-h3">{title}</h2>
      <p className="text-brand-charcoal">{body}</p>
    </motion.div>
  );
}
