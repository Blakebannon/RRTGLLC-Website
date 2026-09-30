export type ServiceSlug =
  | "software-development"
  | "artificial-intelligence"
  | "automation"
  | "web-development";

export type Capability = {
  title: string;
  description: string;
};

export type FAQ = { question: string; answer: string };

/** A portfolio project on /work that demonstrates this service, and why it is relevant. */
export type RelatedWork = { slug: string; note: string };

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
  /** Search-focused page title; the site name is appended by the title template. */
  seoTitle: string;
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
  /** Questions prospective customers actually ask. Answers must match approved pricing and policy. */
  faqs: FAQ[];
  relatedWork: RelatedWork[];
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
    seoTitle: "Custom Software Development for Small Businesses",
    headline: "Software built around how your business actually works.",
    intro:
      "We design and build internal tools, customer portals, operational applications and integrations for businesses that have outgrown spreadsheets and generic subscriptions. You get software that fits the work, and direct access to the engineers who built it.",
    metaDescription:
      "Custom software development for small and mid-sized businesses: internal tools, portals, web apps and integrations built around how you work. From $7,500.",
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
    faqs: [
      {
        question: "When does custom software make sense for a small business?",
        answer:
          "When your process is part of what sets you apart, when no existing product handles it well, or when critical work is held together by spreadsheets and workarounds. If a well-supported product already fits at a reasonable cost, we will recommend it instead. Often the best answer is a combination: keep what works and build only the missing piece.",
      },
      {
        question: "How much does custom business software cost?",
        answer:
          "Custom software projects start at $7,500. Cost depends on the size of the problem, the number of systems involved and how much the first release needs to do. Larger systems are usually delivered in phases, so the first release solves the most important problem. If you are unsure what you need, a $500 Technology Assessment gives you clear, prioritized recommendations first.",
      },
      {
        question: "Can you integrate with software we already use?",
        answer:
          "Usually, yes. Connecting new software to the CRM, accounting, scheduling and other tools you already rely on is a normal part of our work, through APIs, exports or direct database access. If a system offers no practical way to reach its data, we will tell you during scoping rather than after.",
      },
      {
        question: "Can you modernize an existing internal tool?",
        answer:
          "Yes. We replace aging systems, legacy databases and brittle scripts carefully, keeping the business running while the replacement is built. Sometimes improving the existing tool is a better choice than rebuilding it, and we will say so.",
      },
      {
        question: "Who maintains the software after launch?",
        answer:
          "We can. Support is part of how we work, and a Technology Partner plan (from $750/month) covers ongoing engineering and improvements. We also build with clear architecture, documentation and well-supported technology, so the system can be understood and extended later, by us or by anyone else.",
      },
    ],
    relatedWork: [
      {
        slug: "apex-sim-coach",
        note: "A commercial Windows product we designed, built and operate end to end, including installers, licensing and production infrastructure.",
      },
      {
        slug: "medicaidmatcher-pro",
        note: "Purpose-built desktop software that turns a labor-intensive reconciliation process into a structured workflow.",
      },
      {
        slug: "known-universe",
        note: "A large, data-driven simulation with automated tests. Our proving ground for long-lived system architecture.",
      },
    ],
  },
  {
    slug: "artificial-intelligence",
    href: "/services/artificial-intelligence",
    name: "Artificial Intelligence",
    shortName: "Artificial Intelligence",
    summary:
      "Private AI systems, internal assistants, knowledge tools and AI-enabled workflows integrated with the software you already use.",
    highlights: ["Knowledge assistants", "Document workflows", "Private AI"],
    seoTitle: "AI Consulting & AI Systems for Small Businesses",
    headline: "Practical AI, applied where it genuinely helps.",
    intro:
      "AI is well suited to a specific set of problems: finding information, working with documents, drafting, summarizing and classifying. We provide AI consulting and implementation for small and mid-sized businesses, building private assistants and AI-enabled workflows around your own data and systems, and we are direct about when a simpler approach is the better choice.",
    metaDescription:
      "AI consulting and implementation for small and mid-sized businesses: private knowledge assistants, document search and AI-enabled workflows. From $3,500.",
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
          "Assistants that answer questions from your policies, procedures and documentation using retrieval-augmented generation (RAG), with references back to the source.",
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
    faqs: [
      {
        question: "What can AI realistically automate in a small business?",
        answer:
          "AI is reliable for work involving language and documents: answering questions from your own documentation, searching contracts and records by meaning, drafting routine documents, summarizing long material, and sorting incoming email, forms and requests. It is less suited to decisions where a mistake is costly and nobody reviews the result. There, we design AI to draft and recommend while a person approves.",
      },
      {
        question: "Do we need to put our data into ChatGPT?",
        answer:
          "No. We choose between commercial and open models based on quality, cost and privacy for your use case, and design access controls, retention and data handling deliberately. When sensitivity or compliance calls for it, we use privately deployed or self-hosted models.",
      },
      {
        question: "Can you build private or internal AI systems?",
        answer:
          "Yes. Internal knowledge assistants, business-specific copilots and AI features inside your existing software can be deployed privately, with access limited to the people and information they are meant for.",
      },
      {
        question: "What is the difference between an AI assistant and workflow automation?",
        answer:
          "An AI assistant works with language: it answers questions, drafts and summarizes, usually with a person asking and reviewing. Workflow automation moves information between systems according to defined rules, the same way every time. Many useful systems combine the two, such as an automated process with one AI step that classifies incoming documents. If rules alone can do the job reliably, we recommend automation without AI.",
      },
      {
        question: "How much does an AI system cost?",
        answer:
          "AI business systems start at $3,500. The final scope depends on the data involved, the systems it connects to and the level of review and control the workflow requires. Ongoing model costs are part of the design conversation, and we choose models with that cost in mind.",
      },
    ],
    relatedWork: [
      {
        slug: "autoresearcher",
        note: "Document ingestion, semantic retrieval and coordinated agents that draft, critique and revise against source material: the foundations of a business knowledge assistant.",
      },
      {
        slug: "apex-sim-coach",
        note: "Applied AI in a commercial product, with speech and AI-assisted debriefs running locally on the user's machine.",
      },
      {
        slug: "unreal-blueprint-assistant",
        note: "AI that operates domain-specific tools through structured, validated operations instead of only generating text.",
      },
    ],
  },
  {
    slug: "automation",
    href: "/services/automation",
    name: "Workflow Automation",
    shortName: "Workflow Automation",
    summary:
      "Connect your software, eliminate repetitive work and automate the processes that currently consume your team's time.",
    highlights: ["Data synchronization", "CRM workflows", "Reporting"],
    seoTitle: "Workflow Automation for Small Businesses",
    headline: "Stop paying people to move information between systems.",
    intro:
      "In many businesses, capable people spend hours each week copying data between applications, sending the same follow-ups and assembling the same reports. Through workflow and business process automation, we connect your tools and take over that repetitive work, so your team can focus on the work that requires judgment.",
    metaDescription:
      "Workflow and business process automation for small and mid-sized businesses: API integrations, data sync, CRM workflows and reporting. From $1,500.",
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
    faqs: [
      {
        question: "What business processes can be automated?",
        answer:
          "Good candidates are repetitive, rule-based and frequent: data entry, moving records between systems, customer follow-up, notifications, document filing, quoting, scheduling and recurring reports. If someone follows the same steps every time, it is worth a look.",
      },
      {
        question: "Can you connect tools that don't already integrate?",
        answer:
          "Often, yes. Where applications have no off-the-shelf connector, we build direct API integrations or custom connections between them. If a system provides no practical access to its data, we will tell you during scoping.",
      },
      {
        question: "Do we need to replace our current software?",
        answer:
          "Usually not. Most automation work connects the tools you already use so they share information. Replacement only makes sense when a tool genuinely cannot do the job, and then custom software may be part of the answer.",
      },
      {
        question: "How much does workflow automation cost?",
        answer:
          "Workflow automation projects start at $1,500. Cost depends mainly on how many systems are involved, how well they expose their data and how much decision logic the process contains. During scoping we map how often the process runs and how long it takes today, so you can judge the return with your own numbers.",
      },
      {
        question: "What happens if one of the connected services changes?",
        answer:
          "Vendors do change their products and APIs. We document every workflow, make failures visible to the right people instead of letting them fail silently, and choose platforms and code that are practical to maintain. A Technology Partner plan can cover ongoing automation and integration work as your tools change.",
      },
    ],
    relatedWork: [
      {
        slug: "medicaidmatcher-pro",
        note: "Automates a manual reconciliation process: ingesting remittance files and billing exports, matching payments to claims and generating follow-up work.",
      },
      {
        slug: "autoresearcher",
        note: "A multi-step pipeline that ingests documents, coordinates specialized steps and returns structured output that can be checked.",
      },
    ],
  },
  {
    slug: "web-development",
    href: "/services/web-development",
    name: "Web Engineering",
    shortName: "Web Engineering",
    summary:
      "Fast, accessible, responsive business websites and web applications engineered around your organization and its goals.",
    highlights: ["Business websites", "Technical SEO", "CMS & integrations"],
    seoTitle: "Small Business Web Development & Web Engineering",
    headline: "Websites engineered to perform, not just to look good.",
    intro:
      "Your website is often the first serious interaction a customer has with your business. We design and develop fast, accessible, responsive websites and web applications for small and mid-sized businesses: sites that represent your company well, can be found in search, and are built on a foundation you will not need to replace in two years.",
    metaDescription:
      "Small business website design and development: fast, accessible custom websites with technical SEO, integrations and ongoing support. From $2,500.",
    context: {
      heading: "A website is a piece of software. It should be engineered like one.",
      body: [
        "A good-looking website that loads slowly, is difficult to update or quietly loses form submissions is not doing its job. The details that determine whether a site actually works for your business, including performance, accessibility, search visibility, integrations and reliable hosting, are engineering problems.",
        "That is why we call it web engineering. Whether you need a new business website, a redesign or a web application, we start with how your customers find and evaluate you, design a site that makes your business easy to understand and contact, and build it with the same care we apply to any production software.",
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
    faqs: [
      {
        question: "How much does a small business website cost?",
        answer:
          "Business websites start at $2,500. Foundation sites, typically around five pages, start at $2,500. Growth sites with more content, editing and integrations start at $4,500, and Advanced sites with custom functionality or application features start at $7,500. Every proposal is scoped to your actual content, features and integrations.",
      },
      {
        question: "How long does a website project take?",
        answer:
          "It depends on the size of the site, how much content is ready and which integrations are involved. We agree on scope, cost and timeline before building, and share working progress along the way instead of disappearing until launch.",
      },
      {
        question: "Do you provide SEO?",
        answer:
          "Every site includes a technical SEO foundation: page structure, metadata, structured data, sitemaps, performance and accessibility, all of which help search engines understand your business. We do not promise specific rankings, because nobody can honestly guarantee them.",
      },
      {
        question: "Can you integrate our CRM or other business software?",
        answer:
          "Yes. Inquiries, bookings and leads can be delivered straight into the CRM, email or scheduling tools your team already uses. More involved integrations and data flows are part of Growth and Advanced projects, and can be combined with workflow automation.",
      },
      {
        question: "Can you rebuild an existing website?",
        answer:
          "Yes. We can redesign and rebuild an existing site on a faster, more maintainable foundation, carrying over the content that still works. Where page addresses change, we plan redirects so existing links and search visibility are not thrown away.",
      },
      {
        question: "Do you provide ongoing maintenance?",
        answer:
          "Yes, through Managed Website Support, from $199/month: hosting oversight, updates, uptime monitoring, backups, security maintenance and basic technical support. Larger development work is scoped separately.",
      },
    ],
    relatedWork: [],
  },
];

export function getService(slug: ServiceSlug): Service {
  const service = services.find((s) => s.slug === slug);
  if (!service) throw new Error(`Unknown service: ${slug}`);
  return service;
}
