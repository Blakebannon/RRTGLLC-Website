"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { mailto, site } from "@/data/site";
import { inquiryBudgets, inquiryForm, inquiryServices, inquirySubject } from "@/data/inquiry";
import { EmailAddress } from "@/components/ui/EmailAddress";

type Status = "idle" | "submitting" | "success" | "error";

const limits = inquiryForm.maxLength;
const labelClass = "flex items-baseline justify-between gap-3 text-[0.9375rem] font-medium text-bone";
const fieldClass =
  "mt-2 block w-full rounded-none border border-line-strong bg-ink-900 px-4 py-3 text-base text-bone transition-colors placeholder:text-mist-dim hover:border-sand-300/40 focus:border-rock-400";
const inlineLink = "text-bone underline decoration-rock-500 underline-offset-4 hover:text-rock-300";

/**
 * Project inquiry form, submitted from the browser to Web3Forms.
 *
 * With JavaScript, it submits in place with fetch and only reports success
 * once Web3Forms confirms it; on failure the visitor's input is kept. Before
 * or without JavaScript, the same form posts to Web3Forms natively and
 * Web3Forms redirects back to /contact#inquiry-received.
 */
export function InquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const inFlight = useRef(false);
  const successRef = useRef<HTMLHeadingElement>(null);

  // The form is hidden on success, so move focus to the confirmation instead of leaving it on nothing.
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const data: Record<string, FormDataEntryValue> = Object.fromEntries(new FormData(form));
    delete data.redirect; // the redirect is only for native (no-JS) submissions
    data.subject = inquirySubject(data.service);

    inFlight.current = true;
    setStatus("submitting");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), inquiryForm.timeoutMs);

    try {
      const response = await fetch(inquiryForm.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
        signal: controller.signal,
      });
      const result: { success?: boolean; message?: string } | null = await response.json().catch(() => null);
      if (!response.ok || result?.success !== true) {
        throw new Error(`Web3Forms responded ${response.status}: ${result?.message ?? "no message"}`);
      }
      form.reset();
      setStatus("success");
    } catch (error) {
      if (process.env.NODE_ENV !== "production") console.error("Inquiry submission failed", error);
      setStatus("error");
    } finally {
      window.clearTimeout(timeout);
      inFlight.current = false;
    }
  }

  const submitting = status === "submitting";

  return (
    <div>
      <div role="status">
        {status === "success" && (
          <div className="border-l-2 border-rock-500 py-2 pl-6">
            <h3 ref={successRef} tabIndex={-1} className="text-title font-medium text-bone focus:outline-none">
              Inquiry received.
            </h3>
            <p className="mt-4 max-w-lg text-[1.0625rem] leading-relaxed text-mist">
              Thanks for reaching out. We&apos;ll review what you sent and follow up by email.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-8 inline-flex min-h-11 items-center border border-line-strong px-5 text-[0.9375rem] font-medium text-bone transition-colors hover:border-sand-300/60 hover:bg-bone/[0.04]"
            >
              Send another inquiry
            </button>
          </div>
        )}
      </div>

      {/* Shown only after a native (no-JS) submission, via Web3Forms' redirect back to this anchor. */}
      <p id="inquiry-received" className="mb-8 hidden border-l-2 border-rock-500 pl-5 text-[1.0625rem] text-bone target:block">
        Inquiry received. Thanks for reaching out. We&apos;ll review what you sent and follow up by email.
      </p>

      <form
        id="inquiry-form"
        action={inquiryForm.endpoint}
        method="POST"
        onSubmit={handleSubmit}
        aria-busy={submitting}
        hidden={status === "success"}
        className="space-y-7"
      >
        <input type="hidden" name="access_key" value={inquiryForm.accessKey} />
        <input type="hidden" name="from_name" value={inquiryForm.fromName} />
        <input type="hidden" name="subject" value={inquirySubject(null)} />
        <input type="hidden" name="redirect" value={`${site.url}/contact#inquiry-received`} />
        {/* Web3Forms honeypot: hidden from people and assistive technology; bots that tick it are rejected. */}
        <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" style={{ display: "none" }} />

        <p className="text-sm text-mist">All fields are required unless marked optional.</p>

        <div className="grid gap-7 sm:grid-cols-2 sm:gap-6">
          <Field id="inquiry-name" label="Name">
            <input id="inquiry-name" name="name" type="text" required autoComplete="name" maxLength={limits.name} className={fieldClass} />
          </Field>
          <Field id="inquiry-company" label="Company" optional>
            <input id="inquiry-company" name="company" type="text" autoComplete="organization" maxLength={limits.company} className={fieldClass} />
          </Field>
          <Field id="inquiry-email" label="Email">
            <input id="inquiry-email" name="email" type="email" required autoComplete="email" maxLength={limits.email} className={fieldClass} />
          </Field>
          <Field id="inquiry-phone" label="Phone" optional>
            <input id="inquiry-phone" name="phone" type="tel" autoComplete="tel" maxLength={limits.phone} className={fieldClass} />
          </Field>
          <Field id="inquiry-service" label="What can we help with?">
            <Select id="inquiry-service" name="service" required placeholder="Choose one" options={inquiryServices} />
          </Field>
          <Field id="inquiry-budget" label="Approximate project budget" optional>
            <Select id="inquiry-budget" name="budget" placeholder="Choose a range" options={inquiryBudgets} />
          </Field>
        </div>

        <Field id="inquiry-message" label="Tell us about the project">
          <p id="inquiry-message-help" className="mt-1.5 text-sm leading-relaxed text-mist">
            Tell us what you&apos;re trying to accomplish, what is slowing the business down, or what you want to build.
          </p>
          <textarea
            id="inquiry-message"
            name="message"
            required
            rows={7}
            maxLength={limits.message}
            aria-describedby="inquiry-message-help inquiry-sensitive"
            className={`${fieldClass} min-h-44 resize-y leading-relaxed`}
          />
          <p id="inquiry-sensitive" className="mt-2 text-sm leading-relaxed text-mist-dim">
            Please don&apos;t include passwords, payment card or Social Security numbers, medical information or other
            sensitive data. We&apos;ll ask for anything else we need later.
          </p>
        </Field>

        <div className="border-t border-line pt-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
            <button
              type="submit"
              aria-disabled={submitting}
              className={`inline-flex min-h-13 shrink-0 items-center justify-center gap-3 bg-rock-500 px-6 py-3 text-base font-medium tracking-[-0.01em] text-ink-950 transition-colors hover:bg-rock-400 active:bg-rock-600 ${submitting ? "cursor-wait" : ""}`}
            >
              {submitting && (
                <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4 motion-safe:animate-spin" fill="none">
                  <circle cx="8" cy="8" r="6" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2" />
                  <path d="M14 8a6 6 0 0 0-6-6" stroke="currentColor" strokeWidth="2" />
                </svg>
              )}
              {submitting ? "Sending…" : "Submit Inquiry"}
            </button>
            <p className="text-sm leading-relaxed text-mist">
              By submitting this form, you agree that {site.name} may use the information you provide to respond to
              your inquiry. See our{" "}
              <Link href="/privacy" className={inlineLink}>
                Privacy Policy
              </Link>
              .
            </p>
          </div>

          {status === "error" && (
            <div role="alert" className="mt-7 border-l-2 border-rock-500 pl-5">
              <p className="font-medium text-bone">We couldn&apos;t send your inquiry.</p>
              <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-mist">
                Please try again, or email us directly at{" "}
                <a href={mailto()} className={inlineLink}>
                  <EmailAddress />
                </a>
                .
              </p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

function Field({ id, label, optional = false, children }: { id: string; label: string; optional?: boolean; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
        {optional && <span className="label font-normal text-mist-dim">Optional</span>}
      </label>
      {children}
    </div>
  );
}

function Select({
  id,
  name,
  options,
  placeholder,
  required = false,
}: {
  id: string;
  name: string;
  options: readonly string[];
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div className="relative">
      <select id={id} name={name} required={required} defaultValue="" className={`${fieldClass} appearance-none pr-11`}>
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <svg
        aria-hidden="true"
        viewBox="0 0 10 10"
        className="pointer-events-none absolute top-1/2 right-4 mt-1 size-2.5 -translate-y-1/2 text-mist"
      >
        <path d="m2 3.5 3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    </div>
  );
}
