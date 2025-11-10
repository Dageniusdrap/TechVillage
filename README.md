# TechVillage — Next.js Landing Site

A modern landing page similar in spirit to haihomebatam.lovable.app, built with Next.js App Router and Tailwind CSS. Includes a gallery and a contact form with optional email via Resend.

## Getting Started

1. Install dependencies

```bash
npm install
```

2. Create `.env.local` (optional for contact email)

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
```

3. Run the dev server

```bash
npm run dev
```

Open http://localhost:3000

## Customize
- Update copy and sections in `app/page.tsx`
- Adjust theme in `tailwind.config.ts`
- Replace gallery images with your own (supports remote images by default)
