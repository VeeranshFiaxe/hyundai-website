This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment variables

Copy `.env.example` to `.env.local` and fill it in. In production, set the same
keys in your host's environment-variable settings (Netlify: Site configuration →
Environment variables).

`DATABASE_URL` is the only database setting required. It drives every API route
(OTP send/verify and all lead forms), and works the same on Netlify, a plain
Node server, or Vercel:

```
DATABASE_URL=postgresql://user:password@host:5432/dbname?sslmode=require
```

Include `?sslmode=require` for any database reached over the public internet —
most managed Postgres providers reject unencrypted connections.

Cloudflare Workers is the one host that does not need it: the `HYPERDRIVE`
binding in `wrangler.jsonc` supplies the connection automatically, and is used
whenever `DATABASE_URL` is unset. Setting `DATABASE_URL` always takes priority.

## Database schema

The SQL in `database/migrations/` is not applied automatically — run it once
against the database `DATABASE_URL` points at:

```bash
psql "$DATABASE_URL" -f database/migrations/002_create_lead_tables.sql
```

`001_create_phone_otps.sql` is no longer needed. OTP verification is stateless
(see below) and never touches the database; the file is kept only so existing
deployments can drop the table deliberately rather than have it vanish.

## How OTP verification works

Codes are never stored — not in the database, not in memory, not anywhere.
`send-otp` generates a code, sends it over WhatsApp, and sets an httpOnly
cookie holding an HMAC of (phone + code + expiry). `verify-otp` re-derives that
HMAC from whatever the user types: the right code reproduces the signature, a
wrong one cannot, and the cookie cannot be forged without `OTP_SECRET`. The
challenge is single-use and expires after five minutes.

This means the OTP flow has no database dependency and works on any host as
soon as the WhatsApp variables are set.

Check the connection and schema at any time via `GET /api/health/database`,
which returns `{"status":"ok"}` when the app can reach Postgres.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
