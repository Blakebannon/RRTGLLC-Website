"use client";

import Link from "next/link";
import { useRef } from "react";
import { primaryNav, serviceNav } from "@/data/navigation";
import { INQUIRY_HREF, mailto } from "@/data/site";
import { Logo } from "@/components/ui/Logo";
import { ArrowRight } from "@/components/ui/Icons";
import { EmailAddress } from "@/components/ui/EmailAddress";

/**
 * Full-screen mobile navigation built on the native <dialog> element.
 * showModal() provides focus containment, Escape-to-close and an inert
 * background without any extra libraries.
 */
export function MobileNav() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        className="-mr-2 inline-flex size-11 items-center justify-center text-bone"
      >
        <span className="sr-only">Open menu</span>
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none">
          <path d="M3 8h18M3 16h18" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Site menu"
        className="mobile-nav m-0 h-dvh max-h-none w-full max-w-none bg-ink-950 p-0 text-bone"
        onClick={(e) => {
          // Close after following any link inside the menu.
          if ((e.target as HTMLElement).closest("a")) close();
        }}
      >
        <div className="flex min-h-full flex-col px-5 pb-8 sm:px-8">
          <div className="flex h-[4.25rem] shrink-0 items-center justify-between border-b border-line">
            <Link href="/" className="-m-1 p-1" aria-label="Red Rocks Technology Group — home">
              <Logo />
            </Link>
            <button
              type="button"
              onClick={close}
              autoFocus
              className="-mr-2 inline-flex size-11 items-center justify-center text-bone"
            >
              <span className="sr-only">Close menu</span>
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none">
                <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>

          <nav aria-label="Mobile" className="flex-1 pt-6">
            <ul>
              {primaryNav.map((item) => (
                <li key={item.href} className="border-b border-line">
                  <Link
                    href={item.href}
                    className="group flex items-center justify-between py-4 text-[1.75rem] font-medium tracking-[-0.03em]"
                  >
                    {item.label}
                    <ArrowRight className="size-5 text-mist-dim group-hover:text-rock-400" />
                  </Link>
                  {item.href === "/services" && (
                    <ul className="-mt-1 grid grid-cols-2 gap-x-4 gap-y-1 pb-5">
                      {serviceNav.map((s) => (
                        <li key={s.href}>
                          <Link href={s.href} className="block py-1.5 text-[0.9375rem] text-mist hover:text-bone">
                            {s.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-10 space-y-5">
            <Link
              href={INQUIRY_HREF}
              className="group flex h-13 w-full items-center justify-center gap-2.5 bg-rock-500 font-medium text-ink-950 hover:bg-rock-400"
            >
              Start a Project
              <ArrowRight />
            </Link>
            <a href={mailto()} className="block text-center text-sm text-mist hover:text-bone">
              <EmailAddress />
            </a>
          </div>
        </div>
      </dialog>
    </div>
  );
}
