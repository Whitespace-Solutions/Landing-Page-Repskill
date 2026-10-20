"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EASE_OUT } from "@/components/motion/reveal";
import { ArrowRight } from "@/components/ui/button";
import { FormError, FormSuccess, SelectField, TextField } from "@/components/ui/form-field";
import { bookDemoPage, demoSchedule } from "@/content/book-demo";
import { type CalendarEvent, downloadIcs, googleCalendarUrl } from "@/lib/calendar";
import { cn } from "@/lib/cn";
import { submitForm } from "@/lib/submit-form";
import { DemoScheduler, formatSlot } from "./demo-scheduler";

const SOURCE = "repskill.ai/book-demo";

type Values = {
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  businessModel: string;
  reps: string;
  heardFrom: string;
};
type Field = keyof Values;
type Errors = Partial<Record<Field, string>>;

const EMPTY: Values = {
  email: "",
  firstName: "",
  lastName: "",
  company: "",
  businessModel: "",
  reps: "",
  heardFrom: "",
};

function validateContact(v: Values) {
  const errors: Errors = {};
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.email.trim())) errors.email = "Please enter a valid work email.";
  if (!v.firstName.trim()) errors.firstName = "Please enter your first name.";
  if (!v.lastName.trim()) errors.lastName = "Please enter your last name.";
  if (!v.company.trim()) errors.company = "Please enter your company.";
  return errors;
}

function validateTeam(v: Values) {
  const errors: Errors = {};
  if (!v.businessModel) errors.businessModel = "Please choose your business model.";
  if (!v.reps) errors.reps = "Please choose the size of your team.";
  return errors;
}

/** Data lead sebagai teks datar untuk email. */
function leadPayload(v: Values) {
  return {
    name: `${v.firstName.trim()} ${v.lastName.trim()}`,
    email: v.email.trim(),
    company: v.company.trim(),
    businessModel: v.businessModel,
    customerFacingReps: v.reps,
    heardFrom: v.heardFrom.trim(),
  };
}

/**
 * Book Demo tiga langkah: (1) email & nama → (2) pertanyaan tim → kirim lead → (3) pilih jadwal → kirim booking.
 * Lead sudah terkirim di akhir langkah 2, jadi tidak hilang walau pengunjung tidak memilih jadwal.
 */
export function DemoForm() {
  const { form, meeting } = bookDemoPage;
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "error">("idle");
  const [done, setDone] = useState<{ title: string; body: string; event?: CalendarEvent } | null>(null);
  const [added, setAdded] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const moved = useRef(false);

  // Setelah pindah langkah, fokus ke judul langkah (pembaca layar & keyboard) dan pastikan panel terlihat di HP
  useEffect(() => {
    if (!moved.current) return;
    panel.current?.querySelector<HTMLElement>("[data-step-title]")?.focus({ preventScroll: true });
    const top = panel.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) panel.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step, done]);

  const set = <K extends Field>(field: K, value: Values[K]) => {
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const go = (next: number) => {
    moved.current = true;
    setState("idle");
    setStep(next);
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step === 0) {
      const found = validateContact(values);
      setErrors(found);
      if (!Object.keys(found).length) go(1);
      return;
    }

    const found = validateTeam(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    setState("sending");
    const lead = leadPayload(values);
    const ok = await submitForm(
      SOURCE,
      { stage: "Demo request (time not picked yet)", ...lead },
      { subject: `New demo request: ${lead.name}, ${lead.company}`, replyTo: lead.email },
    );
    if (ok) go(2);
    else setState("error");
  }

  async function onBook(slot: Date, timeZone: string) {
    const lead = leadPayload(values);
    const visitorTime = formatSlot(slot, timeZone);
    const hostTime = formatSlot(slot, demoSchedule.hostTimeZone);
    // Untuk tim: klik link di email → Save di Google Calendar → undangan otomatis terkirim ke pengunjung
    const teamEvent: CalendarEvent = {
      title: `Repskill Demo · ${lead.company}`,
      start: slot,
      durationMinutes: demoSchedule.durationMinutes,
      details: [
        `Demo with ${lead.name} (${lead.email}), ${lead.company}.`,
        `Business model: ${lead.businessModel}`,
        `Sales reps: ${lead.customerFacingReps}`,
        lead.heardFrom && `Heard from: ${lead.heardFrom}`,
      ]
        .filter(Boolean)
        .join("\n"),
      guests: [lead.email],
    };
    const ok = await submitForm(
      SOURCE,
      {
        stage: "Demo booked",
        meetingTime: hostTime,
        visitorTime,
        meetingStartUtc: slot.toISOString(),
        addToGoogleCalendar: googleCalendarUrl(teamEvent),
        ...lead,
      },
      { subject: `Demo booked: ${lead.name}, ${lead.company} · ${hostTime}`, replyTo: lead.email },
    );
    if (ok) {
      moved.current = true;
      setDone({
        title: form.booked.title,
        body: form.booked.body(visitorTime, lead.email),
        event: {
          title: meeting.title,
          start: slot,
          durationMinutes: demoSchedule.durationMinutes,
          details: meeting.calendarDetails,
        },
      });
    }
    return ok;
  }

  function onSkip() {
    moved.current = true;
    setDone(form.requested);
  }

  return (
    <div
      ref={panel}
      className="scroll-mt-28 rounded-panel border border-line bg-white p-6 shadow-float sm:p-10"
    >
      {done ? (
        <FormSuccess title={done.title} body={done.body} className="min-h-[420px]">
          {done.event && (
            <div className="mt-2 flex flex-col items-center gap-4">
              {/* Setelah diklik: state "selesai" (amber + centang); tetap bisa diklik lagi */}
              <a
                href={googleCalendarUrl(done.event)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setAdded(true)}
                className={cn(
                  "inline-flex items-center justify-center gap-2 rounded-button px-5 py-3 text-base font-semibold transition-colors",
                  added
                    ? "bg-brand-amber text-brand-grey"
                    : "bg-brand-orange text-white hover:bg-brand-orange-hover",
                )}
              >
                {added && (
                  <svg
                    width="18"
                    height="18"
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
                )}
                {added ? meeting.addedToGoogle : meeting.addToGoogle}
              </a>
              <p className="text-sm text-brand-charcoal">
                {meeting.icsHint}{" "}
                <button
                  type="button"
                  onClick={() => downloadIcs(done.event!)}
                  className="font-semibold text-brand-grey underline underline-offset-4 hover:text-brand-orange"
                >
                  {meeting.downloadIcs}
                </button>
              </p>
            </div>
          )}
        </FormSuccess>
      ) : (
        <div className="flex flex-col gap-8">
          <StepIndicator steps={form.steps} current={step} />
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
            >
              {step === 2 ? (
                <div className="flex flex-col gap-6">
                  <StepTitle>{form.steps[2]}</StepTitle>
                  <DemoScheduler onConfirm={onBook} onSkip={onSkip} />
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
                  {step === 0 ? (
                    <>
                      <StepTitle>{form.contact.title}</StepTitle>
                      <TextField
                        label="Work Email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={values.email}
                        error={errors.email}
                        onChange={(v) => set("email", v)}
                      />
                      <div className="grid gap-5 sm:grid-cols-2">
                        <TextField
                          label="First Name"
                          name="firstName"
                          autoComplete="given-name"
                          value={values.firstName}
                          error={errors.firstName}
                          onChange={(v) => set("firstName", v)}
                        />
                        <TextField
                          label="Last Name"
                          name="lastName"
                          autoComplete="family-name"
                          value={values.lastName}
                          error={errors.lastName}
                          onChange={(v) => set("lastName", v)}
                        />
                      </div>
                      <TextField
                        label="Company"
                        name="company"
                        autoComplete="organization"
                        value={values.company}
                        error={errors.company}
                        onChange={(v) => set("company", v)}
                      />
                      <button
                        type="submit"
                        className="mt-2 inline-flex items-center justify-center gap-2 self-start rounded-button bg-brand-orange px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-brand-orange-hover"
                      >
                        {form.contact.next}
                        <ArrowRight />
                      </button>
                    </>
                  ) : (
                    <>
                      <StepTitle>{form.team.title}</StepTitle>
                      <SelectField
                        label={form.team.businessModel.label}
                        name="businessModel"
                        options={form.team.businessModel.options}
                        value={values.businessModel}
                        error={errors.businessModel}
                        onChange={(v) => set("businessModel", v)}
                      />
                      <SelectField
                        label={form.team.reps.label}
                        name="reps"
                        options={form.team.reps.options}
                        value={values.reps}
                        error={errors.reps}
                        onChange={(v) => set("reps", v)}
                      />
                      <TextField
                        label={form.team.source.label}
                        name="heardFrom"
                        optional
                        value={values.heardFrom}
                        onChange={(v) => set("heardFrom", v)}
                      />

                      {state === "error" && <FormError>{form.error}</FormError>}

                      <div className="mt-2 flex items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => go(0)}
                          className="rounded-button border-[1.5px] border-line px-6 py-4 text-base font-semibold text-brand-grey transition-colors hover:border-brand-grey"
                        >
                          {form.team.back}
                        </button>
                        <button
                          type="submit"
                          disabled={state === "sending"}
                          className="inline-flex items-center justify-center gap-2 rounded-button bg-brand-orange px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-brand-orange-hover disabled:opacity-60"
                        >
                          {state === "sending" ? form.sending : form.team.submit}
                          {state !== "sending" && <ArrowRight />}
                        </button>
                      </div>
                      <p className="text-caption text-brand-charcoal">{form.consent}</p>
                    </>
                  )}
                </form>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

function StepTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 data-step-title tabIndex={-1} className="text-h3 outline-none">
      {children}
    </h2>
  );
}

/** "Step 1 of 3" + tiga segmen: selesai = amber, sekarang = oranye, belum = line. */
function StepIndicator({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-caption font-semibold text-brand-charcoal">
        Step {current + 1} of {steps.length} · <span className="text-brand-grey">{steps[current]}</span>
      </p>
      <ol className="grid gap-2" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
        {steps.map((label, i) => (
          <li
            key={label}
            aria-current={i === current ? "step" : undefined}
            className={cn(
              "h-1.5 rounded-full transition-colors duration-300",
              i < current ? "bg-brand-amber" : i === current ? "bg-brand-orange" : "bg-line",
            )}
          >
            <span className="sr-only">{label}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
