// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/waitlist",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/waitlist(.*)",
]);

export default clerkMiddleware((auth, req) => {
  if (isPublicRoute(req)) return;
  auth().protect(); // Protect all other routes
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
