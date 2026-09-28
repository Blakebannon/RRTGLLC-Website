import type { ServiceSlug } from "./services";

export type PriceItem = {
  name: string;
  /** Price in US dollars. */
  amount: number;
  /** "from" renders "Starting at", "flat" renders the amount alone. */
  basis: "from" | "flat";
  period?: "month";
  description: string;
  href?: string;
  service?: ServiceSlug;
  /** Optional list of typical inclusions. */
  includes?: string[];
};

/** Primary project anchors shown on the homepage and services overview. */
export const projectPricing: PriceItem[] = [
  {
    name: "Business Websites",
    amount: 2500,
    basis: "from",
    description: "Professional business websites built for performance, credibility and conversion.",
    href: "/services/web-development",
    service: "web-development",
  },
  {
    name: "Workflow Automation",
    amount: 1500,
    basis: "from",
    description: "Automate repetitive processes and connect the tools your company already uses.",
    href: "/services/automation",
    service: "automation",
  },
  {
    name: "AI Business Systems",
    amount: 3500,
    basis: "from",
    description:
      "Internal AI assistants, knowledge systems and AI-enabled workflows designed around your organization.",
    href: "/services/artificial-intelligence",
    service: "artificial-intelligence",
  },
  {
    name: "Custom Software",
    amount: 7500,
    basis: "from",
    description: "Purpose-built applications and internal tools for when off-the-shelf software does not fit.",
    href: "/services/software-development",
    service: "software-development",
  },
];

export const assessment: PriceItem = {
  name: "Technology Assessment",
  amount: 500,
  basis: "flat",
  description:
    "A focused review of your operations, systems and goals that ends with clear, prioritized recommendations. The fee may be credited toward a resulting implementation project.",
};

/** Ongoing relationships. Exact scope is established separately for each customer. */
export const ongoingPricing: PriceItem[] = [
  {
    name: "Managed Website Support",
    amount: 199,
    basis: "from",
    period: "month",
    description:
      "Hosting oversight, updates, monitoring, backups, security maintenance and basic technical support for your website. Larger development work is scoped separately.",
    includes: [
      "Hosting oversight",
      "Updates and dependency maintenance",
      "Uptime monitoring",
      "Backups",
      "Security maintenance",
      "Basic technical support",
    ],
  },
  {
    name: "Technology Partner",
    amount: 750,
    basis: "from",
    period: "month",
    description:
      "Ongoing engineering, automation, technology guidance and incremental development for organizations that need a dependable technology team without hiring one internally.",
    includes: [
      "Ongoing engineering capacity",
      "Automation and integration work",
      "Technology guidance and planning",
      "Incremental feature development",
      "Scope agreed for each organization",
    ],
  },
];

/** Web Engineering scale guide. These communicate scale, not contractual terms. */
export const webPackages: (PriceItem & { audience: string; includes: string[] })[] = [
  {
    name: "Foundation",
    amount: 2500,
    basis: "from",
    audience: "For a professional small-business presence.",
    description:
      "A focused, well-built site that clearly explains what you do and makes it easy to contact you. Typically around five pages.",
    includes: [
      "Custom responsive design",
      "Performance and accessibility built in",
      "Technical SEO foundation",
      "Contact and inquiry path",
      "Launch and deployment",
    ],
  },
  {
    name: "Growth",
    amount: 4500,
    basis: "from",
    audience: "For businesses that need more content, integrations or editing capability.",
    description:
      "A larger site with room for service detail, content your team can update, and connections to the tools behind it.",
    includes: [
      "Everything in Foundation",
      "Expanded page and content structure",
      "Content management where it's useful",
      "CRM, scheduling or email integrations",
      "Analytics configuration",
    ],
  },
  {
    name: "Advanced",
    amount: 7500,
    basis: "from",
    audience: "For sophisticated sites, custom functionality and web applications.",
    description:
      "Sites that do real work: customer accounts, custom tools, complex integrations or application functionality.",
    includes: [
      "Everything in Growth",
      "Custom features and application logic",
      "Complex integrations and data flows",
      "Authentication and user accounts where needed",
      "Architecture planned for continued growth",
    ],
  },
];

export const PRICING_STATEMENT =
  "Every project is different. We'll scope the solution around the business problem rather than selling unnecessary complexity.";

export function formatPrice(item: Pick<PriceItem, "amount" | "period">): string {
  const amount = `$${item.amount.toLocaleString("en-US")}`;
  return item.period ? `${amount}/${item.period === "month" ? "mo" : item.period}` : amount;
}
