/**
 * Leadership / founder profiles for the About page.
 *
 * Intentionally empty until the owner supplies approved biography content.
 * The About page renders a leadership section automatically once entries exist.
 */
export type TeamMember = {
  name: string;
  role: string;
  bio: string[];
  /** Optional portrait in /public. Use real photography only. */
  image?: { src: string; alt: string; width: number; height: number };
  email?: string;
};

export const team: TeamMember[] = [];
