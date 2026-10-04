import { MealChoice, RsvpStatus, type PrismaClient } from "@prisma/client";

import { DEMO_INVITATION_ID } from "./demo";

type DemoDb = Pick<PrismaClient, "invitation" | "guest">;

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

export async function ensureDemoInvitation(db: DemoDb) {
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
