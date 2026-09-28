import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";

type SectionHeaderProps = {
  eyebrow: string;
  index?: string;
  title: ReactNode;
  children?: ReactNode;
  /** Heading level; defaults to h2. */
  as?: "h2" | "h3";
  className?: string;
  id?: string;
};

export function SectionHeader({ eyebrow, index, title, children, as: Heading = "h2", className = "", id }: SectionHeaderProps) {
  return (
    <div className={`max-w-3xl ${className}`}>
      <Eyebrow index={index}>{eyebrow}</Eyebrow>
      <Heading id={id} className="mt-6 text-headline font-medium text-bone">
        {title}
      </Heading>
      {children && <div className="mt-6 space-y-4 text-lede text-mist">{children}</div>}
    </div>
  );
}
