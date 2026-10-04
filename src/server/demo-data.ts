import {
  MealChoice,
  Prisma,
  RsvpStatus,
  type PrismaClient,
} from "@prisma/client";

import { DEMO_INVITATION_ID } from "./demo";

type DemoDb = Pick<
  PrismaClient,
  "invitation" | "guest" | "$executeRawUnsafe"
>;

const demoGuests = [
  {
    id: "demo-guest-olivia",
    name: "Olivia Bennett",
    rsvpStatus: RsvpStatus.ATTENDING,
    mealChoice: MealChoice.BEEF_FILLET,
    dietaryRequirements: "Nut allergy",
  },
  {
    id: "demo-guest-noah",
    name: "Noah Bennett",
    rsvpStatus: RsvpStatus.PENDING,
    mealChoice: null,
    dietaryRequirements: null,
  },
] as const;

async function ensureDemoSchema(db: DemoDb) {
  await db.$executeRawUnsafe(`
    DO $$
    BEGIN
      CREATE TYPE "RsvpStatus" AS ENUM ('PENDING', 'ATTENDING', 'DECLINED');
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END
    $$;
  `);

  await db.$executeRawUnsafe(`
    DO $$
    BEGIN
      CREATE TYPE "MealChoice" AS ENUM ('BEEF_FILLET', 'PRAWN_LINGUINE', 'VEGETARIAN', 'KIDS_MEAL');
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END
    $$;
  `);

  await db.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "Invitation" (
      "id" TEXT NOT NULL,
      "clerkUserId" TEXT,
      "isDemo" BOOLEAN NOT NULL DEFAULT false,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "Invitation_pkey" PRIMARY KEY ("id")
    );
  `);

  await db.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "Guest" (
      "id" TEXT NOT NULL,
      "invitationId" TEXT NOT NULL,
      "name" TEXT NOT NULL,
      "rsvpStatus" "RsvpStatus" NOT NULL DEFAULT 'PENDING',
      "mealChoice" "MealChoice",
      "dietaryRequirements" TEXT,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "Guest_pkey" PRIMARY KEY ("id")
    );
  `);

  await db.$executeRawUnsafe(
    'CREATE UNIQUE INDEX IF NOT EXISTS "Invitation_clerkUserId_key" ON "Invitation"("clerkUserId");',
  );

  await db.$executeRawUnsafe(
    'CREATE INDEX IF NOT EXISTS "Guest_invitationId_idx" ON "Guest"("invitationId");',
  );

  await db.$executeRawUnsafe(`
    DO $$
    BEGIN
      ALTER TABLE "Guest"
        ADD CONSTRAINT "Guest_invitationId_fkey"
        FOREIGN KEY ("invitationId")
        REFERENCES "Invitation"("id")
        ON DELETE CASCADE
        ON UPDATE CASCADE;
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END
    $$;
  `);
}

async function upsertDemoInvitation(db: DemoDb) {
  await db.invitation.upsert({
    where: { id: DEMO_INVITATION_ID },
    update: {
      clerkUserId: null,
      isDemo: true,
    },
    create: {
      id: DEMO_INVITATION_ID,
      isDemo: true,
    },
  });

  await db.guest.createMany({
    data: demoGuests.map((guest) => ({
      ...guest,
      invitationId: DEMO_INVITATION_ID,
    })),
    skipDuplicates: true,
  });
}

export async function ensureDemoInvitation(db: DemoDb) {
  try {
    await upsertDemoInvitation(db);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2021"
    ) {
      await ensureDemoSchema(db);
      await upsertDemoInvitation(db);
      return;
    }

    throw error;
  }
}
