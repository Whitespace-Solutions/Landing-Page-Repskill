"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FormError, FormSuccess, TextAreaField, TextField } from "@/components/ui/form-field";
import { featureRequest as copy } from "@/content/guide";
import { submitForm } from "@/lib/submit-form";

type Field = "name" | "email" | "idea";
type Values = Record<Field, string>;

const EMPTY: Values = { name: "", email: "", idea: "" };

function validate(v: Values) {
  const errors: Partial<Record<Field, string>> = {};
  if (!v.name.trim()) errors.name = copy.errors.name;
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.email)) errors.email = copy.errors.email;
  if (!v.idea.trim()) errors.idea = copy.errors.idea;
  else if (v.idea.trim().length < 12) errors.idea = copy.errors.ideaShort;
  return errors;
}

export function FeatureRequestForm() {
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
    const ok = await submitForm("repskill.ai/guide/feature-request", { ...values, type: "feature-request" });
    setState(ok ? "done" : "error");
  }

  return (
    <div className="rounded-panel border border-line bg-white p-6 sm:p-8">
      <AnimatePresence mode="wait" initial={false}>
        {state === "done" ? (
          <FormSuccess
            key="done"
            title={copy.success.title}
            body={copy.success.body}
            className="min-h-[320px]"
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
                label={copy.fields.name}
                name="name"
                autoComplete="name"
                value={values.name}
                error={errors.name}
                onChange={(v) => set("name", v)}
              />
              <TextField
                label={copy.fields.email}
                name="email"
                type="email"
                autoComplete="email"
                value={values.email}
                error={errors.email}
                onChange={(v) => set("email", v)}
              />
            </div>
            <TextAreaField
              label={copy.fields.idea}
              name="idea"
              rows={5}
              placeholder={copy.fields.ideaPlaceholder}
              value={values.idea}
              error={errors.idea}
              onChange={(v) => set("idea", v)}
            />

            {state === "error" && <FormError>{copy.error}</FormError>}

            <button
              type="submit"
              disabled={state === "sending"}
              className="inline-flex items-center justify-center gap-2 self-start rounded-button bg-brand-orange px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-brand-orange-hover disabled:opacity-60 max-sm:self-stretch"
            >
              {state === "sending" ? "Sending…" : copy.submit}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
