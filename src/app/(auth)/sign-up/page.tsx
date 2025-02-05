"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signUpSchema } from "@/zod-schemas";
import { z } from "zod";
import { authClient } from "../../../lib/auth-client";

type FormDataType = z.output<typeof signUpSchema>;

export default function SignUp() {
    const form = useForm<FormDataType>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: ""
        }
    });

    const onSubmit = async (data: FormDataType) => {
        const auth = await authClient.signUp.email({
            email: data.email,
            password: data.password,
            name: "test",
            image: "s"
        });
        if (auth.error) {
            console.log(auth.error);
        } else {
            console.log(auth.data);
        }
    };

    return (
        <div className="mx-auto my-auto">
            <Form {...form}>
                <form className="flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Email" />
                                    </FormControl>
                                    <FormDescription>Wprowadź swój adres e-mail.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Hasło</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} placeholder="" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Powtórz Hasło</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} placeholder="" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit">Zarejestruj</Button>
                </form>
            </Form>
        </div>
    );
}
