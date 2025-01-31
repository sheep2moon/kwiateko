"use client";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { signInSchema } from "@/zod-schemas/credentialsSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormState, onLoginSubmitAction } from "@/app/actions";
import { startTransition, useActionState, useRef } from "react";

export default function SignIn() {
    const formRef = useRef<HTMLFormElement>(null);
    const [state, formAction] = useActionState<FormState, FormData>(onLoginSubmitAction, { message: "" });
    const form = useForm<z.output<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
            ...(state?.fields ?? {})
        }
    });

    return (
        <Form {...form}>
            <form
                ref={formRef}
                action={formAction}
                onSubmit={event => {
                    event.preventDefault();
                    form.handleSubmit(() => {
                        startTransition(() => formAction(new FormData(formRef.current!)));
                    })(event);
                }}
            >
                <div>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Email" />
                                </FormControl>

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
                </div>
                <Button type="submit">Zaloguj</Button>
                <p>{state.message && state.message}</p>
            </form>
        </Form>
    );
}
