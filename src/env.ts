import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
    server: {
        DATABASE_URL: z.string().url(),
        AUTH_SECRET: z.string(),
        GOOGLE_CLIENT_ID: z.string(),
        GOOGLE_CLIENT_SECRET: z.string(),
        S3_ACCESS_KEY: z.string(),
        S3_SECRET_KEY: z.string(),
        NEXT_PUBLIC_S3_BUCKET_NAME: z.string(),
        NEXT_PUBLIC_S3_REGION: z.string(),
        SESSION_SECRET_PASSWORD: z.string(),
        BETTER_AUTH_SECRET: z.string(),
        BETTER_AUTH_URL: z.string()
    },

    /**
     * The prefix that client-side variables must have. This is enforced both at
     * a type-level and at runtime.
     */
    //   clientPrefix: "PUBLIC_",

    //   client: {
    //     PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
    //   },

    /**
     * What object holds the environment variables at runtime. This is usually
     * `process.env` or `import.meta.env`.
     */
    runtimeEnv: process.env,

    /**
     * By default, this library will feed the environment variables directly to
     * the Zod validator.
     *
     * This means that if you have an empty string for a value that is supposed
     * to be a number (e.g. `PORT=` in a ".env" file), Zod will incorrectly flag
     * it as a type mismatch violation. Additionally, if you have an empty string
     * for a value that is supposed to be a string with a default value (e.g.
     * `DOMAIN=` in an ".env" file), the default value will never be applied.
     *
     * In order to solve these issues, we recommend that all new projects
     * explicitly specify this option as true.
     */
    emptyStringAsUndefined: true
});
