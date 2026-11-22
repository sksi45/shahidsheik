/** Portfolio content customized for Shahid Sheik. Keep claims factual; no invented performance metrics. */
export const profile = {
  fullName: 'Shahid Sheik',
  name: 'Shahid Sheik',
  first: 'Shahid',
  email: 'iiiks777@gmail.com',
  location: 'Eluru, Andhra Pradesh, India',
  timezone: 'Asia/Kolkata',
  links: {
    linkedin: 'https://www.linkedin.com/in/shahid-ibrahim-sk-1190',
    github: 'https://github.com/sksi45',
  },
  resume: '',
  portrait: {
    src: '',
    srcSet: '',
    width: 1,
    height: 1,
    alt: 'Abstract typographic artwork',
  },
  roles: ['Production Support Engineer', 'Application Support Engineer', 'Incident & Problem Management', 'Enterprise SaaS Support'],
  availability: 'Open to international opportunities',
  interests: ['Production Reliability', 'Cloud Operations', 'Observability', 'DevOps'],
};

export const stats = [
  { value: 5, decimals: 0, suffix: '+', label: 'Years across IT & production support' },
  { value: 3, decimals: 0, suffix: '', label: 'Core support domains' },
  { value: 0, decimals: 0, suffix: '', label: 'Stakeholder escalations reported' },
  { value: 1, decimals: 0, suffix: '', label: 'Support-first mindset' },
];

export const education = [
  {
    school: 'Sir C.R.R. College of Engineering',
    place: 'Eluru, Andhra Pradesh',
    degree: 'B.Tech, Computer Science & Engineering',
    period: 'May 2015 — May 2019',
    score: '',
  },
];

export type SkillCategory = { id: string; index: string; title: string; blurb: string; skills: string[] };

export const skillCategories: SkillCategory[] = [
  {
    id: 'support',
    index: '01',
    title: 'Production Support',
    blurb: 'Incident triage, business-impact assessment, SLA ownership, clear updates and reliable closure.',
    skills: ['Incident Management', 'Problem Management', 'SLA Monitoring', 'Root-Cause Coordination', 'UAT Support', 'Runbooks'],
  },
  {
    id: 'data',
    index: '02',
    title: 'Data & Investigation',
    blurb: 'Follow the data across systems, validate discrepancies and turn evidence into actionable findings.',
    skills: ['SQL', 'SQL Server', 'Oracle Developer', 'Snowflake', 'DWH', 'SSIS', 'Excel', 'Data Reconciliation'],
  },
  {
    id: 'platforms',
    index: '03',
    title: 'Enterprise Platforms',
    blurb: 'Hands-on application support across CRM, service management, payments and enterprise workflows.',
    skills: ['Salesforce', 'ServiceNow', 'Siebel', 'SAP', 'JIRA', 'Wolken', 'Postman', 'Airtable'],
  },
  {
    id: 'observability',
    index: '04',
    title: 'Monitoring & Reporting',
    blurb: 'Use logs, dashboards and operational signals to isolate issues and communicate service health.',
    skills: ['Splunk', 'Dynatrace', 'Looker', 'Tableau', 'Power BI', 'CloudWatch', 'KPI Reporting'],
  },
  {
    id: 'cloud',
    index: '05',
    title: 'Cloud & Delivery',
    blurb: 'Growing practical experience with cloud environments, containers and deployment workflows.',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Git', 'Linux', 'Helm'],
  },
  {
    id: 'collaboration',
    index: '06',
    title: 'Cross-Team Delivery',
    blurb: 'Coordinate product, engineering, SRE, business teams and external vendors around resolution.',
    skills: ['Stakeholder Updates', 'Vendor Coordination', 'Knowledge Management', 'Process Improvement', 'Documentation'],
  },
];

export const fundamentals = ['SQL & Data Validation', 'Application Troubleshooting', 'Incident Lifecycle', 'Change & Release Support', 'SLA / Priority Management', 'Customer Communication'];

export type Metric = { value: string; label: string };
export type Project = {
  id: string; index: string; title: string; year: string; kind: string; summary: string;
  stack: string[]; contribution: string[]; features: string[]; metrics: Metric[];
  github?: string; live?: string; motif: 'scan' | 'flow' | 'tenants';
};

export const projects: Project[] = [
  {
    id: 'ecommerce-cloud-reconciliation', index: '01', title: 'Enterprise Cloud Usage Reconciliation',
    year: 'Production Support', kind: 'SaaS · Data Integrity · Operations',
    summary: 'A support case study focused on investigating enterprise cloud usage and contract discrepancies across billing and usage systems.',
    stack: ['SQL', 'Enterprise SaaS', 'Cloud Usage Metrics', 'Case Management'],
    contribution: [
      'Investigate premium-cloud usage differences, missing server usage and contract recalculation concerns using available usage and account evidence.',
      'Support reconciliation of enterprise metadata, Cloud Credits and TokenFlex-related usage while coordinating product and engineering investigation.',
      'Document findings, affected accounts and case context so technical teams can reproduce and resolve the issue.',
    ],
    features: ['Usage discrepancy investigation', 'Contract and usage reconciliation', 'Evidence-led case updates', 'Cross-team resolution'],
    metrics: [{ value: 'ECCR', label: 'Support domain' }, { value: 'SLA', label: 'Priority focus' }, { value: 'Data', label: 'Integrity' }],
    motif: 'scan',
  },
  {
    id: 'partner-web-services', index: '02', title: 'Partner Web Services & Order Integrity',
    year: 'Production Support', kind: 'API · Payments · Salesforce',
    summary: 'A production support workflow for critical partner API and order failures, with validation from request through backend and CRM records.',
    stack: ['Postman', 'Salesforce', 'JIRA', 'API Validation'],
    contribution: [
      'Validate partner case APIs and backend behavior with Postman, then verify relevant Salesforce records and order state.',
      'Investigate critical order failures and data-integrity issues, capturing reproducible details and business impact.',
      'Escalate systemic or multi-partner patterns to Engineering through JIRA with clear evidence and affected-case context.',
    ],
    features: ['API request validation', 'CRM cross-checks', 'Critical order triage', 'Engineering handoff'],
    metrics: [{ value: 'PWS', label: 'Support domain' }, { value: 'API', label: 'Validation' }, { value: 'P1', label: 'Critical triage' }],
    motif: 'flow',
  },
  {
    id: 'customer-platform-sync', index: '03', title: 'Customer Platform Data & Access Support',
    year: 'Production Support', kind: 'CRM · Identity · Enterprise Systems',
    summary: 'Operational support for customer-data synchronization, permissions and configuration across connected business applications.',
    stack: ['Salesforce', 'ServiceNow', 'SQL', 'JIRA'],
    contribution: [
      'Trace user-data synchronization between Salesforce and internal tools, checking records, access and configuration.',
      'Support permission and access investigations while preserving clear case history and operational controls.',
      'Coordinate data, configuration and platform enhancement requests with the appropriate support and engineering owners.',
    ],
    features: ['Data synchronization', 'Access and permission checks', 'Configuration investigation', 'Enhancement coordination'],
    metrics: [{ value: 'CEP / AA', label: 'Support areas' }, { value: 'Access', label: 'Controls' }, { value: 'Sync', label: 'Data flow' }],
    motif: 'tenants',
  },
];

export type TimelineItem = { period: string; title: string; org: string; place?: string; kind: string; points: string[] };

export const timeline: TimelineItem[] = [
  {
    period: 'Oct 2022 — Present',
    title: 'Application / Production Support Engineer',
    org: 'Autodesk',
    place: 'India · Enterprise SaaS Support',
    kind: 'Work',
    points: [
      'Support enterprise application workflows across ECCR, PWS, CEP/AA and related cross-functional incidents.',
      'Investigate production issues using SQL, Salesforce, APIs, logs, dashboards and business-system evidence.',
      'Coordinate with Salesforce, SAP, Engineering, SRE, Product Support, BI and external vendors for complex or P1 issues.',
      'Maintain SLA discipline, concise stakeholder communication, case notes and actionable handoffs; recognized as a top performer with no stakeholder escalations reported.',
    ],
  },
  {
    period: 'Mar 2022 — Sep 2022',
    title: 'IT / Business Intelligence Support',
    org: 'CDK Global',
    place: 'India',
    kind: 'Work',
    points: [
      'Supported Tableau, Salesforce and Jira workflows, dashboards and business reporting.',
      'Contributed to a COVID Employee Wellness Survey HR/BI dashboard and process documentation.',
      'Worked with CSD, IT/BI administrators, content authors and data stewards on operational requests.',
    ],
  },
  {
    period: 'Oct 2020 — Feb 2022',
    title: 'Application Support',
    org: 'IBM',
    place: 'India',
    kind: 'Work',
    points: [
      'Provided production support for SQL data extraction, web/client applications, file feeds and batch processes.',
      'Collaborated with developers, analysts and project managers; supported weekend operations when required.',
      'Prepared evidence and documentation for SEBI audit activities and supported incident, problem and change workflows.',
    ],
  },
  {
    period: 'May 2015 — May 2019',
    title: 'B.Tech, Computer Science & Engineering',
    org: 'Sir C.R.R. College of Engineering',
    place: 'Eluru, Andhra Pradesh',
    kind: 'Education',
    points: ['Graduated with a foundation in computer science, databases and software systems.'],
  },
];

export type Recognition = { title: string; org: string; detail: string; kind: string; link?: string };
export const recognitions: Recognition[] = [
  { title: 'Top Performer', org: 'Production / Application Support', kind: 'Recognition', detail: 'Recognized for dependable support delivery and disciplined case ownership.' },
  { title: 'SLA-focused delivery', org: 'Enterprise Support', kind: 'Operations', detail: 'Maintains strict SLA adherence and reports no stakeholder escalations.' },
];

export type Certification = { issuer: string; name: string; link: string };
export const certifications: Certification[] = [];

export const navItems = [
  { id: 'home', label: 'Home' }, { id: 'about', label: 'About' }, { id: 'expertise', label: 'Expertise' },
  { id: 'projects', label: 'Support Work' }, { id: 'experience', label: 'Experience' }, { id: 'contact', label: 'Contact' },
];

export function projectsUsing(skill: string): string[] {
  const s = skill.toLowerCase().replace(/\\.js$/, '');
  return projects.filter((p) => p.stack.some((t) => t.toLowerCase().replace(/\\.js$/, '') === s
    || (s === 'rest apis' && t === 'REST API') || (s === 'docker' && t.startsWith('Docker'))))
    .map((p) => p.title);
}
