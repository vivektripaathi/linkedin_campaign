"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plug2 } from "lucide-react";

import { Button } from "@components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import {
    createAccountSchema,
    type CreateAccountFormData,
} from "@lib/validations";

interface LinkedInMessageFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (account?: CreateAccountFormData) => Promise<void>;
}

export function CreateAccountForm({
    open,
    onClose,
    onSubmit,
}: LinkedInMessageFormProps) {
    const form = useForm<CreateAccountFormData>({
        resolver: zodResolver(createAccountSchema),
    });

    const handleClose = () => {
        onClose();
        form.reset();
    };

    const handleSubmit = async (data: CreateAccountFormData) => {
        await onSubmit?.(data);
        form.reset();
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Plug2 className="h-5 w-5" />
                        Connect an account
                    </DialogTitle>
                    <DialogDescription>
                        Enter LinkedIn session cookie and your browser's user
                        agent to link and create account.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-6">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(handleSubmit)}
                            className="space-y-4"
                        >
                            <FormField
                                control={form.control}
                                name="sessionCookie"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Session Cookie *</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your li_at or li_a value"
                                                {...field}
                                            />
                                        </FormControl>
                                        <DialogDescription>
                                            Open LinkedIn, log in, open the
                                            developer console, find li_at or
                                            li_a under cookies for linkedin.com,
                                            copy its value, and paste it session
                                            cookie box.
                                        </DialogDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="userAgent"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Job Title *</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your user agent"
                                                {...field}
                                            />
                                        </FormControl>
                                        <DialogDescription>
                                            Search "what is my user agent" on
                                            Google to view your browser’s user
                                            agent string.
                                        </DialogDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full">
                                Create Account
                            </Button>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
