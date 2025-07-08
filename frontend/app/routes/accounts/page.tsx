"use client";

import { Plug, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { AccountViewInterface, IAccount } from "@lib/types";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { DataTable } from "@components/data-table";
import { createAccountColumns } from "~/lib/components/column-definitions/account.columns";
import { DeleteConfirmationDialog } from "~/lib/components/delete-confirmation-dialog";
import { CreateAccountForm } from "~/lib/components/create-account-form";
import type { CreateAccountFormData } from "~/lib/validations";
import { getLinkedAccounts } from "@lib/utils";

export function Accounts() {
    const [loading, setLoading] = useState(false),
        [isCreatingAccount, setIsCreatingAccount] = useState<boolean>(false),
        [searchQuery, setSearchQuery] = useState(""),
        [accounts, setAccounts] = useState<AccountViewInterface[]>([]),
        [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false),
        [showAccountForm, setShowAccountForm] = useState<boolean>(false),
        [deletingAccount, setDeletingAccount] = useState<
            AccountViewInterface | undefined
        >(undefined),
        [isDeletingAccount, setIsDeletingAccount] = useState(false);

    const _prepareAccountForView = (
        account: IAccount
    ): AccountViewInterface => {
        return {
            id: account._id,
            name: account.name,
            username: account.username,
            providerId: account.providerId,
            publicIdentifier: account.publicIdentifier,
        };
    };

    const fetchAccounts = async () => {
        try {
            setLoading(true);
            const data: AccountViewInterface[] = (
                await getLinkedAccounts()
            ).map(_prepareAccountForView);
            setAccounts(data);
        } catch (error) {
            console.error("Error fetching accounts:", error);
            toast.error("Failed to load accounts");
        } finally {
            setLoading(false);
        }
    };

    const deleteAccount = async (
        accountToDelete: AccountViewInterface | undefined
    ) => {
        if (!accountToDelete || !accountToDelete.id) {
            toast.error("No account selected or account ID missing.");
            setShowDeleteDialog(false);
            setIsDeletingAccount(false);
            return;
        }
        setIsDeletingAccount(true);
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/accounts/${
                    accountToDelete.id
                }`,
                {
                    method: "DELETE",
                }
            );
            if (!response.ok) {
                throw new Error("Failed to delete account");
            }
            setShowDeleteDialog(false);
            setDeletingAccount(undefined);
            toast.success("Account deleted successfully");
            fetchAccounts();
        } catch (error) {
            toast.error("Failed to delete account");
        } finally {
            setIsDeletingAccount(false);
        }
    };

    const createAccount = async (account?: CreateAccountFormData) => {
        try {
            setIsCreatingAccount(true);
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/accounts/link`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(account),
                }
            );

            if (!response.ok) {
                if(response.statusText === "Unauthorized") throw new Error("Invalid credentials!")
                else throw new Error("Failed to create accounts");
            }

            const data: IAccount = await response.json();
            setAccounts([...accounts, _prepareAccountForView(data)]);
            toast.success("Account linked successfully")
        } catch (error: any) {
            toast.error(error.message || "Error connecting account.");        
        } finally {
            setIsCreatingAccount(false);
        }
    };

    const openDeleteDialog = (accountToDelete: AccountViewInterface) => {
        setDeletingAccount(accountToDelete);
        setShowDeleteDialog(true);
    };

    const columns = createAccountColumns({
        deleteAccount: openDeleteDialog,
    });

    const filteredAccounts = accounts.filter(
        (account) =>
            account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            account.username
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            account.providerId
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            account.publicIdentifier
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        fetchAccounts();
    }, []);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <p className="text-muted-foreground">Loading accounts...</p>
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
                                placeholder="Search accounts..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button onClick={() => setShowAccountForm(true)}>
                                <Plug /> Connect an account
                            </Button>
                        </div>
                    </div>

                    <DataTable<AccountViewInterface, unknown>
                        columns={columns}
                        data={filteredAccounts}
                    />
                </div>
            </div>

            <CreateAccountForm
                open={showAccountForm}
                onClose={() => setShowAccountForm(false)}
                onSubmit={createAccount}
                isSubmitting={isCreatingAccount}
            />

            <DeleteConfirmationDialog
                open={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
                onConfirm={() => deleteAccount(deletingAccount)}
                title="Delete Account"
                description="Are you sure you want to delete the selected account? This action cannot be undone."
                confirmLoading={isDeletingAccount}
            />
        </div>
    );
}
