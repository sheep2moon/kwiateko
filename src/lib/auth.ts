// import { SessionOptions } from "iron-session";
// import { env } from "@/env";
import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins/admin";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/db";
import { env } from "../env";
import { schema } from "../db/schema";
// export interface SessionData {
//     userId?: string;
//     username?: string;
//     imgUrl?: string;
//     isModerator?: boolean;
//     isLoggedIn: boolean;
// }

// export const defaultSession: SessionData = {
//     isLoggedIn: false
// };

// export const sessionOptions: SessionOptions = {
//     password: env.SESSION_SECRET_PASSWORD,
//     cookieName: "kwiateko-session",
//     cookieOptions: {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production"
//     }
// };

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            ...schema
        }
    }),
    emailAndPassword: {
        enabled: true
    },
    socialProviders: {
        google: {
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET
        }
    },
    plugins: [admin()]
});
