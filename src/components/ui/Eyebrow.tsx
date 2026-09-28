import type { ReactNode } from "react";

/** Mono section label with a short accent rule, e.g. "— 02 / Services". */
export function Eyebrow({ children, index, className = "" }: { children: ReactNode; index?: string; className?: string }) {
  return (
    <p className={`label flex items-center gap-3 text-mist ${className}`}>
      <span aria-hidden="true" className="h-px w-6 bg-rock-400" />
      {index && <span className="text-rock-400">{index}</span>}
      <span>{children}</span>
    </p>
  );
}
