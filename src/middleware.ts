export { auth as middleware } from "@/auth";

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  // https://learn.microsoft.com/en-us/azure/static-web-apps/deploy-nextjs-hybrid#configure-routing-and-middleware-for-deployment
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*.swa|auth$).*)"],
};
