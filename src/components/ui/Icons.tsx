type IconProps = { className?: string };

/** Arrow used on navigational links; nudges right on parent hover via `group`. */
export function ArrowRight({ className = "" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      className={`size-4 shrink-0 transition-transform duration-300 ease-out-quart group-hover:translate-x-0.5 ${className}`}
    >
      <path d="M3 8h9.5M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

/** Arrow pointing up-right, used for actions that leave the page (e.g. opening a mail client). */
export function ArrowUpRight({ className = "" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      className={`size-4 shrink-0 transition-transform duration-300 ease-out-quart group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${className}`}
    >
      <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

export function MailIcon({ className = "" }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className={`size-5 shrink-0 ${className}`}>
      <rect x="2.75" y="4.75" width="14.5" height="10.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="m3 5.5 7 5.25 7-5.25" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
