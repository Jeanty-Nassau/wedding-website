import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const rsvpStatus = {
  PENDING: "PENDING",
  ATTENDING: "ATTENDING",
  DECLINED: "DECLINED",
} as const;

const mealChoice = {
  BEEF_FILLET: "BEEF_FILLET",
  PRAWN_LINGUINE: "PRAWN_LINGUINE",
  VEGETARIAN: "VEGETARIAN",
  KIDS_MEAL: "KIDS_MEAL",
} as const;

const demoInvitations = [
  {
    id: "demo-invitation-1",
    guests: [
      {
        id: "demo-guest-olivia",
        name: "Olivia Bennett",
        rsvpStatus: rsvpStatus.ATTENDING,
        mealChoice: mealChoice.BEEF_FILLET,
        dietaryRequirements: "Nut allergy",
      },
      {
        id: "demo-guest-noah",
        name: "Noah Bennett",
        rsvpStatus: rsvpStatus.PENDING,
        mealChoice: null,
        dietaryRequirements: null,
      },
    ],
  },
  {
    id: "demo-invitation-2",
    guests: [
      {
        id: "demo-guest-maya",
        name: "Maya Thompson",
        rsvpStatus: rsvpStatus.DECLINED,
        mealChoice: null,
        dietaryRequirements: null,
      },
      {
        id: "demo-guest-ethan",
        name: "Ethan Thompson",
        rsvpStatus: rsvpStatus.ATTENDING,
        mealChoice: mealChoice.PRAWN_LINGUINE,
        dietaryRequirements: null,
      },
      {
        id: "demo-guest-sophie",
        name: "Sophie Thompson",
        rsvpStatus: rsvpStatus.ATTENDING,
        mealChoice: mealChoice.KIDS_MEAL,
        dietaryRequirements: "Vegetarian options preferred",
      },
    ],
  },
];

async function main() {
  for (const invitation of demoInvitations) {
    await prisma.invitation.upsert({
      where: { id: invitation.id },
      update: { clerkUserId: null, isDemo: true },
      create: { id: invitation.id, isDemo: true },
    });

    for (const guest of invitation.guests) {
      await prisma.guest.upsert({
        where: { id: guest.id },
        create: {
          ...guest,
          invitationId: invitation.id,
        },
        update: { invitationId: invitation.id },
      });
    }
  }

  console.info("Ensured deterministic fictional demo invitations exist.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async () => {
    console.error("Failed to seed fictional demo data.");
    await prisma.$disconnect();
    process.exit(1);
  });
