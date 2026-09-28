"use client";

import { useState, useSyncExternalStore } from "react";

const subscribe = () => () => {};
const clipboardAvailable = () => typeof navigator !== "undefined" && !!navigator.clipboard?.writeText;

/**
 * Copies text to the clipboard. Progressive enhancement: renders nothing
 * during static rendering or where the Clipboard API is unavailable, so
 * visitors never see a button that cannot work. The text it copies is
 * always visible and selectable on the page regardless.
 */
export function CopyButton({ text, label = "Copy email address" }: { text: string; label?: string }) {
  const supported = useSyncExternalStore(subscribe, clipboardAvailable, () => false);
  const [copied, setCopied] = useState(false);

  if (!supported) return null;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // Permission denied or insecure context: the address remains selectable on the page.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-11 items-center gap-2 border border-line-strong px-4 text-sm font-medium text-bone transition-colors hover:border-sand-300/60 hover:bg-bone/[0.04]"
    >
      <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="size-4">
        {copied ? (
          <path d="m3 8.5 3 3 7-7" stroke="currentColor" strokeWidth="1.5" />
        ) : (
          <>
            <rect x="5.5" y="5.5" width="8" height="8" stroke="currentColor" strokeWidth="1.3" />
            <path d="M3.5 10.5h-1v-8h8v1" stroke="currentColor" strokeWidth="1.3" />
          </>
        )}
      </svg>
      <span aria-live="polite">{copied ? "Copied" : label}</span>
    </button>
  );
}
