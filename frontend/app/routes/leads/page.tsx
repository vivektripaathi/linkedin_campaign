"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Search } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { DataTable } from "@components/data-table";
import { LinkedInMessageForm } from "@components/linkedin-message-form";
import { createLeadColumns } from "~/lib/components/column-definitions/lead.columns";
import type { LeadViewInterface } from "~/lib/types";

export function Leads() {
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [showLinkedInForm, setShowLinkedInForm] = useState(false);
    const [leads, setLeads] = useState<LeadViewInterface[]>([]);
    const [selectedLead, setSelectedLead] = useState<
        LeadViewInterface | undefined
    >(undefined);
    const fetchLeads = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/leads`
            );
            if (!response.ok) {
                throw new Error("Failed to fetch leads");
            }
            const data = await response.json();

            setLeads(data);
        } catch (error) {
            console.error("Error fetching leads:", error);
            toast.error("Failed to load leads");
        } finally {
            setLoading(false);
        }
    };

    const onCloseLinkedInForm = () => {
        setShowLinkedInForm(false);
        setSelectedLead(undefined);
    };

    const columns = createLeadColumns({
        generateLinkedInMessage: (lead) => {
            setSelectedLead(lead);
            setShowLinkedInForm(true);
        },
    });

    useEffect(() => {
        fetchLeads();
    }, []);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <p className="text-muted-foreground">Loading leads...</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                placeholder="Search leads..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button onClick={() => setShowLinkedInForm(true)}>
                                <MessageSquare /> Generate Message
                            </Button>
                        </div>
                    </div>

                    <DataTable<LeadViewInterface, unknown>
                        columns={columns}
                        data={leads}
                    />
                </div>
            </div>

            <LinkedInMessageForm
                open={showLinkedInForm}
                onClose={onCloseLinkedInForm}
                profile={selectedLead}
            />
        </div>
    );
}
