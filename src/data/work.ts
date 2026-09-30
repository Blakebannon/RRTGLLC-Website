/**
 * Portfolio projects shown on /work (and a selection on the homepage).
 *
 * Every statement here is presented publicly as fact. Label each project for
 * what it is (RRTG product, RRTG project, business application, R&D) and do
 * not add metrics, customers, testimonials or dates that are not approved.
 *
 * Client case studies with measured outcomes use the separate model in
 * ./case-studies.ts.
 */

import type { ServiceSlug } from "./services";

/** Built-in schematic illustration used when no approved project imagery exists. */
export type ProjectFigure = "telemetry" | "orbits" | "retrieval" | "reconciliation";

export type WorkProject = {
  slug: string;
  name: string;
  /** Short labels, most important first. The first should say what kind of work it is. */
  classification: string[];
  status?: string;
  /** One sentence. Used on the homepage and at the top of the project entry. */
  shortDescription: string;
  /** One or two short paragraphs for the Work page. */
  longDescription?: string[];
  /** The single idea a visitor should take away. */
  takeaway?: string;
  /** Kept short; shown on demand on the Work page. */
  capabilities: string[];
  /** Services this project demonstrates, linked from its entry on /work. */
  services: ServiceSlug[];
  /** Featured projects get full editorial treatment; the rest appear under Additional R&D. */
  featured: boolean;
  /** Shown in the homepage Selected Work section. */
  homepage?: boolean;
  /** Approved screenshot or photo in /public. Takes precedence over `figure`. */
  image?: { src: string; alt: string; width: number; height: number };
  figure?: ProjectFigure;
  /** Set false to keep an entry in the data without publishing it. */
  public: boolean;
};

export const projects: WorkProject[] = [
  {
    slug: "apex-sim-coach",
    name: "Apex Sim Coach",
    classification: ["RRTG Product", "Commercial Software", "Applied AI"],
    status: "Commercial product",
    shortDescription:
      "A real-time AI-assisted coaching application for racing simulators, built as a commercial Windows desktop product.",
    longDescription: [
      "Apex Sim Coach reads live telemetry from supported racing simulators, evaluates the driver's inputs as each lap unfolds and delivers spoken coaching during the session. Afterward, an AI-assisted debrief reviews the session. Speech and debrief analysis run locally on the driver's machine.",
    ],
    takeaway:
      "RRTG designed, engineered and operates the complete product, from telemetry ingestion through installers, licensing and customer delivery.",
    capabilities: [
      "Real-time telemetry ingestion",
      "Multiple simulator integrations",
      "Live coaching logic",
      "Local text-to-speech",
      "Local AI-assisted session debriefs",
      "Windows desktop application",
      "Installers and upgrades",
      "Licensing and entitlements",
      "Steam integration",
      "Cloud-backed production infrastructure",
      "Monitoring and backups",
    ],
    services: ["artificial-intelligence", "software-development"],
    featured: true,
    homepage: true,
    figure: "telemetry",
    public: true,
  },
  {
    slug: "known-universe",
    name: "Known Universe",
    classification: ["RRTG Project", "Simulation", "Game Systems Engineering"],
    status: "In active development",
    shortDescription:
      "A large-scale space simulation combining physics, procedural worlds, ship systems, economic systems and long-term multiplayer architecture.",
    longDescription: [
      "Known Universe is built in Godot and C# on a fixed-step simulation with orbital mechanics and continuous-force flight. Ships, mining and the economy are data-driven systems designed to evolve together, supported by automated tests. It is an active RRTG development project and our proving ground for large-system architecture.",
    ],
    capabilities: [
      "Godot and C#",
      "Orbital mechanics",
      "Fixed-step simulation",
      "Continuous-force flight",
      "Ship systems",
      "Procedural rendering",
      "Planetary and stellar presentation",
      "Mining systems",
      "Economy architecture",
      "Data-driven content",
      "Automated testing",
    ],
    services: ["software-development"],
    featured: true,
    homepage: true,
    figure: "orbits",
    public: true,
  },
  {
    slug: "autoresearcher",
    name: "AutoResearcher",
    classification: ["RRTG Project", "Agentic AI", "Knowledge Systems"],
    shortDescription:
      "An AI research system that ingests source material, retrieves what is relevant and coordinates structured research, synthesis and review.",
    longDescription: [
      "AutoResearcher is built around a process rather than a chat window. Source documents are ingested and indexed for semantic retrieval. Specialized agents then draft, critique and revise their findings against that material, and the system returns structured output that can be checked against its sources.",
    ],
    takeaway:
      "The same approach applies to any business with a large body of knowledge and a repeatable way of working with it.",
    capabilities: [
      "Document ingestion and chunking",
      "Embeddings and semantic retrieval",
      "Retrieval-augmented generation",
      "Agent orchestration",
      "Synthesis, critique and revision",
      "Structured output",
    ],
    services: ["artificial-intelligence", "automation"],
    featured: true,
    homepage: true,
    figure: "retrieval",
    public: true,
  },
  {
    slug: "medicaidmatcher-pro",
    name: "MedicaidMatcher Pro",
    classification: ["Business Application", "Workflow Automation", "Data Processing"],
    shortDescription:
      "A purpose-built desktop application that reconciles healthcare remittance data against billing records.",
    longDescription: [
      "Reconciling payer remittances by hand means comparing electronic remittance files against billing exports line by line. MedicaidMatcher Pro ingests 835/ERA files alongside CSV and spreadsheet exports, matches payments to claims, identifies denials and underpayments, and generates follow-up work and structured exports. All processing happens locally on the desktop.",
    ],
    takeaway:
      "A specific, labor-intensive administrative process, turned into a structured workflow by purpose-built software.",
    capabilities: [
      "835/ERA ingestion",
      "CSV and spreadsheet ingestion",
      "Payment reconciliation",
      "Denial identification",
      "Underpayment identification",
      "Follow-up work generation",
      "Structured exports",
      "Local desktop processing",
    ],
    services: ["software-development", "automation"],
    featured: true,
    figure: "reconciliation",
    public: true,
  },
  {
    slug: "unreal-blueprint-assistant",
    name: "Unreal Blueprint Assistant",
    classification: ["AI Tooling", "Developer Automation"],
    status: "Experimental",
    shortDescription:
      "An experimental system that translates natural-language intent into structured, validated operations inside Unreal Engine: AI that operates domain-specific tools safely instead of only generating text.",
    capabilities: [
      "Natural-language interface",
      "Structured tool execution",
      "Deterministic operations",
      "Validation and guardrails",
      "Human review",
      "Unreal Engine integration",
    ],
    services: ["artificial-intelligence"],
    featured: false,
    public: true,
  },
  {
    // Known internally as VanaXR. The public name stays generic, and no
    // third-party game names, assets or trademarks are shown.
    slug: "legacy-game-vr-prototype",
    name: "Legacy Game VR Integration Prototype",
    classification: ["XR", "Systems Integration", "R&D"],
    status: "R&D prototype",
    shortDescription:
      "An experimental OpenXR integration exploring stereoscopic rendering, tracked input, motion controls and room-scale interaction for an existing game that was never designed for VR.",
    capabilities: [
      "OpenXR",
      "Stereoscopic rendering",
      "VR camera systems",
      "Tracked controller input",
      "Motion-controlled interaction",
      "Input remapping",
      "Legacy-system integration",
    ],
    services: ["software-development"],
    featured: false,
    public: true,
  },
];

const published = projects.filter((p) => p.public);

export const featuredProjects = published.filter((p) => p.featured);
export const additionalProjects = published.filter((p) => !p.featured);
export const homepageProjects = published.filter((p) => p.homepage);
