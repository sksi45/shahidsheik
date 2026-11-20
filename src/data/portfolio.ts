/**
 * Every fact on this site comes from Sushmita_Dasari_Resume.pdf.
 * Edit here and the whole site follows. Don't add anything the resume doesn't support.
 */

export const profile = {
  fullName: 'Dasari Venkata Ratna Sri Sushmita',
  name: 'Sushmita Dasari',
  first: 'Sushmita',
  email: 'sushmitadasari17@gmail.com',
  location: 'Surampalem, Andhra Pradesh',
  timezone: 'Asia/Kolkata',
  links: {
    linkedin: 'https://www.linkedin.com/in/sushmita-dasari-227a40284/',
    github: 'https://github.com/Sushmitadasari',
  },
  resume: '/assets/Sushmita_Dasari_Resume.pdf',
  portrait: {
    src: '/assets/portrait-720.webp',
    srcSet: '/assets/portrait-420.webp 420w, /assets/portrait-720.webp 720w, /assets/portrait-1100.webp 1100w',
    width: 1100,
    height: 1034,
    alt: 'Portrait of Sushmita Dasari',
  },
  /** Rotating hero designations — each one is backed by the resume. */
  roles: ['Full-Stack Developer', 'AI & ML Engineer in the making', 'Java Developer', 'Problem Solver'],
  availability: 'Open to opportunities',
  interests: ['System Design', 'Cloud Computing (AWS)', 'Machine Learning'],
};

export const stats = [
  { value: 9.1, decimals: 2, suffix: '', label: 'CGPA, B.Tech AI & ML' },
  { value: 850, decimals: 0, suffix: '+', label: 'DSA problems solved' },
  { value: 16, decimals: 0, suffix: '', label: 'Industry certifications' },
  { value: 1, decimals: 0, suffix: ' yr', label: 'Full-stack training' },
];

export const education = [
  {
    school: 'Aditya Engineering College',
    place: 'Surampalem',
    degree: 'B.Tech, Artificial Intelligence & Machine Learning',
    period: 'Oct 2023 — Present',
    score: 'CGPA 9.10',
  },
  {
    school: 'Sri Chaitanya Junior College',
    place: 'Kakinada',
    degree: 'BIEAP, MPC',
    period: 'Jun 2021 — May 2023',
    score: '925 / 1000',
  },
];

export type SkillCategory = { id: string; index: string; title: string; blurb: string; skills: string[] };

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    index: '01',
    title: 'Languages',
    blurb: 'Java is home base. Python for AI work, C and C++ for the fundamentals.',
    skills: ['Java', 'Python', 'C', 'C++', 'JavaScript', 'SQL'],
  },
  {
    id: 'frontend',
    index: '02',
    title: 'Frontend',
    blurb: 'Responsive interfaces built with React and the core web platform.',
    skills: ['React', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    id: 'backend',
    index: '03',
    title: 'Backend',
    blurb: 'Service-oriented Node.js backends with secure, well-shaped APIs.',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'Microservices', 'JWT Auth', 'RBAC'],
  },
  {
    id: 'databases',
    index: '04',
    title: 'Databases',
    blurb: 'Relational and document stores, designed with indexing and normalization in mind.',
    skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'Indexing', 'Normalization'],
  },
  {
    id: 'ai',
    index: '05',
    title: 'AI & Machine Learning',
    blurb: 'An AIML degree, put to work on LLM-powered document intelligence.',
    skills: ['Machine Learning', 'Deep Learning', 'NLP', 'LLMs', 'Python'],
  },
  {
    id: 'tools',
    index: '06',
    title: 'Tools & Cloud',
    blurb: 'Containerised, versioned and ready to deploy.',
    skills: ['Docker', 'Docker Compose', 'Git', 'GitHub', 'Postman', 'AWS', 'Azure'],
  },
];

export const fundamentals = ['DSA', 'Operating Systems', 'Computer Networks', 'DBMS', 'OOP', 'Collections', 'Multithreading'];

export type Metric = { value: string; label: string };
export type Project = {
  id: string;
  index: string;
  title: string;
  year: string;
  kind: string;
  summary: string;
  stack: string[];
  contribution: string[];
  features: string[];
  metrics: Metric[];
  github?: string;
  live?: string;
  motif: 'scan' | 'flow' | 'tenants';
};

export const projects: Project[] = [
  {
    id: 'policyguard-ai',
    index: '01',
    title: 'PolicyGuard AI',
    year: '2026',
    kind: 'AI · NLP · LLM',
    summary:
      'An AI-powered policy analysis platform that reads dense policy documents and answers questions about them — on the web, in a browser extension, on mobile and on desktop.',
    stack: ['Python', 'NLP', 'LLM', 'REST API'],
    contribution: [
      'Built an AI-powered policy analysis platform across web, browser extension, mobile, and desktop applications, processing 500+ policy documents with 92% accuracy and reducing manual review time by 60% across 8 policy categories.',
      'Engineered LLM-based Q&A, key-information extraction, and REST API integration for 10+ document types, enabling real-time policy insights and reducing decision turnaround time by 45%.',
    ],
    features: ['LLM-based Q&A', 'Key-information extraction', '10+ document types', 'Four client platforms'],
    metrics: [
      { value: '500+', label: 'Policy documents processed' },
      { value: '92%', label: 'Accuracy' },
      { value: '60%', label: 'Less manual review time' },
      { value: '45%', label: 'Faster decisions' },
    ],
    // Repo on the resume (github.com/Sushmitadasari/PolicyGuard-AI) is private for now — add `github` once public.
    motif: 'scan',
  },
  {
    id: 'payment-gateway',
    index: '02',
    title: 'Payment Gateway System',
    year: '2026',
    kind: 'Full-Stack · Fintech · Microservices',
    summary:
      'A full-stack UPI and card payment gateway built around a strict payment state machine, packaged as Dockerized microservices.',
    stack: ['Node.js', 'Express', 'PostgreSQL', 'React', 'Docker'],
    contribution: [
      'Built a full-stack UPI & card payment gateway processing 1,000+ transactions at 99.8% uptime with a strict payment state machine (processing → success / failed).',
      'Dockerized the microservice architecture, cutting deployment setup by 70%; backend optimizations reduced API response time by 40% and tripled throughput under load.',
    ],
    features: ['UPI & card payments', 'Strict state machine', 'Dockerized microservices', 'Load-tuned backend'],
    metrics: [
      { value: '1,000+', label: 'Transactions processed' },
      { value: '99.8%', label: 'Uptime' },
      { value: '40%', label: 'Faster API responses' },
      { value: '3×', label: 'Throughput under load' },
    ],
    github: 'https://github.com/Sushmitadasari/Payment-gateway-system-Project',
    motif: 'flow',
  },
  {
    id: 'multi-tenant-saas',
    index: '03',
    title: 'Multi-Tenant SaaS Platform',
    year: '2026',
    kind: 'SaaS · Security · DevOps',
    summary:
      'Shared-database multi-tenancy with strict tenant isolation, four levels of role-based access, and a one-command deployment.',
    stack: ['Node.js', 'React', 'PostgreSQL', 'Docker Compose'],
    contribution: [
      'Architected shared-database multi-tenancy for 50+ concurrent tenants with strict tenant_id isolation and 4-level JWT/RBAC, achieving zero unauthorized-access incidents across 200+ users.',
      'Implemented Docker Compose one-command deployment, reducing environment setup time from 45 minutes to under 2 minutes.',
    ],
    features: ['tenant_id isolation', '4-level JWT / RBAC', 'One-command deploy', '50+ concurrent tenants'],
    metrics: [
      { value: '50+', label: 'Concurrent tenants' },
      { value: '200+', label: 'Users' },
      { value: '0', label: 'Unauthorized-access incidents' },
      { value: '<2 min', label: 'Setup, down from 45' },
    ],
    github: 'https://github.com/Sushmitadasari/Multi-Tenant-SaaS-Platform',
    motif: 'tenants',
  },
];

export type TimelineItem = { period: string; title: string; org: string; place?: string; kind: string; points: string[] };

export const timeline: TimelineItem[] = [
  {
    period: 'May 2025 — Jun 2026',
    title: 'Full-Stack Development Trainee',
    org: 'Technical Hub Pvt Ltd',
    place: 'Surampalem, AP',
    kind: 'Work',
    points: [
      'Completed one year of intensive Full-Stack Development training covering frontend, backend, database integration, and deployment workflows.',
      'Developed responsive, functional web applications — user interfaces, server-side logic, and database connectivity.',
      'Deployed and managed web applications with version control, debugging, and end-to-end development practices.',
    ],
  },
  {
    period: 'Oct 2023 — Present',
    title: 'B.Tech, Artificial Intelligence & Machine Learning',
    org: 'Aditya Engineering College',
    place: 'Surampalem',
    kind: 'Education',
    points: ['CGPA 9.10.', 'AIML Branch Topper with a 9.24 SGPA for the semester.'],
  },
  {
    period: 'Jun 2021 — May 2023',
    title: 'Intermediate, MPC',
    org: 'Sri Chaitanya Junior College',
    place: 'Kakinada',
    kind: 'Education',
    points: ['BIEAP — scored 925 / 1000.'],
  },
];

export type Recognition = { title: string; org: string; detail: string; kind: string; link?: string };

export const recognitions: Recognition[] = [
  {
    title: 'Tech Fellow',
    org: 'AlgoUniversity',
    kind: 'Fellowship',
    detail: 'Selected through competitive national selection — advanced DSA, algorithm optimization, and competitive coding.',
  },
  {
    title: 'Semi-Finalist',
    org: 'Flipkart GRiD 7.0',
    kind: 'Hackathon',
    detail: 'Competed among top national engineering talent.',
    link: 'https://drive.google.com/file/d/16pXA2hssyJqlYMr27wfi6U4bjKDLvh9f/view?usp=drive_link',
  },
  {
    title: 'AIML Branch Topper',
    org: 'Aditya Engineering College',
    kind: 'Academic',
    detail: '9.24 SGPA for the semester.',
  },
  {
    title: '850+ problems solved',
    org: 'LeetCode · GFG · CodeChef',
    kind: 'Competitive coding',
    detail: 'LeetCode 350+ (peak rating 1442) · GFG 300+ (rating 1436) · CodeChef 200+.',
  },
  {
    title: '5-star badges',
    org: 'HackerRank',
    kind: 'Competitive coding',
    detail: 'Five stars in C, Python, Java, and SQL.',
  },
];

export type Certification = { issuer: string; name: string; link: string };

export const certifications: Certification[] = [
  { issuer: 'AWS', name: 'AWS Certified AI Practitioner', link: 'https://drive.google.com/file/d/1h8e5p0a9T6f5gBaOP2ROfwWHZfkkspGn/view?usp=drive_link' },
  { issuer: 'AWS', name: 'AWS Academy Graduate — Cloud Foundations', link: 'https://www.credly.com/badges/2d4810f9-3dbe-444d-99b9-61312ea5e7df/public_url' },
  { issuer: 'MongoDB', name: 'MongoDB Certified Associate Developer', link: 'https://www.credly.com/badges/fd3362bd-743a-4c4d-a68e-b1fdc5d46811/public_url' },
  { issuer: 'GitHub', name: 'GitHub Foundations', link: 'https://drive.google.com/file/d/1o0fkCAMRWTg1oMwxlqu6t6wnOpBv66Vq/view?usp=sharing' },
  { issuer: 'Oracle', name: 'Java Certified Foundations Associate', link: 'https://drive.google.com/file/d/1g-yyceHtLg_k2RWiOIJqH0MMcGlaH90P/view?usp=sharing' },
  { issuer: 'Oracle', name: 'Oracle Certified Foundations Associate — Database', link: 'https://drive.google.com/file/d/10-DzabbcH2vHrI6bAohoT8czKRZMa2kV/view?usp=drive_link' },
  { issuer: 'NPTEL', name: 'Database Management System', link: 'https://drive.google.com/file/d/1MqkJHchXeaGD4S8mzPmEGxEYddAsxAjN/view?usp=drive_link' },
  { issuer: 'NPTEL', name: 'Fundamentals of Artificial Intelligence', link: 'https://drive.google.com/file/d/1GqyUQ-lrE-bHaN457t6fIdssgGG4HMXf/view?usp=drive_link' },
  { issuer: 'NPTEL', name: 'Deep Learning', link: 'https://drive.google.com/file/d/1PWSRP5SQDPzkoTCF3A24eIJoSpTwgsff/view?usp=sharing' },
  { issuer: 'Pearson', name: 'IT Specialist — HTML and CSS', link: 'https://www.credly.com/badges/e4a55298-e396-41d8-a032-283aafe9fab7/public_url' },
  { issuer: 'Cisco', name: 'HTML Essentials', link: 'https://www.credly.com/badges/eb27ca95-3b2a-4948-bef9-0385d1d49055/public_url' },
  { issuer: 'Cisco', name: 'CSS Essentials', link: 'https://www.credly.com/badges/3b37497f-6a61-4889-af3c-ed337a460a0b/public_url' },
  { issuer: 'Cisco', name: 'JavaScript Essentials 1', link: 'https://www.credly.com/badges/9cdd4d55-6ecc-463f-b254-811ccdd0539c/public_url' },
  { issuer: 'Cisco', name: 'JavaScript Essentials 2', link: 'https://www.credly.com/badges/0e1b036e-4318-4c8e-b750-2aca77314442/public_url' },
  { issuer: 'Cisco', name: 'Python Essentials 1', link: 'https://www.credly.com/badges/0e21e3eb-d8ef-4770-95d7-dcbd6f8696b1/public_url' },
  { issuer: 'Udemy', name: 'Microsoft Azure Hands-On (AZ-900, AZ-104, AZ-305)', link: 'https://drive.google.com/file/d/1KrXClhY0nJ3Acxs7DioNf4Q1rpaMvgPT/view?usp=sharing' },
];

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

/** Which projects use a given skill — used by the Expertise section. */
export function projectsUsing(skill: string): string[] {
  const s = skill.toLowerCase().replace(/\.js$/, '');
  return projects
    .filter((p) => p.stack.some((t) => t.toLowerCase().replace(/\.js$/, '') === s || (s === 'llms' && t === 'LLM') || (s === 'rest apis' && t === 'REST API') || (s === 'docker' && t.startsWith('Docker'))))
    .map((p) => p.title);
}
