# Security Model

## Untrusted Browser

Treat every browser value as untrusted, including guest IDs, RSVP status, meal choice, dietary text, cookies, and hidden form fields. The client may request a mutation, but it cannot prove who owns the requested record.

> Authentication identifies the caller. Authorization determines which invitation and guest records that caller may access.

> Client-provided guest IDs identify resources but never establish ownership.

## Clerk Identity

For signed-in users, the server derives the caller's Clerk user ID from Clerk's verified request context. The server looks up the invitation using that ID. Client input cannot supply or override the owner ID.

## Demo Viewer

`GET /api/demo` sets an HTTP-only, SameSite=Lax cookie. It uses `Secure` in production and is scoped to `/`. The cookie value only selects demo mode; it is not a signed credential and contains no invitation ID. The server maps every demo viewer to the fixed fictional demo invitation. Forging the marker can expose only that public demo data, not another invitation. `DEMO_SESSION_SECRET` is not used and is intentionally absent.

The GitHub Actions Playwright job sets `E2E_DEMO_MODE=true` so the public demo can be exercised with fake Clerk keys and no authenticated browser session. This test-only setting bypasses Clerk middleware in CI; it is not configured for Vercel or documented as a production option. The tRPC procedures still require a resolved demo/Clerk viewer, and demo identity still requires the fixed demo cookie.

## Invitation Ownership And BOLA/IDOR

A Broken Object Level Authorization (BOLA/IDOR) attack would submit a valid guest ID belonging to another invitation. `updateGuest` first resolves the authorized invitation, then searches for the requested guest with both `id` and `invitationId`. If that pair does not exist, it returns `NOT_FOUND` and does not update the record. Guest-list reads are similarly scoped to the resolved invitation.

The authorization integration test creates two separate invitations and verifies that viewer A can update guest A, cannot update guest B, and leaves guest B unchanged. It also verifies fixed demo access and rejection of an unauthenticated caller.

## Validation And Response Minimization

Zod validates status, meal choice, status/meal combinations, and the 500-character dietary-note limit. Prisma enums provide a second domain constraint at the database layer. Guest queries return only the fields needed by the RSVP screen; they do not include invitation ownership metadata or unrelated records.

Dietary requirements can be sensitive personal information. The application does not log RSVP payloads, dietary content, tokens, Clerk secrets, or database URLs. Keep database and Clerk secrets server-side. Public demo guest, account, and RSVP records are fictional and must not be connected to real invitation records; the couple, wedding story, and visual identity are real.

## Operational Limits

The public demo is intentionally writable and is not a private production RSVP system. Before using a similar flow with real users, add appropriate rate limiting, abuse monitoring, operational retention policies, and review the hosting/database access controls.
