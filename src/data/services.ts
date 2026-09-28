export type ServiceSlug =
  | "software-development"
  | "artificial-intelligence"
  | "automation"
  | "web-development";

export type Capability = {
  title: string;
  description: string;
};

export type Service = {
  slug: ServiceSlug;
  href: `/services/${ServiceSlug}`;
  /** Full service name used in page titles and headings. */
  name: string;
  /** Short label used in navigation and compact lists. */
  shortName: string;
  /** One or two sentences used on the homepage and services overview. */
  summary: string;
  /** Short examples shown alongside the summary. */
  highlights: string[];
  /** Page-level content. */
  headline: string;
  intro: string;
  metaDescription: string;
  /** Opening framing section of the service page. */
  context: { heading: string; body: string[] };
  capabilitiesHeading: string;
  capabilities: Capability[];
  startingPrice: number;
  priceNote: string;
  inquirySubject: string;
};

export const services: Service[] = [
  {
    slug: "software-development",
    href: "/services/software-development",
    name: "Custom Software Development",
    shortName: "Custom Software",
    summary:
      "Purpose-built applications, internal systems and tools designed around the way your company actually operates.",
    highlights: ["Internal tools", "Customer portals", "APIs & integrations"],
    headline: "Software built around how your business actually works.",
    intro:
      "We design and build internal tools, customer portals, operational applications and integrations for businesses that have outgrown spreadsheets and generic subscriptions. You get software that fits the work, and direct access to the engineers who built it.",
    metaDescription:
      "Custom software development for small and mid-sized businesses: internal tools, customer portals, web applications, APIs, integrations and modernization. Projects start at $7,500.",
    context: {
      heading:
        "When off-the-shelf software forces your business to change how it operates, custom software may be the better answer.",
      body: [
        "Most growing companies eventually reach the limits of the tools they started with. The CRM does not quite model how you sell. The job tracker is a spreadsheet only one person fully understands. Critical steps live in email threads, and the same information is typed into three different systems.",
        "Custom software closes those gaps. We build applications around your actual process, connect them to the systems you already rely on, and keep the scope focused on the problem that matters most, so you are not paying for features nobody will use.",
      ],
    },
    capabilitiesHeading: "What we build",
    capabilities: [
      {
        title: "Internal tools",
        description:
          "Admin panels, job trackers, inventory and scheduling systems that replace fragile spreadsheets and shared inboxes.",
      },
      {
        title: "Customer portals",
        description:
          "Secure places for customers to submit requests, check status, retrieve documents and interact with your business on their schedule.",
      },
      {
        title: "Operational applications",
        description:
          "Software that models your specific process, such as estimating, dispatch, intake or compliance, instead of forcing a generic one.",
      },
      {
        title: "APIs and integrations",
        description:
          "Reliable interfaces between your systems so information is entered once and flows where it needs to go.",
      },
      {
        title: "Data systems",
        description:
          "Databases, reporting pipelines and dashboards that turn scattered records into information you can act on.",
      },
      {
        title: "Web applications",
        description:
          "Browser-based applications your team and customers can use from any device without installing anything.",
      },
      {
        title: "Modernization",
        description:
          "Carefully replacing aging systems, legacy databases and brittle scripts without disrupting the business that depends on them.",
      },
      {
        title: "Purpose-built software",
        description:
          "When the tool you need simply does not exist, we design it, build it and put it into production.",
      },
    ],
    startingPrice: 7500,
    priceNote:
      "Custom software projects start at $7,500. Larger systems are typically delivered in phases, so the first release solves the most important problem and later work is guided by real use.",
    inquirySubject: "Custom Software Inquiry - Red Rocks Technology Group",
  },
  {
    slug: "artificial-intelligence",
    href: "/services/artificial-intelligence",
    name: "Artificial Intelligence",
    shortName: "Artificial Intelligence",
    summary:
      "Private AI systems, internal assistants, knowledge tools and AI-enabled workflows integrated with the software you already use.",
    highlights: ["Knowledge assistants", "Document workflows", "Private AI"],
    headline: "Practical AI, applied where it genuinely helps.",
    intro:
      "AI is well suited to a specific set of problems: finding information, working with documents, drafting, summarizing and classifying. We build private assistants and AI-enabled workflows around your own data and systems, and we are direct about when a simpler approach is the better choice.",
    metaDescription:
      "Practical AI systems for small and mid-sized businesses: internal knowledge assistants, document search, summarization, classification, workflow agents and private AI. Projects start at $3,500.",
    context: {
      heading: "AI should earn its place in your business like any other tool.",
      body: [
        "Most businesses do not need an AI strategy so much as a clear answer to a practical question: is there work here that AI can do reliably, safely and at a reasonable cost? Often there is. Teams spend hours searching for information buried in documents, drafting similar proposals, answering routine questions and sorting incoming requests.",
        "We design AI systems around those specific tasks, grounded in your own information and connected to the tools your team already uses. The goal is not to add AI to everything. It is to remove work that does not need a person's full attention, while keeping people in control of the decisions that do.",
      ],
    },
    capabilitiesHeading: "Where AI is useful today",
    capabilities: [
      {
        title: "Internal knowledge assistants",
        description:
          "Assistants that answer questions from your policies, procedures and documentation, with references back to the source.",
      },
      {
        title: "Document search and retrieval",
        description:
          "Search that understands meaning, not just keywords, across contracts, manuals, records and shared drives.",
      },
      {
        title: "Customer support assistance",
        description:
          "Drafted replies, suggested answers and faster triage for your support team, reviewed before anything reaches a customer.",
      },
      {
        title: "Proposal and document generation",
        description:
          "First drafts of proposals, reports and routine documents assembled from your templates and past work.",
      },
      {
        title: "Summarization",
        description:
          "Concise summaries of long documents, meeting notes, email threads and case histories.",
      },
      {
        title: "Classification and routing",
        description:
          "Incoming email, forms and documents sorted, tagged and sent to the right person or system automatically.",
      },
      {
        title: "Workflow agents",
        description:
          "AI steps inside larger automated processes, with defined boundaries, logging and human approval where it matters.",
      },
      {
        title: "Business-specific copilots",
        description:
          "Assistants built around a particular role or process in your company rather than a general-purpose chatbot.",
      },
      {
        title: "Private and local AI",
        description:
          "Self-hosted or privately deployed models when sensitivity, compliance or cost make a public service the wrong fit.",
      },
      {
        title: "AI inside existing software",
        description:
          "AI capabilities added to the CRM, help desk, document system or internal application your team already uses.",
      },
    ],
    startingPrice: 3500,
    priceNote:
      "AI business systems start at $3,500. The final scope depends on the data involved, the systems it connects to and the level of review and control the workflow requires.",
    inquirySubject: "AI Systems Inquiry - Red Rocks Technology Group",
  },
  {
    slug: "automation",
    href: "/services/automation",
    name: "Workflow Automation",
    shortName: "Workflow Automation",
    summary:
      "Connect your software, eliminate repetitive work and automate the processes that currently consume your team's time.",
    highlights: ["Data synchronization", "CRM workflows", "Reporting"],
    headline: "Stop paying people to move information between systems.",
    intro:
      "In many businesses, capable people spend hours each week copying data between applications, sending the same follow-ups and assembling the same reports. We connect your tools and automate that repetitive work, so your team can focus on the work that requires judgment.",
    metaDescription:
      "Workflow automation for small and mid-sized businesses: data synchronization, CRM workflows, customer follow-up, document handling, scheduling, reporting and API integrations. Projects start at $1,500.",
    context: {
      heading: "Manual work between systems is one of the most expensive habits a business can have.",
      body: [
        "It rarely looks expensive, because it is spread across many small tasks: exporting a report every Monday, re-typing an order into accounting, forwarding a form to the right person, chasing a customer who has not replied. Each step takes a few minutes. Together they consume a significant share of your team's week and introduce errors that take even longer to find.",
        "Automation removes those steps. We map how information currently moves through your business, identify where it is handled manually, and build reliable connections that do the work consistently, every time.",
      ],
    },
    capabilitiesHeading: "What we automate",
    capabilities: [
      {
        title: "Administrative work",
        description: "Recurring tasks such as data entry, file naming, record updates and routine paperwork.",
      },
      {
        title: "Customer follow-up",
        description: "Timely reminders, confirmations and follow-up messages triggered by what customers actually do.",
      },
      {
        title: "Data synchronization",
        description: "Customers, orders, inventory and contacts kept consistent across every system that needs them.",
      },
      {
        title: "Notifications",
        description: "The right people alerted when something needs attention, instead of discovering it later.",
      },
      {
        title: "Document movement",
        description: "Files collected, renamed, filed and shared automatically as they move through a process.",
      },
      {
        title: "CRM workflows",
        description: "Leads captured, assigned and advanced through your pipeline without manual bookkeeping.",
      },
      {
        title: "Quoting",
        description: "Quotes and estimates assembled from your pricing rules and sent without retyping details.",
      },
      {
        title: "Scheduling",
        description: "Appointments, bookings and job assignments coordinated across calendars and systems.",
      },
      {
        title: "Reporting",
        description: "Recurring reports generated and delivered on schedule from the systems that hold the data.",
      },
      {
        title: "API integrations",
        description: "Direct connections between applications, including those without an off-the-shelf connector.",
      },
      {
        title: "Multi-application processes",
        description: "End-to-end workflows that span several tools, departments and approval steps.",
      },
    ],
    startingPrice: 1500,
    priceNote:
      "Workflow automation projects start at $1,500. Cost depends mainly on how many systems are involved, how well they expose their data and how much decision logic the process contains.",
    inquirySubject: "Workflow Automation Inquiry - Red Rocks Technology Group",
  },
  {
    slug: "web-development",
    href: "/services/web-development",
    name: "Web Engineering",
    shortName: "Web Engineering",
    summary:
      "Fast, accessible, responsive business websites and web applications engineered around your organization and its goals.",
    highlights: ["Business websites", "Technical SEO", "CMS & integrations"],
    headline: "Websites engineered to perform, not just to look good.",
    intro:
      "Your website is often the first serious interaction a customer has with your business. We design and engineer fast, accessible, responsive websites and web applications that represent your company well, can be found in search, and are built on a foundation you will not need to replace in two years.",
    metaDescription:
      "Web engineering for small and mid-sized businesses: custom responsive design, performance, accessibility, technical SEO, CRM integrations, CMS and ongoing support. Websites start at $2,500.",
    context: {
      heading: "A website is a piece of software. It should be engineered like one.",
      body: [
        "A good-looking website that loads slowly, is difficult to update or quietly loses form submissions is not doing its job. The details that determine whether a site actually works for your business, including performance, accessibility, search visibility, integrations and reliable hosting, are engineering problems.",
        "That is why we call it web engineering. We start with how your customers find and evaluate you, design a site that makes your business easy to understand and contact, and build it with the same care we apply to any production software.",
      ],
    },
    capabilitiesHeading: "What's included in our web work",
    capabilities: [
      {
        title: "Custom responsive design",
        description: "Designed for your business and your customers, and carefully adapted to phones, tablets and desktops.",
      },
      {
        title: "Modern frontend engineering",
        description: "Current, well-supported web technology with clean, maintainable code.",
      },
      {
        title: "Performance",
        description: "Fast load times and responsive interactions, measured against Core Web Vitals.",
      },
      {
        title: "Accessibility",
        description: "Semantic structure, keyboard support and readable contrast so the site works for every visitor.",
      },
      {
        title: "Technical SEO",
        description: "Metadata, structured data, sitemaps and page structure that help search engines understand your business.",
      },
      {
        title: "Analytics",
        description: "Privacy-conscious measurement so you can see how visitors find and use the site.",
      },
      {
        title: "Forms and lead capture",
        description: "Inquiry and request forms that reliably reach your team and fit your follow-up process.",
      },
      {
        title: "CRM integrations",
        description: "New leads and requests delivered straight into the systems your team works from.",
      },
      {
        title: "Content management",
        description: "An editing experience for your team where regular updates justify it, and not where they don't.",
      },
      {
        title: "Deployment and hosting",
        description: "Secure, fast global hosting with HTTPS and a clean release process.",
      },
      {
        title: "Ongoing support",
        description: "Monitoring, updates and improvements after launch through an optional support plan.",
      },
    ],
    startingPrice: 2500,
    priceNote:
      "Business websites start at $2,500. The packages below describe typical scale; every proposal is scoped to your actual content, features and integrations.",
    inquirySubject: "Website Project Inquiry - Red Rocks Technology Group",
  },
];

export function getService(slug: ServiceSlug): Service {
  const service = services.find((s) => s.slug === slug);
  if (!service) throw new Error(`Unknown service: ${slug}`);
  return service;
}
