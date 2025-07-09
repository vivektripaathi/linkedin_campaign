"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useAuthContext } from "@lib/providers/auth-provider";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@components/ui/form";

import { toast } from "sonner";
import { ROUTES } from "~/routes";

const baseSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = baseSchema.extend({
    name: z.string().min(2, "Name is required"),
});

type LoginFormData = z.infer<typeof baseSchema>;
type SignupFormData = z.infer<typeof signupSchema>;

enum AuthMode {
    LOGIN = "login",
    SIGNUP = "signup",
}

export function LoginSignupForm() {
    const { refreshUser } = useAuthContext();
    const [mode, setMode] = useState<AuthMode>(AuthMode.LOGIN);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const isSignup = mode === AuthMode.SIGNUP;

    const form = useForm<LoginFormData | SignupFormData>({
        resolver: zodResolver(isSignup ? signupSchema : baseSchema),
        defaultValues: isSignup
            ? { email: "", name: "", password: "" }
            : { email: "jamierowe@campaign-pro.com", password: "password" },
    });

    useEffect(() => {
        if (isSignup) {
            form.reset({
                email: "",
                name: "",
                password: "",
            });
        } else {
            form.reset({
                email: "jamierowe@campaign-pro.com",
                password: "password",
            });
        }
    }, [isSignup]); // Trigger reset when mode changes

    const onSubmit = async (data: LoginFormData | SignupFormData) => {
        try {
            setIsSubmitting(true);
            const endpoint = `${import.meta.env.VITE_API_BASE_URL}/api/users/${
                isSignup ? AuthMode.SIGNUP : AuthMode.LOGIN
            }`;

            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            console.log(res);

            const result = await res.json();

            if (!res.ok) {
                toast.error(result.message || "Something went wrong");
                return;
            }

            if (result.access_token) {
                Cookies.set("token", result.access_token, { expires: 7 });
                refreshUser();
                toast.success(
                    `Welcome! ${
                        mode === AuthMode.LOGIN ? "Logged in" : "Signed up"
                    } successfully.`
                );
                navigate(ROUTES.CAMPAIGNS);
            } else {
                throw new Error("Token missing in response");
            }
        } catch (err: any) {
            toast.error(err.message || "Authentication failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-md w-full mx-auto mt-16 p-6 rounded-xl border shadow-sm space-y-6">
            <h1 className="text-2xl font-semibold text-center">
                {isSignup ? "Create a new account" : "Log in to your account"}
            </h1>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-5"
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="you@example.com"
                                        {...field}
                                        disabled={isSubmitting}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {isSignup && (
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Your full name"
                                            {...field}
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        {...field}
                                        disabled={isSubmitting}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                    >
                        {isSubmitting
                            ? isSignup
                                ? "Signing up..."
                                : "Logging in..."
                            : isSignup
                            ? "Sign Up"
                            : "Log In"}
                    </Button>
                </form>
            </Form>

            <div className="text-center text-sm">
                {isSignup
                    ? "Already have an account?"
                    : "Don't have an account?"}{" "}
                <button
                    type="button"
                    className="text-blue-600 hover:underline"
                    onClick={() => {
                        setMode(isSignup ? AuthMode.LOGIN : AuthMode.SIGNUP);
                    }}
                >
                    {isSignup ? "Log In" : "Sign Up"}
                </button>
            </div>
        </div>
    );
}
