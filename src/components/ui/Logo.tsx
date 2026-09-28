/**
 * RRTG mark: three tilted strata, a reference to the upturned sandstone
 * fins of Red Rocks, Colorado. Drawn in SVG so it stays crisp at any size.
 */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" className={className}>
      <path d="M4 27 13.5 5H19L9.5 27Z" fill="var(--color-rock-500)" />
      <path d="M13 27 19.5 12H25L18.5 27Z" fill="var(--color-rock-400)" opacity="0.85" />
      <path d="M22 27 25 20h4.5l-3 7Z" fill="var(--color-sand-300)" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <LogoMark className="size-8 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="text-[1.0625rem] font-semibold tracking-[-0.02em] text-bone">Red Rocks</span>
        <span className="mt-1 font-mono text-[0.625rem] tracking-[0.16em] text-mist uppercase">Technology Group</span>
      </span>
    </span>
  );
}
