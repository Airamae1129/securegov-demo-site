export const site = {
  name: "SecureGov AI",
  company: "CyberHealth",
  country: "Ireland",
  url: "securegov.eu",
  email: "info@securegov.eu",
  phone: "+353-046-9246769",
  year: new Date().getFullYear(),
};

export const nav = [
  { label: "Features", href: "features" },
  { label: "Product Tour", href: "product-tour" },
  { label: "Use Cases", href: "use-cases" },
  { label: "Security", href: "security" },
  { label: "Pricing", href: "pricing" },
  { label: "Roadmap", href: "roadmap" },
];

export const hero = {
  eyebrow: "BUILT IN IRELAND · FOR EUROPEAN SMES",
  lines: ["Automated Governance.", "Instant Compliance.", "Audit-Ready."],
  sub: "SecureGov AI is AI-powered governance automation for policies, risks, controls and evidence — built for European SMEs and ready for NIS2, the Cyber Resilience Act and ISO 27001.",
  tagline: "No cybersecurity team? No problem.",
  cards: [
    { label: "Compliance Index", value: "78", chip: "Medium" },
    { label: "Open findings", value: "24 → 6", chip: "Improving" },
    { label: "Regulations in scope", value: "7", chip: "Auto-mapped" },
    { label: "Roadmap", value: "Month 1–3", chip: "Active" },
  ],
};

export const frameworks = ["ISO 27001", "ISO 42001", "NIS2", "CyFun", "GDPR", "CRA", "DORA"];

export const problem = {
  eyebrow: "THE PROBLEM",
  title: "EU cyber rules overlap. Your time does not.",
  body: "NIS2 and its national transpositions, the Cyber Resilience Act, DORA, GDPR, ISO 27001 — each asks for something slightly different, in slightly different words. For an SME with 10–250 staff, no security team and a real business to run, that overlap is the risk.",
  chips: ["NIS2", "Belgian NIS2 Law", "Austrian NIS Act", "KRITIS", "CRA", "DORA", "GDPR", "ISO 27001", "Cyber Solidarity Act"],
  resolution: "One control framework",
  resolutionSub: "SecureGov AI consolidates every obligation into a single, prioritised set of controls. One place. One plan.",
};

export const modules = [
  { id: "01", name: "Requirements Consolidation", desc: "One integrated control framework across every regulation that applies to you." },
  { id: "02", name: "Cyber Risk & Readiness Dashboard", desc: "Honest scores, live posture, and what to fix first." },
  { id: "03", name: "Strategy Builder & Roadmap Generator", desc: "A tailored 12-month plan, sequenced by impact and effort." },
  { id: "04", name: "Supplier Risk Assessment Portal", desc: "Smart third-party assessments and alerts across your supply chain." },
  { id: "05", name: "Virtual Cyber Advisor", desc: "An AI compliance chatbot that answers in plain language, any time." },
];

export const capabilities = [
  {
    id: "policy",
    title: "Policy Automation",
    desc: "Generate, update and version-control policies. No blank pages, no stale PDFs.",
    anim: "policy",
  },
  {
    id: "risk",
    title: "Risk Register & Controls",
    desc: "A live register of risks linked to the controls that treat them.",
    anim: "risk",
  },
  {
    id: "evidence",
    title: "Audit Evidence Hub",
    desc: "Upload, tag and file evidence once — reuse it across every framework.",
    anim: "evidence",
  },
  {
    id: "frameworks",
    title: "Compliance Frameworks",
    desc: "Ready-made structures for ISO 27001, ISO 42001, NIS2, CyFun and GDPR.",
    anim: "frameworks",
  },
  {
    id: "ai",
    title: "AI Assistant",
    desc: "Instant answers, templates and control-mapping help, always available.",
    anim: "ai",
  },
  {
    id: "supplier",
    title: "Supplier Risk Portal",
    desc: "Third-party risk with smart assessments and alerts.",
    anim: "supplier",
  },
  {
    id: "strategy",
    title: "Strategy & Roadmap Generator",
    desc: "A tailored strategy aligned to EU regulation, not a generic checklist.",
    anim: "strategy",
  },
];

export const howItWorks = [
  { step: 1, title: "Answer seven questions", desc: "About ten minutes. No preparation needed." },
  { step: 2, title: "AI builds your risk profile", desc: "It decides which regulations apply and assembles your controls framework." },
  { step: 3, title: "Self-assessment", desc: "Guided questions in plain language, with help at every step." },
  { step: 4, title: "Advisor throughout", desc: "The Virtual Cyber Advisor explains, drafts and maps controls as you go." },
  { step: 5, title: "Strategy & 12-month roadmap", desc: "A prioritised, actionable plan your board can actually read." },
];

export const useCases = [
  {
    id: "iso",
    title: "ISO 27001 readiness in 30 days",
    problem: "Certification feels like a six-month consulting project.",
    solution: "SecureGov AI structures your Statement of Applicability, tracks control progress and shows a readiness ring filling day by day.",
    stat: "30 days",
    statLabel: "to audit-ready structure",
  },
  {
    id: "nis2",
    title: "NIS2 gap analysis, national laws included",
    problem: "NIS2 reads differently in Belgium, Austria and Germany.",
    solution: "Applicability rules decide which national transposition applies, then a gap heat map shows exactly where you stand.",
    stat: "9 regimes",
    statLabel: "mapped to one framework",
  },
  {
    id: "policy",
    title: "Automated policy updates",
    problem: "Policies drift out of date the moment they are signed.",
    solution: "Version-controlled policies update as regulations change — v1 → v2 with a clear diff and an owner for every change.",
    stat: "v1 → v2",
    statLabel: "with full audit trail",
  },
  {
    id: "audit",
    title: "Audit preparation with one click",
    problem: "Audits mean weeks of hunting for evidence.",
    solution: "Generate a complete audit pack — policies, evidence, control status — as a single export, whenever you need it.",
    stat: "1 click",
    statLabel: "to a full audit pack",
  },
];

export const securityPoints = [
  { title: "ISO 27001 & ISO 42001 certified", desc: "Certified information security and AI management systems." },
  { title: "Encryption at rest and in transit", desc: "Your data is protected end to end." },
  { title: "Role-based access control", desc: "Permissions decide exactly what each user sees." },
  { title: "Full audit trails", desc: "Every action is logged and reviewable." },
  { title: "Hosted in EU data centres", desc: "Your data stays in Europe." },
  { title: "GDPR by design", desc: "Privacy built in, not bolted on." },
];

export const securityTagline = "Built in Ireland for Europe. AI-driven, validated by human experts.";

export const pricing = [
  {
    name: "Starter",
    price: "Free",
    desc: "See where you stand today.",
    features: ["Readiness dashboard", "Basic AI advisor", "Self-assessment", "1 framework"],
    cta: "Request Full Demo",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "from €29/month",
    desc: "The full platform for your team.",
    features: ["All five modules", "Multiple frameworks", "Supplier risk portal", "Strategy & roadmap generator"],
    cta: "Request Full Demo",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Contact us",
    desc: "For groups and regulated sectors.",
    features: ["Multi-entity", "Human expert guidance", "Audit prep & policy customisation", "Priority support"],
    cta: "Talk to us",
    highlighted: false,
  },
];

export const cta = {
  title: "Don't wait for a cyber incident or an audit.",
  sub: "Be proactive with SecureGov AI.",
  sizes: ["1–10", "11–50", "51–250", "250+"],
  frameworkOptions: ["NIS2", "ISO 27001", "GDPR", "DORA", "CRA", "ISO 42001", "CyFun"],
};

export const roadmapItems = [
  { title: "Automated control testing", quarter: "Q3 2026" },
  { title: "AI-driven audit remediation", quarter: "Q4 2026" },
  { title: "Multi-framework mapping", quarter: "Q1 2027" },
  { title: "Continuous compliance scoring", quarter: "Q2 2027" },
];

export const chatScripts: Record<string, { q: string; a: string }> = {
  policy: {
    q: "Generate a policy section",
    a: "Password Management (v1.3 draft)\n\nAll user accounts must be protected by unique passwords of at least 12 characters. Multi-factor authentication is required for remote access and administrator accounts. Passwords must not be reused across systems, and a password manager is provided to all staff.\n\nMapped to: ISO 27001 A.5.17 · NIS2 Art. 21(2)(j)",
  },
  risk: {
    q: "Summarise a risk",
    a: "Phishing leading to credential theft — Likelihood: High · Impact: High · Score: 16 (Critical).\n\nA targeted phishing campaign could give an attacker access to email and cloud documents. Recommended treatment: enforce MFA, run quarterly phishing simulations, and deploy email filtering with link rewriting.\n\nOwner: IT Manager · Review: monthly",
  },
  controls: {
    q: "Suggest controls for remote access",
    a: "For remote access under NIS2 and ISO 27001, we recommend:\n\n1. Multi-factor authentication on all remote sessions\n2. VPN or zero-trust network access (ZTNA)\n3. Device compliance checks before connection\n4. Quarterly access reviews with sign-off\n\nAll four map to ISO 27001 A.8.20–A.8.22 and NIS2 Art. 21(2).",
  },
};
