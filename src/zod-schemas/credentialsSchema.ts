import { z } from "zod";

export const signUpSchema = z
    .object({
        email: z.string().email({ message: "Nieprawidłowy adres e-mail." }),
        password: z.string().min(8, { message: "Hasło musi mieć przynajmniej 8 znaków." }),
        confirmPassword: z.string().min(8, { message: "Potwierdź hasło." })
    })
    .refine(data => data.password === data.confirmPassword, {
        message: "Hasła nie są identyczne.",
        path: ["confirmPassword"]
    });

export const signInSchema = z.object({
    email: z.string().email({ message: "Wprowadź adres e-mail." }),
    password: z.string().min(1, { message: "Wprowadź hasło." })
});
