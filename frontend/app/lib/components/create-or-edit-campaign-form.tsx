"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import startCase from "lodash/startCase";
import { useEffect } from "react";
import { Button } from "@components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@components/ui/dialog";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { Textarea } from "@components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@components/ui/select";
import { campaignSchema, type CampaignFormData } from "@lib/validations";
import { CampaignStatus, type CampaignViewInterface } from "@lib/types";

interface CampaignFormProps {
    open: boolean;
    campaign?: CampaignViewInterface;
    onClose: () => void;
    onSubmit: (campaign: CampaignFormData) => void;
}

export function CreateOrEditCampaignForm({
    open,
    campaign,
    onClose,
    onSubmit,
}: CampaignFormProps) {
    const form = useForm<CampaignFormData>({
        resolver: zodResolver(campaignSchema),
        defaultValues: {
            name: campaign?.name || "",
            description: campaign?.description || "",
            status: campaign?.status || CampaignStatus.ACTIVE,
            leads:
                campaign?.leads && campaign?.leads.length > 0
                    ? campaign.leads
                    : [""],
            accountIDs:
                campaign?.accountIDs && campaign?.accountIDs.length > 0
                    ? campaign.accountIDs
                    : [""],
        },
    });

    useEffect(() => {
        if (campaign) {
            form.reset({
                name: campaign.name || "",
                description: campaign.description || "",
                status: campaign.status || CampaignStatus.ACTIVE,
                leads:
                    campaign.leads && campaign.leads.length > 0
                        ? campaign.leads
                        : [""],
                accountIDs:
                    campaign.accountIDs && campaign.accountIDs.length > 0
                        ? campaign.accountIDs
                        : [""],
            });
        } else {
            form.reset({
                name: "",
                description: "",
                status: CampaignStatus.ACTIVE,
                leads: [""],
                accountIDs: [""],
            });
        }
    }, [campaign, form]);

    const {
        fields: leadFields,
        append: appendLead,
        remove: removeLead,
    } = useFieldArray({
        control: form.control,
        name: "leads" as never,
    });

    const {
        fields: accountFields,
        append: appendAccount,
        remove: removeAccount,
    } = useFieldArray({
        control: form.control,
        name: "accountIDs" as never,
    });

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {campaign ? "Edit Campaign" : "Create New Campaign"}
                    </DialogTitle>
                    <DialogDescription>
                        {campaign
                            ? "Update your campaign details below."
                            : "Fill in the details to create a new campaign."}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Campaign Name *</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter campaign name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description *</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter campaign description"
                                            className="min-h-[100px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status *</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Object.values(CampaignStatus).map(
                                                (status) => (
                                                    <SelectItem
                                                        key={status}
                                                        value={status}
                                                    >
                                                        {startCase(status)}
                                                    </SelectItem>
                                                )
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="space-y-4">
                            <div>
                                <FormLabel>LinkedIn Leads *</FormLabel>
                                <FormDescription>
                                    Add LinkedIn profile URLs for your campaign
                                    leads
                                </FormDescription>
                            </div>
                            {leadFields.map((field, index) => (
                                <FormField
                                    key={field.id}
                                    control={form.control}
                                    name={`leads.${index}`}
                                    render={({ field: fieldProps }) => (
                                        <FormItem>
                                            <div className="flex gap-2">
                                                <FormControl>
                                                    <Input
                                                        placeholder="https://linkedin.com/in/username"
                                                        {...fieldProps}
                                                    />
                                                </FormControl>
                                                {leadFields.length > 1 && (
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() =>
                                                            removeLead(index)
                                                        }
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                )}
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => appendLead("")}
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Add Lead
                            </Button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <FormLabel>Account IDs *</FormLabel>
                                <FormDescription>
                                    Add account identifiers for this campaign
                                </FormDescription>
                            </div>
                            {accountFields.map((field, index) => (
                                <FormField
                                    key={field.id}
                                    control={form.control}
                                    name={`accountIDs.${index}`}
                                    render={({ field: fieldProps }) => (
                                        <FormItem>
                                            <div className="flex gap-2">
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter account ID"
                                                        {...fieldProps}
                                                    />
                                                </FormControl>
                                                {accountFields.length > 1 && (
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() =>
                                                            removeAccount(index)
                                                        }
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                )}
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => appendAccount("")}
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Add Account ID
                            </Button>
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                            >
                                Cancel
                            </Button>
                            <Button type="submit">
                                {campaign
                                    ? "Update Campaign"
                                    : "Create Campaign"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
