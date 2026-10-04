import { expect, test } from "@playwright/test";

test("recruiter can save and reload a fictional RSVP", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Explore Demo" }).click();
  await expect(page).toHaveURL(/\/home$/);

  await page.getByRole("button", { name: "RSVP ↗" }).click();
  await expect(page).toHaveURL(/\/rsvp$/);

  const guestId = "demo-guest-noah";
  const attendance = page.locator(`#attendance-${guestId}`);
  const meal = page.locator(`#meal-${guestId}`);
  const dietaryNotes = page.locator(`#diet-${guestId}`);

  await expect(page.getByRole("heading", { name: "Noah Bennett" })).toBeVisible();
  await expect(meal).toHaveValue("");
  await attendance.selectOption("ATTENDING");
  await meal.selectOption("VEGETARIAN");
  await dietaryNotes.fill("Please serve the plant-based option.");
  await page.getByRole("button", { name: "Save RSVP for Noah Bennett" }).click();

  await expect(page.getByText("RSVP saved successfully.")).toBeVisible();
  await page.reload();

  await expect(attendance).toHaveValue("ATTENDING");
  await expect(meal).toHaveValue("VEGETARIAN");
  await expect(dietaryNotes).toHaveValue("Please serve the plant-based option.");
});
