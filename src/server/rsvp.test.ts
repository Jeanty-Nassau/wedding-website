import { describe, expect, it } from "vitest";

import { guestUpdateSchema } from "./api/routers/rsvp";

describe("guestUpdateSchema", () => {
  const validAttendingInput = {
      guestId: "guest-123",
      rsvpStatus: "ATTENDING",
      mealChoice: "BEEF_FILLET",
      dietaryRequirements: null,
    };

  it("accepts an attending RSVP with a valid meal", () => {
    expect(guestUpdateSchema.safeParse(validAttendingInput).success).toBe(true);
  });

  it("requires a meal when a guest is attending", () => {
    const result = guestUpdateSchema.safeParse({
      ...validAttendingInput,
      mealChoice: null,
    });

    expect(result.success).toBe(false);
    if (result.success) throw new Error("expected validation to fail");
    expect(result.error.issues.some((issue) => issue.path.includes("mealChoice"))).toBe(true);
  });

  it("rejects a declined RSVP with a meal choice", () => {
    const result = guestUpdateSchema.safeParse({
      ...validAttendingInput,
      rsvpStatus: "DECLINED",
    });

    expect(result.success).toBe(false);
    if (result.success) throw new Error("expected validation to fail");
    expect(result.error.issues.some((issue) => issue.path.includes("mealChoice"))).toBe(true);
  });

  it("accepts a declined RSVP without a meal", () => {
    expect(
      guestUpdateSchema.safeParse({
        ...validAttendingInput,
        rsvpStatus: "DECLINED",
        mealChoice: null,
      }).success,
    ).toBe(true);
  });

  it("rejects an invalid RSVP status", () => {
    expect(
      guestUpdateSchema.safeParse({
        ...validAttendingInput,
        rsvpStatus: "MAYBE",
      }).success,
    ).toBe(false);
  });

  it("rejects an invalid meal choice", () => {
    expect(
      guestUpdateSchema.safeParse({
        ...validAttendingInput,
        mealChoice: "PIZZA",
      }).success,
    ).toBe(false);
  });

  it("rejects dietary requirements longer than 500 characters", () => {
    expect(
      guestUpdateSchema.safeParse({
        ...validAttendingInput,
        dietaryRequirements: "x".repeat(501),
      }).success,
    ).toBe(false);
  });
});
