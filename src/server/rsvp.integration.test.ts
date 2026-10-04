import { PrismaClient } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";

import { DEMO_INVITATION_ID } from "./demo";
import { rsvpRouter } from "./api/routers/rsvp";

const testDatabaseUrl = process.env.TEST_DATABASE_URL;
const describeWithDatabase = testDatabaseUrl ? describe : describe.skip;
const demoGuestId = "demo-guest-authorization-test";

describeWithDatabase("RSVP authorization with PostgreSQL", () => {
  let prisma: PrismaClient;
  let invitationIds: string[];
  let guestAId: string;
  let guestBId: string;
  let clerkUserAId: string;

  beforeAll(async () => {
    if (!testDatabaseUrl) {
      throw new Error("TEST_DATABASE_URL is required for authorization integration tests.");
    }

    prisma = new PrismaClient({
      datasources: { db: { url: testDatabaseUrl } },
    });
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma?.$disconnect();
  });

  beforeEach(async () => {
    const testRunId = randomUUID();
    clerkUserAId = `viewer-a-${testRunId}`;
    const clerkUserBId = `viewer-b-${testRunId}`;
    guestAId = `guest-a-${testRunId}`;
    guestBId = `guest-b-${testRunId}`;

    const invitationA = await prisma.invitation.create({
      data: {
        clerkUserId: clerkUserAId,
        guests: {
          create: {
            id: guestAId,
            name: "Fictional Guest A",
          },
        },
      },
    });
    const invitationB = await prisma.invitation.create({
      data: {
        clerkUserId: clerkUserBId,
        guests: {
          create: {
            id: guestBId,
            name: "Fictional Guest B",
          },
        },
      },
    });
    invitationIds = [invitationA.id, invitationB.id];
  });

  afterEach(async () => {
    if (invitationIds?.length) {
      await prisma.invitation.deleteMany({
        where: { id: { in: invitationIds } },
      });
    }
  });

  it("allows viewer A to update guest A and rejects guest B without changing it", async () => {
    const callerA = rsvpRouter.createCaller({
      headers: new Headers(),
      db: prisma,
      viewer: { type: "clerk", userId: clerkUserAId },
    });

    await expect(
      callerA.updateGuest({
        guestId: guestAId,
        rsvpStatus: "ATTENDING",
        mealChoice: "VEGETARIAN",
      }),
    ).resolves.toMatchObject({ rsvpStatus: "ATTENDING", mealChoice: "VEGETARIAN" });

    await expect(
      callerA.updateGuest({
        guestId: guestBId,
        rsvpStatus: "ATTENDING",
        mealChoice: "BEEF_FILLET",
      }),
    ).rejects.toMatchObject({ code: "NOT_FOUND" });

    await expect(
      prisma.guest.findUnique({ where: { id: guestBId } }),
    ).resolves.toMatchObject({
      rsvpStatus: "PENDING",
      mealChoice: null,
      dietaryRequirements: null,
    });
  });

  it("allows a demo viewer to update only the fixed demo invitation", async () => {
    await prisma.invitation.upsert({
      where: { id: DEMO_INVITATION_ID },
      create: { id: DEMO_INVITATION_ID, isDemo: true },
      update: { isDemo: true },
    });
    await prisma.guest.upsert({
      where: { id: demoGuestId },
      create: {
        id: demoGuestId,
        invitationId: DEMO_INVITATION_ID,
        name: "Fictional Demo Guest",
      },
      update: { invitationId: DEMO_INVITATION_ID },
    });

    const demoCaller = rsvpRouter.createCaller({
      headers: new Headers(),
      db: prisma,
      viewer: { type: "demo" },
    });

    await expect(
      demoCaller.updateGuest({
        guestId: demoGuestId,
        rsvpStatus: "ATTENDING",
        mealChoice: "KIDS_MEAL",
      }),
    ).resolves.toMatchObject({
      invitationId: DEMO_INVITATION_ID,
      rsvpStatus: "ATTENDING",
      mealChoice: "KIDS_MEAL",
    });
  });

  it("rejects protected operations for an unauthenticated viewer", async () => {
    const anonymousCaller = rsvpRouter.createCaller({
      headers: new Headers(),
      db: prisma,
      viewer: null,
    });

    await expect(anonymousCaller.getUserGuests()).rejects.toMatchObject({
      code: "UNAUTHORIZED",
    });
  });
});
