import type { ServiceSlug } from "./services";

/**
 * Client case studies.
 *
 * Publish only with client permission, and only with outcomes that can be verified.
 * The /work page renders these automatically once this array is non-empty.
 */
export type CaseStudy = {
  slug: string;
  title: string;
  /** Client name, or an anonymized description if the client prefers, e.g. "Regional HVAC contractor". */
  client: string;
  industry: string;
  problem: string;
  approach: string;
  technology: string[];
  outcome: string;
  services: ServiceSlug[];
  screenshots?: { src: string; alt: string; width: number; height: number }[];
  testimonial?: { quote: string; name: string; role: string };
};

export const caseStudies: CaseStudy[] = [];
