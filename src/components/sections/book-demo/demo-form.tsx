"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { bookDemoPage } from "@/content/book-demo";
import { cn } from "@/lib/cn";

/**
 * Endpoint penerima formulir (mis. Formspree, Web3Forms, HubSpot, atau API sendiri).
 * Set di GitHub: Settings → Secrets and variables → Actions → Variables → FORM_ENDPOINT.
 * Data dikirim sebagai JSON via POST.
 */
const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

type Field = "name" | "email" | "company" | "role" | "teamSize" | "improve";
type Values = Record<Field, string>;

const EMPTY: Values = { name: "", email: "", company: "", role: "", teamSize: "", improve: "" };

function validate(v: Values) {
  const errors: Partial<Record<Field, string>> = {};
  if (!v.name.trim()) errors.name = "Please enter your name.";
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.email)) errors.email = "Please enter a valid work email.";
  if (!v.company.trim()) errors.company = "Please enter your company.";
  if (!v.role.trim()) errors.role = "Please enter your job title or role.";
  return errors;
}

export function DemoForm() {
  const { form } = bookDemoPage;
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  const set = (field: Field, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    if (!FORM_ENDPOINT) {
      console.error("Book Demo form: NEXT_PUBLIC_FORM_ENDPOINT is not set, so the request was not sent.");
      setState("error");
      return;
    }

    setState("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...values, source: "repskill.ai/book-demo" }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  return (
    <div className="rounded-panel border border-line bg-white p-6 shadow-float sm:p-10">
      <AnimatePresence mode="wait" initial={false}>
        {state === "done" ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex min-h-[420px] flex-col items-center justify-center gap-5 text-center"
            role="status"
          >
            <motion.span
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 320, damping: 18 }}
              className="flex size-16 items-center justify-center rounded-full bg-brand-teal text-white"
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
            <h2 className="text-h3">{form.success.title}</h2>
            <p className="text-brand-slate">{form.success.body}</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            exit={{ opacity: 0, y: -12 }}
            onSubmit={onSubmit}
            noValidate
            className="flex flex-col gap-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField
                label="Name"
                name="name"
                autoComplete="name"
                values={values}
                errors={errors}
                onChange={set}
              />
              <TextField
                label="Work Email"
                name="email"
                type="email"
                autoComplete="email"
                values={values}
                errors={errors}
                onChange={set}
              />
              <TextField
                label="Company"
                name="company"
                autoComplete="organization"
                values={values}
                errors={errors}
                onChange={set}
              />
              <TextField
                label="Job Title / Role"
                name="role"
                autoComplete="organization-title"
                values={values}
                errors={errors}
                onChange={set}
              />
            </div>

            <fieldset className="flex flex-col gap-2">
              <legend className="mb-2 text-sm font-semibold text-ink">Team Size</legend>
              <div className="flex flex-wrap gap-2">
                {form.teamSizes.map((size) => {
                  const active = values.teamSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      aria-pressed={active}
                      onClick={() => set("teamSize", active ? "" : size)}
                      className={cn(
                        "rounded-button border px-4 py-2.5 text-sm font-semibold transition-colors",
                        active
                          ? "border-brand-slate bg-brand-slate text-white"
                          : "border-line bg-white text-brand-slate hover:border-brand-slate",
                      )}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-ink">
                What are you looking to improve?{" "}
                <span className="font-normal text-brand-slate">(optional)</span>
              </span>
              <textarea
                name="improve"
                rows={4}
                value={values.improve}
                onChange={(e) => set("improve", e.target.value)}
                className="resize-y rounded-button border border-line px-4 py-3 text-base text-ink transition-colors outline-none focus:border-brand-teal focus:ring-2 focus:ring-brand-cyan-soft"
              />
            </label>

            {state === "error" && (
              <p
                role="alert"
                className="rounded-xl bg-brand-orange/10 px-4 py-3 text-sm font-medium text-brand-orange-deep"
              >
                {form.error}
              </p>
            )}

            <button
              type="submit"
              disabled={state === "sending"}
              className="mt-1 inline-flex items-center justify-center gap-2 rounded-button bg-brand-orange px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-brand-orange-hover disabled:opacity-60"
            >
              {state === "sending" ? "Sending…" : form.submit}
            </button>
            <p className="text-caption text-brand-slate">{form.consent}</p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function TextField({
  label,
  name,
  type = "text",
  autoComplete,
  values,
  errors,
  onChange,
}: {
  label: string;
  name: Exclude<Field, "teamSize" | "improve">;
  type?: string;
  autoComplete?: string;
  values: Values;
  errors: Partial<Record<Field, string>>;
  onChange: (field: Field, value: string) => void;
}) {
  const error = errors[name];
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-semibold text-ink">{label}</span>
      <input
        type={type}
        name={name}
        autoComplete={autoComplete}
        value={values[name]}
        onChange={(e) => onChange(name, e.target.value)}
        aria-invalid={!!error}
        className={cn(
          "h-12 rounded-button border px-4 text-base text-ink transition-colors outline-none focus:ring-2",
          error
            ? "border-brand-orange-deep focus:ring-brand-orange/20"
            : "border-line focus:border-brand-teal focus:ring-brand-cyan-soft",
        )}
      />
      {error && <span className="text-xs font-medium text-brand-orange-deep">{error}</span>}
    </label>
  );
}
