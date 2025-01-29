"use server";
import { defaultSession, SessionData, sessionOptions } from "@/lib/auth";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { signInSchema, signUpSchema } from "@/zod-schemas";
import { db } from "../../db/db";
import { users } from "../../db/schema/users";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { FormState } from ".";
export const getSession = async () => {
    const cookieStore = await cookies();
    const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
    if (!session.isLoggedIn) {
        session.isLoggedIn = defaultSession.isLoggedIn;
    }
    return session;
};

export async function onSignUpSubmitAction(prevState: FormState, data: FormData) {
    const formData = Object.fromEntries(data);
    const parsed = await signUpSchema.safeParseAsync(formData);

    if (!parsed.success) {
        return {
            message: "Nieprawidłowe dane.",
            fields: parsed.data
        };
    }

    bcrypt.hash(parsed.data.password, 10, async function (err, hash) {
        if (err) {
            console.log(err);
            return {
                message: "Wystąpił błąd, spróbuj ponownie.",
                fields: parsed.data
            };
        }
        await db.insert(users).values({
            email: parsed.data.email,
            username: parsed.data.email,
            imgUrl: "https://www.pngitem.com/pimgs/m/421-4213053_default-avatar-icon-hd-png-download.png",
            password: hash,
            isModerator: false
        });
    });
    redirect("/sign-in");
}

export async function onLoginSubmitAction(prevState: FormState, data: FormData) {
    const formData = Object.fromEntries(data);
    const parsed = await signInSchema.safeParseAsync(formData);
    if (!parsed.success) {
        return {
            message: "Nieprawidłowe dane.",
            fields: parsed.data
        };
    }

    const session = await getSession();

    const db_users = await db.select().from(users).where(eq(users.email, parsed.data.email));
    if (db_users.length === 0) {
        return { message: "Nie znaleziono takiego użytkownika.", fields: parsed.data };
    }
    const user = db_users[0];
    const is_valid = await bcrypt.compare(parsed.data.password, user.password);

    if (!is_valid) {
        return { message: "Nieprawidłowe dane.", fields: parsed.data };
    }

    session.userId = user.id;
    session.username = user.username;
    session.isLoggedIn = true;
    session.isModerator = user.isModerator;
    await session.save();
    redirect("/");
}

export async function onLogoutAction() {
    const session = await getSession();
    session.destroy();
    redirect("/");
}
