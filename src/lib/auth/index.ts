import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema/index";
import { v4 as uuidv4 } from "uuid";
import {nextCookies} from "better-auth/next-js";

const betterAuthSecret = process.env.BETTER_AUTH_SECRET;
const isBuild = process.env.NEXT_PHASE === "phase-production-build";
const placeholderSecret = "0123456789abcdefghijklmnopqrstuvwxyzabcd"; // 36 chars for build fallback

if (!betterAuthSecret && !isBuild) {
  throw new Error("BETTER_AUTH_SECRET is not set. Define it in your environment or .env.local.");
}

export const auth = betterAuth({
  secret: betterAuthSecret ?? placeholderSecret,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.users,
      session: schema.sessions,
      account: schema.accounts,
      verification: schema.verifications,
    },
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  socialProviders: {},
  sessions: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 7
    }
  },
  cookies: {
    sessionToken: {
      name: "auth_session",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      }
    }
  },
  advanced: {
    database: {
      generateId: () => uuidv4()
    }
  },
  plugins: [nextCookies()]
});
