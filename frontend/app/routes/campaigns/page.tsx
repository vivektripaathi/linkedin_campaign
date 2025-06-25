"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { DataTable } from "@components/data-table";
import { CreateOrEditCampaignForm } from "~/lib/components/create-or-edit-campaign-form";
import { LinkedInMessageForm } from "@components/linkedin-message-form";
import { DeleteConfirmationDialog } from "@components/delete-confirmation-dialog";
import type {
    ICampaign,
    CampaignViewInterface,
    CampaignStatus,
} from "@lib/types";
import type { CampaignFormData } from "@lib/validations";
import { createCampaignColumns } from "~/lib/components/column-definitions/campaign-columns";

export function Campaigns() {
    const [campaigns, setCampaigns] = useState<CampaignViewInterface[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [showCampaignForm, setShowCampaignForm] = useState(false);
    const [showLinkedInForm, setShowLinkedInForm] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [editingCampaign, setEditingCampaign] = useState<
        CampaignViewInterface | undefined
    >(undefined);
    const [deletingCampaign, setDeletingCampaign] = useState<
        CampaignViewInterface | undefined
    >(undefined);

    const _prepareCampaignsForView = (
        campaigns: ICampaign[]
    ): CampaignViewInterface[] =>
        campaigns.map((campaign) => ({
            id: campaign._id,
            name: campaign.name,
            description: campaign.description,
            status: campaign.status,
            leads: campaign.leads,
            accountIDs: campaign.accountIDs,
        }));

    const _prepareUpdateStatusPayload = (
        campaign: CampaignViewInterface,
        status: CampaignStatus
    ): Omit<CampaignViewInterface, "id"> => ({
        name: campaign.name,
        description: campaign.description,
        status: status,
        leads: campaign.leads,
        accountIDs: campaign.accountIDs,
    });

    const fetchCampaigns = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/campaigns`);
            if (!response.ok) {
                throw new Error("Failed to fetch campaigns");
            }
            const data = await response.json();

            setCampaigns(_prepareCampaignsForView(data));
        } catch (error) {
            console.error("Error fetching campaigns:", error);
            toast.error("Failed to load campaigns");
        } finally {
            setLoading(false);
        }
    };

    const createCampaign = async (campaign: CampaignFormData) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/campaigns`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(campaign),
                }
            );

            if (!response.ok) {
                const err = await response.text();
                throw new Error(`Failed to create campaign: ${err}`);
            }

            const data = await response.json();
            const createdCampaign = _prepareCampaignsForView([data])[0];
            toast.success("Campaign created successfully");
            setCampaigns((existing) => [createdCampaign, ...existing]);
            closeCampaignForm();
        } catch (error) {
            console.error("Error creating campaign:", error);
            toast.error("Failed to create campaign");
        }
    };

    const updateCampaign = async (
        campaign: CampaignFormData,
        editingCampaignId: string
    ) => {
        try {
            const response = await fetch(
                `${
                    import.meta.env.VITE_API_BASE_URL
                }/api/campaigns/${editingCampaignId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(campaign),
                }
            );
            if (!response.ok) {
                const err = await response.text();
                throw new Error(`Failed to update campaign: ${err}`);
            }
            const data = await response.json();
            const updatedCampaign = _prepareCampaignsForView([data])[0];
            setCampaigns((existing) =>
                existing.map((campaign) =>
                    campaign.id === editingCampaignId
                        ? updatedCampaign
                        : campaign
                )
            );
            toast.success("Campaign updated successfully");
            closeCampaignForm();
        } catch (error) {
            console.error("Error updating campaign:", error);
            toast.error("Failed to update campaign");
        }
    };

    const deleteCampaigns = async (
        campaignsToDelete: CampaignViewInterface | undefined
    ) => {
        if (!campaignsToDelete) return;
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/campaigns/${
                    campaignsToDelete.id
                }`,
                {
                    method: "DELETE",
                }
            );
            if (!response.ok) {
                const err = await response.text();
                throw new Error(`Failed to delete campaign: ${err}`);
            }
            setCampaigns((prev) =>
                prev.filter((campaign) => campaign?.id !== campaignsToDelete.id)
            );
            setDeletingCampaign(undefined);
            toast.success("Campaign deleted successfully!");
        } catch (error) {
            console.error("Error deleting campaign:", error);
            toast.error("Failed to delete campaign");
        }
    };

    const updateStatus = (
        campaign: CampaignViewInterface,
        newStatus: CampaignStatus
    ) => {
        try {
            const payload = _prepareUpdateStatusPayload(campaign, newStatus);
            updateCampaign(payload, campaign.id);
        } catch (error) {
            console.error("Error updating campaign status:", error);
            toast.error("Failed to update campaign status");
        }
    };

    const openDeleteDialog = (campaignToDelete: CampaignViewInterface) => {
        setDeletingCampaign(campaignToDelete);
        setShowDeleteDialog(true);
    };

    const closeCampaignForm = () => {
        setShowCampaignForm(false);
        setEditingCampaign(undefined);
    };

    const columns = createCampaignColumns({
        onEdit: (campaign) => {
            setEditingCampaign(campaign);
            setShowCampaignForm(true);
        },
        onDelete: openDeleteDialog,
        onStatusChange: updateStatus,
    });

    const filteredCampaigns = campaigns.filter(
        (campaign) =>
            campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            campaign.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            campaign.leads.some((lead) =>
                lead.toLowerCase().includes(searchQuery.toLowerCase())
            ) ||
            campaign.accountIDs.some((accountID) =>
                accountID.toLowerCase().includes(searchQuery.toLowerCase())
            ) ||
            campaign.status
                .toString()
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        fetchCampaigns();
    }, []);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <p className="text-muted-foreground">
                        Loading campaigns...
                    </p>
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
                                placeholder="Search campaigns..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                onClick={() => setShowLinkedInForm(true)}
                            >
                                LinkedIn Message
                            </Button>
                            <Button onClick={() => setShowCampaignForm(true)}>
                                Create Campaign
                            </Button>
                        </div>
                    </div>

                    <DataTable<CampaignViewInterface, unknown>
                        columns={columns}
                        data={filteredCampaigns}
                    />
                </div>
            </div>

            <CreateOrEditCampaignForm
                open={showCampaignForm}
                onClose={closeCampaignForm}
                campaign={editingCampaign}
                onSubmit={(campaign) => {
                    if (campaign) {
                        editingCampaign
                            ? updateCampaign(campaign, editingCampaign.id)
                            : createCampaign(campaign);
                    }
                }}
            />

            <LinkedInMessageForm
                open={showLinkedInForm}
                onOpenChange={setShowLinkedInForm}
            />

            <DeleteConfirmationDialog
                open={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
                onConfirm={() => deleteCampaigns(deletingCampaign)}
                title="Delete Campaigns"
                description="Are you sure you want to delete the selected campaigns? This action cannot be undone."
            />
        </div>
    );
}
