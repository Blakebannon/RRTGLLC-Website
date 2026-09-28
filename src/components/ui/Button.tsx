import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "./Icons";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  className?: string;
  /** Accessible label override when the visible text needs extra context. */
  "aria-label"?: string;
};

const base =
  "group inline-flex items-center justify-center gap-2.5 text-center font-medium tracking-[-0.01em] transition-colors duration-200 ease-out-quart select-none";

const variants = {
  primary: "bg-rock-500 text-ink-950 hover:bg-rock-400 active:bg-rock-600",
  secondary: "border border-line-strong text-bone hover:border-sand-300/60 hover:bg-bone/[0.04]",
  ghost: "text-bone hover:text-rock-300",
} as const;

const sizes = {
  md: "min-h-11 px-5 py-2 text-[0.9375rem]",
  lg: "min-h-13 px-6 py-3 text-base",
} as const;

/**
 * Link styled as a button. Internal routes use next/link; mailto and external
 * links render a plain anchor with an outbound arrow.
 */
export function Button({ href, children, variant = "primary", size = "md", className = "", ...rest }: ButtonProps) {
  const isInternal = href.startsWith("/") || href.startsWith("#");
  const classes = `${base} ${variants[variant]} ${variant === "ghost" ? "h-11 px-0" : sizes[size]} ${className}`;

  if (isInternal) {
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
        <ArrowRight />
      </Link>
    );
  }

  return (
    <a href={href} className={classes} {...rest}>
      {children}
      <ArrowUpRight />
    </a>
  );
}

/** Inline text link with an arrow, used for "Learn more"-style navigation. */
export function TextLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 text-[0.9375rem] font-medium text-bone transition-colors hover:text-rock-300 ${className}`}
    >
      {children}
      <ArrowRight className="text-rock-400" />
    </Link>
  );
}
