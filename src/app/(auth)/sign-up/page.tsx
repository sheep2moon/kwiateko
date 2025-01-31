"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormState, onSignUpSubmitAction } from "@/app/actions";
import { signUpSchema } from "@/zod-schemas";
import { z } from "zod";

export default function SignUp() {
    const formRef = useRef<HTMLFormElement>(null);
    const [state, formAction] = useActionState<FormState, FormData>(onSignUpSubmitAction, { message: "" });

    const form = useForm<z.output<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
            ...(state?.fields ?? {})
        }
    });

    return (
        <div className="max-w-xl mx-auto mt-16">
            <Form {...form}>
                <form
                    className="flex flex-col gap-2"
                    ref={formRef}
                    action={formAction}
                    onSubmit={event => {
                        event.preventDefault();
                        form.handleSubmit(() => {
                            startTransition(() => formAction(new FormData(formRef.current!)));
                        })(event);
                    }}
                >
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
                    <p>{state.message && state.message}</p>
                </form>
            </Form>
        </div>
    );
}
