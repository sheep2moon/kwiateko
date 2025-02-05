"use client";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { signInSchema } from "@/zod-schemas/credentialsSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { authClient } from "../../../lib/auth-client";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import GoogleLogo from "../../../assets/icons/GoogleIcon";

type FormDataType = z.output<typeof signInSchema>;

export default function SignIn() {
    const form = useForm<FormDataType>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = async (data: FormDataType) => {
        const auth = await authClient.signIn.email({
            email: data.email,
            password: data.password
        });
        if (auth.error) {
            console.log(auth.error);
        } else {
            console.log(auth.data);
        }
    };

    const handleGoogleSignIn = () => {
        authClient.signIn.social({ provider: "google" });
    };

    return (
        <div className="mx-auto my-auto">
            <Card className="">
                <CardHeader>
                    <CardTitle className="text-3xl">Logowanie</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
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
                        </form>
                    </Form>
                    <div className="flex flex-col gap-2 mt-4">
                        <Button variant="outline" onClick={handleGoogleSignIn}>
                            <GoogleLogo />
                            Zaloguj za pomocą Google
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
