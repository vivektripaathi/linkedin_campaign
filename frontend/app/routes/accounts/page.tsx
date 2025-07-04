"use client";

import { Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { AccountViewInterface } from "@lib/types";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { DataTable } from "@components/data-table";
import { createAccountColumns } from "~/lib/components/column-definitions/account.columns";

export function Accounts() {
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [accounts, setAccounts] = useState<AccountViewInterface[]>([]);
    const [selectedAccounts, setSelectedAccounts] = useState<
        AccountViewInterface | undefined
    >(undefined);

    const fetchAccounts = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/accounts`
            );
            if (!response.ok) {
                throw new Error("Failed to fetch accounts");
            }
            const data = await response.json();

            setAccounts(data);
        } catch (error) {
            console.error("Error fetching accounts:", error);
            toast.error("Failed to load leads");
        } finally {
            setLoading(false);
        }
    };

    const deleteAccount = async () => {};

    const columns = createAccountColumns({
        deleteAccount: (account) => {
            setSelectedAccounts(account);
        },
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
                                placeholder="Search leads..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button>
                                <Plus /> Add Account
                            </Button>
                        </div>
                    </div>

                    <DataTable<AccountViewInterface, unknown>
                        columns={columns}
                        data={filteredAccounts}
                    />
                </div>
            </div>
        </div>
    );
}
