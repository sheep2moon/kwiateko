"use server";
// import { getIronSession } from "iron-session";
// import { cookies } from "next/headers";
// import { signInSchema, signUpSchema } from "@/zod-schemas";
// import { db } from "../../db/db";
// import { user } from "../../db/schema/users";
// import bcrypt from "bcrypt";
// import { redirect } from "next/navigation";
// import { eq } from "drizzle-orm";
// import { FormState } from ".";
// import { auth } from "../../lib/auth";
// export const getSession = async () => {
//     const cookieStore = await cookies();
//     const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
//     if (!session.isLoggedIn) {
//         session.isLoggedIn = defaultSession.isLoggedIn;
//     }
//     return session;
// };

// export async function onSignUpSubmitAction(prevState: FormState, data: FormData) {
//     const formData = Object.fromEntries(data);
//     const parsed = await signUpSchema.safeParseAsync(formData);
//     if (parsed.success){
//         auth.api.signUpEmail(parsed.data.email, parsed.data.password);
//     }

//     redirect("/sign-in");
// }

// export async function onLoginSubmitAction(prevState: FormState, data: FormData) {
//     const formData = Object.fromEntries(data);
//     const parsed = await signInSchema.safeParseAsync(formData);
//     if (!parsed.success) {
//         return {
//             message: "Nieprawidłowe dane.",
//             fields: parsed.data
//         };
//     }

//     const session = await getSession();

//     const db_users = await db.select().from(users).where(eq(users.email, parsed.data.email));
//     if (db_users.length === 0) {
//         return { message: "Nie znaleziono takiego użytkownika.", fields: parsed.data };
//     }
//     const user = db_users[0];
//     const is_valid = await bcrypt.compare(parsed.data.password, user.password);

//     if (!is_valid) {
//         return { message: "Nieprawidłowe dane.", fields: parsed.data };
//     }

//     session.userId = user.id;
//     session.username = user.username;
//     session.isLoggedIn = true;
//     session.isModerator = user.isModerator;
//     await session.save();
//     redirect("/");
// }

// export async function onLogoutAction() {
//     const session = await getSession();
//     session.destroy();
//     redirect("/");
// }
