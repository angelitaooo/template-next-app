import NextAuth from "next-auth";
import AzureADB2C from "next-auth/providers/azure-ad-b2c";

const tenantName = process.env.AUTH_AZURE_AD_B2C_TENANT_NAME;

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    AzureADB2C({
      clientId: process.env.AUTH_AZURE_AD_B2C_ID,
      // clientSecret: process.env.AUTH_AZURE_AD_B2C_SECRET,
      issuer: process.env.AUTH_AZURE_AD_B2C_ISSUER,
      token: `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/B2C_1_signup_signin/oauth2/v2.0/token`,
      authorization: {
        url: `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/B2C_1_signup_signin/oauth2/v2.0/authorize`,
        params: {
          scope: "openid offline_access profile email",
          response_type: "code id_token",
          type: "b2c",
          response_mode: "query",
        },
      },
      client: {
        token_endpoint_auth_method: "none", // This tells Azure to treat it as a public client
      },
      wellKnown: `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/b2c_1_signup_signin/v2.0/.well-known/openid-configuration`,
      // checks: ["pkce"],
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.emails?.[0] ?? profile?.email,
        };
      },
      checks: ["pkce", "state"],
    }),
  ],
  //  By default, the `id` property does not exist on `token` or `session`. See the [TypeScript](https://authjs.dev/getting-started/typescript) on how to add it.
  callbacks: {
    jwt({ token, user, account }) {
      console.log("jwt token", token);
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          userId: user.id,
        };
      }
      return token;
    },
    session({ session, token }) {
      console.log("session token", token);
      session.user.id = token.userId;
      session.accessToken = token.accessToken;
      return session;
    },
  },
  // Add these session settings
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  debug: true,
});
