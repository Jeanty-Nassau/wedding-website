import { auth } from "@clerk/nextjs";
import { TRPCError, initTRPC } from "@trpc/server";
import { type NextRequest } from "next/server";
import superjson from "superjson";
import { ZodError } from "zod";

import { getDemoViewerFromRequest, type Viewer } from "../demo";
import { db } from "../db";

export const createTRPCContext = (opts: { req: NextRequest }) => {
  const demoViewer = getDemoViewerFromRequest(opts.req);
  const clerkState = demoViewer ? null : auth();
  const viewer: Viewer | null = demoViewer ??
    (clerkState?.userId ? { type: "clerk", userId: clerkState.userId } : null);

  return {
    headers: opts.req.headers,
    db,
    viewer,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

const enforceViewer = t.middleware(({ ctx, next }) => {
  if (!ctx.viewer) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      ...ctx,
      viewer: ctx.viewer,
    },
  });
});

export const protectedProcedure = t.procedure.use(enforceViewer);
export const privateProcedure = protectedProcedure;
