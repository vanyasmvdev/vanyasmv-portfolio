export type Project = {
  slug: string;
  name: string;
  status: 'live' | 'archived' | 'wip';
  year: number;
  description: string;
  longDescription: string;
  stack: string[];
  fullStack: {
    category: string;
    items: string[];
  }[];
  liveUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: 'bromind',
    name: 'BroMind',
    status: 'live',
    year: 2025,
    description: 'AI companion for honest self-reflection.',
    longDescription:
      'A minimalist AI companion built for brotherly, honest conversations. Not therapy, not motivation — just a space to think out loud and check in with yourself.',
    stack: ['Next.js 15', 'TypeScript', 'Supabase', 'OpenRouter', 'Tailwind'],
    fullStack: [
      {
        category: 'Frontend',
        items: ['Next.js 15 (App Router, RSC)', 'React 19', 'TypeScript', 'Tailwind CSS', 'Lucide React'],
      },
      {
        category: 'Backend',
        items: ['Supabase (Postgres, Auth, RLS, Realtime)', '@supabase/ssr', 'Zod'],
      },
      {
        category: 'AI',
        items: ['OpenRouter gateway', 'Claude Sonnet 4 (chat)', 'Claude Haiku 4.5 (background tasks)', 'Whisper (transcription)'],
      },
      {
        category: 'Infrastructure',
        items: ['Vercel (serverless, edge, cron)', 'Custom domain bromind.app'],
      },
      {
        category: 'Realtime',
        items: ['Server-Sent Events (SSE)', 'Native ReadableStream'],
      },
    ],
    liveUrl: 'https://bromind.app',
  },
];
