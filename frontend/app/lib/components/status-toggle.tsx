"use client";

import { Switch } from "@components/ui/switch";
import { Badge } from "@components/ui/badge";

interface StatusToggleProps {
    status: "active" | "inactive";
    onStatusChange: (newStatus: "active" | "inactive") => void;
    disabled?: boolean;
}

export function StatusToggle({
    status,
    onStatusChange,
    disabled = false,
}: StatusToggleProps) {
    const isActive = status === "active";

    const handleToggle = (checked: boolean) => {
        onStatusChange(checked ? "active" : "inactive");
    };

    return (
        <div className="flex items-center gap-2">
            <Switch
                checked={isActive}
                onCheckedChange={handleToggle}
                disabled={disabled}
                className="data-[state=checked]:bg-primary"
            />
            <Badge
                variant={isActive ? "default" : "secondary"}
                className={isActive ? "bg-primary text-primary-foreground" : ""}
            >
                {status}
            </Badge>
        </div>
    );
}
