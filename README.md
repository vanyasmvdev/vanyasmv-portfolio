# vanyasmv — Personal Portfolio

Portfolio site for Ion Smoleaninov.

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui |
| i18n | next-intl (en, ro, ru) |
| Animation | Framer Motion |
| Icons | lucide-react |
| Package manager | pnpm |

## Commands

```bash
pnpm dev      # Start development server at http://localhost:3000
pnpm build    # Production build
pnpm lint     # Run ESLint
```

## Folder Structure

```
src/
├── app/
│   └── [locale]/          # i18n-aware routes (en default, ro, ru)
│       ├── layout.tsx      # Locale layout with fonts, metadata, NextIntlClientProvider
│       ├── page.tsx        # Home page
│       └── projects/       # Projects route (coming soon)
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── sections/           # Page sections (hero, about, etc.)
│   └── layout/             # Header, Footer, Container, Section
├── lib/
│   └── utils.ts            # shadcn cn() utility
├── i18n/
│   ├── routing.ts          # Locale routing config
│   └── request.ts          # Per-request locale resolution
├── messages/
│   ├── en.json
│   ├── ro.json
│   └── ru.json
├── content/
│   └── projects.ts         # Project data
└── middleware.ts            # next-intl middleware for locale routing
```
