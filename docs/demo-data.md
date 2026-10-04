# Demo Data

The application is Jeanty and Trinesha's real wedding website. Their identity, story, and personal imagery are intentionally preserved as part of the project's meaning. The placeholder event schedule and all interactive guest/account/RSVP data in this public portfolio demo are fictional and are not connected to the real wedding guest list.

The seed creates two fixed demo invitations and five fictional guests: Olivia and Noah Bennett, plus Maya, Ethan, and Sophie Thompson. It includes representative pending, attending, and declined responses, meal choices, and fictional dietary notes. `prisma/seed.ts` uses stable identifiers and upserts missing invitations/guests without overwriting existing guest names, RSVP responses, meals, or dietary notes.

The demo cookie always maps server-side to `demo-invitation-1`. No browser-provided invitation ID or guest-to-invitation relationship is trusted. The recruiter demo is public and writable; changes persist in the configured PostgreSQL database across deployments. Vercel runs the additive seed during deployment to ensure required fictional rows exist; it does not reset recruiter edits.

Do not place real names, invitations, dietary requirements, contact details, credentials, or addresses in the demo database. Do not use demo seed values as production guest data.
