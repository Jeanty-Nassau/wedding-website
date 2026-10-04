import { TRPCError } from "@trpc/server";
import { MealChoice, RsvpStatus } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { DEMO_INVITATION_ID } from "../../demo";

export const guestUpdateSchema = z
  .object({
    guestId: z.string().min(1),
    rsvpStatus: z.nativeEnum(RsvpStatus),
    mealChoice: z
      .nativeEnum(MealChoice)
      .nullable()
      .optional(),
    dietaryRequirements: z
      .string()
      .trim()
      .max(500)
      .nullable()
      .optional(),
  })
  .superRefine((input, ctx) => {
    if (input.rsvpStatus === RsvpStatus.DECLINED && input.mealChoice) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["mealChoice"],
        message: "A declined RSVP cannot include a meal selection.",
      });
    }

    if (input.rsvpStatus === RsvpStatus.ATTENDING && !input.mealChoice) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["mealChoice"],
        message: "An attending guest must select a meal.",
      });
    }
  });

async function resolveInvitationId(ctx: {
  viewer: { type: "clerk" | "demo"; userId?: string; invitationId?: string };
  db: typeof import("../../db").db;
}) {
  if (ctx.viewer.type === "demo") {
    return DEMO_INVITATION_ID;
  }

  const userId = ctx.viewer.userId;
  if (!userId) {
    throw new TRPCError({ code: "FORBIDDEN" });
  }

  const invitation = await ctx.db.invitation.findUnique({
    where: { clerkUserId: userId },
    select: { id: true },
  });

  if (!invitation) {
    throw new TRPCError({ code: "FORBIDDEN" });
  }

  return invitation.id;
}

export const rsvpRouter = createTRPCRouter({
  getUserGuests: protectedProcedure.query(async ({ ctx }) => {
    const invitationId = await resolveInvitationId(ctx);

    return ctx.db.guest.findMany({
      where: { invitationId },
      select: {
        id: true,
        name: true,
        rsvpStatus: true,
        mealChoice: true,
        dietaryRequirements: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  }),

  updateGuest: protectedProcedure
    .input(guestUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      const invitationId = await resolveInvitationId(ctx);

      const existingGuest = await ctx.db.guest.findFirst({
        where: {
          id: input.guestId,
          invitationId,
        },
        select: { id: true },
      });

      if (!existingGuest) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const normalizedMealChoice =
        input.rsvpStatus === RsvpStatus.DECLINED ? null : input.mealChoice ?? null;
      const normalizedDiet =
        input.rsvpStatus === RsvpStatus.DECLINED
          ? null
          : (() => {
              const trimmed = input.dietaryRequirements?.trim();
              return trimmed?.length ? trimmed : null;
            })();

      return ctx.db.guest.update({
        where: { id: existingGuest.id },
        data: {
          rsvpStatus: input.rsvpStatus,
          mealChoice: normalizedMealChoice,
          dietaryRequirements: normalizedDiet,
        },
      });
    }),
});
