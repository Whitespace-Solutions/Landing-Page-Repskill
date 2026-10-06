"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FormError, FormSuccess, TextAreaField, TextField } from "@/components/ui/form-field";
import { bookDemoPage } from "@/content/book-demo";
import { cn } from "@/lib/cn";
import { submitForm } from "@/lib/submit-form";

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

    setState("sending");
    const ok = await submitForm("repskill.ai/book-demo", values);
    setState(ok ? "done" : "error");
  }

  return (
    <div className="rounded-panel border border-line bg-white p-6 shadow-float sm:p-10">
      <AnimatePresence mode="wait" initial={false}>
        {state === "done" ? (
          <FormSuccess
            key="done"
            title={form.success.title}
            body={form.success.body}
            className="min-h-[420px]"
          />
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
                value={values.name}
                error={errors.name}
                onChange={(v) => set("name", v)}
              />
              <TextField
                label="Work Email"
                name="email"
                type="email"
                autoComplete="email"
                value={values.email}
                error={errors.email}
                onChange={(v) => set("email", v)}
              />
              <TextField
                label="Company"
                name="company"
                autoComplete="organization"
                value={values.company}
                error={errors.company}
                onChange={(v) => set("company", v)}
              />
              <TextField
                label="Job Title / Role"
                name="role"
                autoComplete="organization-title"
                value={values.role}
                error={errors.role}
                onChange={(v) => set("role", v)}
              />
            </div>

            <fieldset className="flex flex-col gap-2">
              <legend className="mb-2 text-sm font-semibold text-brand-grey">Team Size</legend>
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
                          ? "border-brand-grey bg-brand-grey text-white"
                          : "border-line bg-white text-brand-charcoal hover:border-brand-grey",
                      )}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <TextAreaField
              label="What are you looking to improve?"
              name="improve"
              optional
              value={values.improve}
              onChange={(v) => set("improve", v)}
            />

            {state === "error" && <FormError>{form.error}</FormError>}

            <button
              type="submit"
              disabled={state === "sending"}
              className="mt-1 inline-flex items-center justify-center gap-2 rounded-button bg-brand-orange px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-brand-orange-hover disabled:opacity-60"
            >
              {state === "sending" ? "Sending…" : form.submit}
            </button>
            <p className="text-caption text-brand-charcoal">{form.consent}</p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
