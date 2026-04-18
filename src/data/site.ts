export type Project = {
  id: string
  title: string
  role: string
  year: string
  tags: string[]
  summary: string
  href?: string
}

export type StackGroup = {
  label: string
  items: readonly string[]
}

export const profile = {
  name: 'Simsek',
  initials: 'S.',
  title: 'Front-End Developer',
  tagline: 'Crafting interfaces that earn attention\nand respect time.',
  location: 'Mersin, TR',
  available: true,
  email: 'hello@example.com',
  socials: [
    { label: 'GitHub', href: 'https://github.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'Twitter', href: 'https://twitter.com' },
  ] as const,
}

export const sections = [
  { id: 'home', label: 'Home' },
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'stack', label: 'Stack' },
  { id: 'contact', label: 'Contact' },
] as const

export const projects: Project[] = [
  {
    id: 'p1',
    title: 'Flow Dashboard',
    role: 'Product + Front-End',
    year: '2025',
    tags: ['React', 'Data Viz', 'a11y'],
    summary:
      'Real-time metrics interface that cut decision latency for ops teams. Rebuilt the data layer with incremental loading and optimistic UI.',
    href: '#',
  },
  {
    id: 'p2',
    title: 'Document Orchestra',
    role: 'Full-Stack',
    year: '2024',
    tags: ['TypeScript', 'API', 'PDF'],
    summary:
      'Template versioning and e-signature flows unified in a single screen. Zero page reloads — all state driven through a central document machine.',
    href: '#',
  },
  {
    id: 'p3',
    title: 'Storefront Relaunch',
    role: 'Performance',
    year: '2024',
    tags: ['Vite', 'Motion', 'Core Web Vitals'],
    summary:
      'Aggressive code-splitting + purposeful motion brought LCP under 1.2 s. Reduced JS bundle by 47 % without removing a single feature.',
    href: '#',
  },
  {
    id: 'p4',
    title: 'Open-Source CLI',
    role: 'Tooling / OSS',
    year: '2023',
    tags: ['Node', 'DX', 'OSS'],
    summary:
      'One-command project scaffolding that eliminated repetitive setup for the team. 200+ GitHub stars in the first month.',
    href: 'https://github.com',
  },
]

export const stackGroups: StackGroup[] = [
  {
    label: 'Core',
    items: ['TypeScript', 'React', 'Next.js', 'CSS / Motion'],
  },
  {
    label: 'Back-End',
    items: ['Node.js', 'REST / GraphQL', 'PostgreSQL'],
  },
  {
    label: 'Tooling & Design',
    items: ['Vite', 'Figma', 'Design Systems', 'CI/CD'],
  },
]

export const marqueeItems = [
  'React',
  'TypeScript',
  'Framer Motion',
  'Next.js',
  'Node.js',
  'Figma',
  'CSS',
  'Performance',
  'Accessibility',
  'Design Systems',
  'GraphQL',
  'Vite',
  'PostgreSQL',
  'DX',
]
