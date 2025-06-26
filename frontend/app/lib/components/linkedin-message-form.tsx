"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";

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
import { Textarea } from "@components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import {
    linkedInProfileSchema,
    type LinkedInProfileFormData,
} from "@lib/validations";
import { useEffect, useState } from "react";
import type { LeadViewInterface } from "../types";

interface LinkedInMessageFormProps {
    open: boolean;
    onClose: () => void;
    profile?: LeadViewInterface;
}

export function LinkedInMessageForm({
    open,
    onClose,
    profile,
}: LinkedInMessageFormProps) {
    const [generatedMessage, setGeneratedMessage] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);

    const defaultProfileValues: LinkedInProfileFormData = {
        name: "John Smith",
        job_title: "Senior Software Engineer",
        company: "TechCorp Solutions",
        location: "San Francisco, CA",
        summary:
            "Experienced software engineer with 8+ years in full-stack development. Passionate about building scalable web applications and leading development teams. Currently focused on React, Node.js, and cloud architecture.",
    };
    

    const form = useForm<LinkedInProfileFormData>({
        resolver: zodResolver(linkedInProfileSchema),
        defaultValues: defaultProfileValues,

    });

    useEffect(() => {
        if (profile) {
            form.reset({
                name: profile.fullName,
                job_title: profile.currentJobTitle,
                company: profile.companyName,
                location: profile.location,
                summary: defaultProfileValues.summary,
            });
        } else {
            form.reset(defaultProfileValues);
        }
    }, [profile, form]);

    const generateMessage = async (profile: LinkedInProfileFormData) => {
        setIsGenerating(true);
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/personalized-message`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(profile),
                }
            );
            if (!response.ok) {
                const err = await response.text();
                throw new Error(`Failed to generate LinkedIn message: ${err}`);
            }
            const data = await response.json();
            setGeneratedMessage(data.message);
            toast.success("LinkedIn message generated successfully!");
        } catch (error) {
            console.error("Error generating LinkedIn message:", error);
            toast.error("Failed to generate LinkedIn message");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleClose = () => {
        onClose();
        form.reset();
        setGeneratedMessage("");
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5" />
                        LinkedIn Message Generator
                    </DialogTitle>
                    <DialogDescription>
                        Enter LinkedIn profile details to generate a
                        personalized outreach message.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-6">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(generateMessage)}
                            className="space-y-4"
                        >
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name *</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter full name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="job_title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Job Title *</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter job title"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="company"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Company *</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter company name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Location *</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter location"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="summary"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Professional Summary *
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Enter professional summary"
                                                className="min-h-[100px]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                disabled={isGenerating}
                                className="w-full"
                            >
                                {isGenerating ? (
                                    <>
                                        <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                                        Generating Message...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="mr-2 h-4 w-4" />
                                        Generate LinkedIn Message
                                    </>
                                )}
                            </Button>
                        </form>
                    </Form>

                    {generatedMessage && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    Generated Message
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Textarea
                                    value={generatedMessage}
                                    onChange={(e) =>
                                        setGeneratedMessage(e.target.value)
                                    }
                                    className="min-h-[200px] font-mono text-sm"
                                    placeholder="Generated message will appear here..."
                                />
                                <div className="flex gap-2 mt-4">
                                    <Button
                                        onClick={() => {
                                            navigator.clipboard.writeText(
                                                generatedMessage
                                            );
                                            toast.success(
                                                "Message copied to clipboard!"
                                            );
                                        }}
                                        variant="outline"
                                    >
                                        Copy Message
                                    </Button>
                                    <Button onClick={handleClose}>Done</Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
