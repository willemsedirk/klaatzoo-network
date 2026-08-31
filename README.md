# 🟩 Klaatzoo Network

A premium Minecraft SMP website with a dynamic application system, staff panel, and Discord integration.

Built with **Next.js 15**, **TypeScript**, **Tailwind CSS v4**, **PostgreSQL**, **Prisma**, and **Auth.js v5**.

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ (tested on v24)
- **Docker** (for PostgreSQL) or a running PostgreSQL instance
- **npm** (included with Node.js)

### 1. Clone and Install

```bash
cd klaatzoo-network
npm install
```

### 2. Start PostgreSQL

Using Docker Compose (recommended):

```bash
docker compose up -d
```

Or configure `DATABASE_URL` in `.env` to point to your existing PostgreSQL instance.

### 3. Set Up Environment Variables

Copy the example and edit as needed:

```bash
cp .env.example .env
```

Key variables:
| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `AUTH_SECRET` | Auth.js secret (generate with `npx auth secret`) |
| `DISCORD_WEBHOOK_URL` | Discord webhook URL for staff notifications |
| `UPLOAD_DIR` | Local file upload directory (default: `./public/uploads`) |

### 4. Set Up Database

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed demo data
npm run db:seed
```

### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 🔑 Demo Accounts

All demo accounts use the password: `Password123`

| Email | Role | Username |
|---|---|---|
| `admin@klaatzoo.net` | Admin | BlockMaster_K |
| `mod@klaatzoo.net` | Moderator | CraftWarden |
| `player1@example.com` | Applicant | DiamondDave |

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home
│   ├── builds/             # Builds gallery
│   ├── about/              # About/rules/staff
│   ├── resources/          # Guides and links
│   ├── apply/              # Application form
│   ├── login/              # Auth
│   ├── register/           # Auth
│   ├── dashboard/          # Applicant dashboard
│   ├── admin/              # Staff panel (role-gated)
│   └── api/                # API routes
├── components/
│   ├── ui/                 # Shared primitives (Button, Card, Badge, etc.)
│   └── layout/             # Navbar, Footer, PageShell
├── config/
│   ├── site.ts             # Site metadata, nav, content
│   └── questions.ts        # Application form questions
├── lib/
│   ├── auth.ts             # Auth.js configuration
│   ├── db.ts               # Prisma client
│   ├── discord.ts          # Webhook helpers
│   ├── upload.ts           # File upload handler
│   ├── validations.ts      # Zod schemas
│   └── utils.ts            # Utilities
├── actions/                # Server Actions
│   ├── auth.ts             # Login/register
│   ├── applications.ts     # Submit application
│   └── admin.ts            # Staff actions
└── middleware.ts           # Route protection
```

---

## 🎨 How To: Customize Theme Colors

All colors are defined as CSS custom properties in `src/app/globals.css` under the `@theme` block:

```css
@theme {
  --color-mc-red: #f44235;
  --color-mc-green: #4baf4f;
  --color-mc-blue: #2196f3;
  --color-mc-yellow: #fec106;
  --color-mc-purple: #9b27b0;
  --color-bg-primary: #fef7cc;
  /* ... etc */
}
```

Edit these values to change the entire site's color scheme. No other files need to change.

---

## 📝 How To: Add/Edit Application Questions

Edit `src/config/questions.ts`. The form renders dynamically from this config:

```ts
export const applicationQuestions: Question[] = [
  {
    id: "my_new_question",
    label: "Your question text here",
    type: "short_text",        // or "long_text", "multiple_choice", "image_upload"
    required: true,
    placeholder: "Hint text",
  },
  // ... add, remove, or reorder questions here
];
```

No code changes needed — just edit this file and restart the dev server.

---

## 📄 How To: Add a New Page

1. Create a new directory in `src/app/` (e.g., `src/app/events/`)
2. Create `page.tsx` inside it:

```tsx
import { PageShell } from "@/components/layout/PageShell";

export default function EventsPage() {
  return (
    <PageShell>
      <h1>Events</h1>
      {/* Your content here */}
    </PageShell>
  );
}
```

3. Add it to navigation in `src/config/site.ts`:

```ts
nav: [
  // ... existing links
  { label: "Events", href: "/events" },
],
```

---

## 🔗 Discord Webhook Setup

1. In your Discord server, go to **Server Settings → Integrations → Webhooks**
2. Click **New Webhook**, name it "Klaatzoo Applications", select your staff channel
3. Copy the webhook URL
4. Set `DISCORD_WEBHOOK_URL` in your `.env` file

The bot will post formatted embeds when:
- A new application is submitted
- An application status is changed

---

## 🚢 Deployment

```bash
npm run build   # Creates production build (also generates Prisma client)
npm start       # Starts production server
```

For production, ensure:
- `AUTH_SECRET` is a strong, unique secret
- `DATABASE_URL` points to your production PostgreSQL
- `NEXT_PUBLIC_SITE_URL` is set to your domain
- Consider S3-compatible storage for uploads (extend `src/lib/upload.ts`)

---

## 📜 License

MIT
