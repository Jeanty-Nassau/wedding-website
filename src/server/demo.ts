import { type NextRequest } from "next/server";

export const DEMO_COOKIE_NAME = "wedding_demo";
export const DEMO_INVITATION_ID = "demo-invitation-1";

export type Viewer =
  | { type: "clerk"; userId: string }
  | { type: "demo" };

export function getDemoViewerFromRequest(req: NextRequest): Viewer | null {
  if (req.cookies.get(DEMO_COOKIE_NAME)?.value !== "true") {
    return null;
  }

  return { type: "demo" };
}
