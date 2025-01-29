import { SessionOptions } from "iron-session";
import { env } from "@/env";

export interface SessionData {
    userId?: string;
    username?: string;
    imgUrl?: string;
    isModerator?: boolean;
    isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
    isLoggedIn: false
};

export const sessionOptions: SessionOptions = {
    password: env.SESSION_SECRET_PASSWORD,
    cookieName: "kwiateko-session",
    cookieOptions: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    }
};
