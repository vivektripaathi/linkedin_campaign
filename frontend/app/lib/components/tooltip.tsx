"use client";

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@components/ui/hover-card";
import { Button } from "@components/ui/button";
import React from "react";

interface TooltipProps {
    title: string;
    description: string;
    maxLength?: number;
    triggerMode?: "hover" | "button"; // 👈 new optional prop
}

export function Tooltip({
    title,
    description,
    maxLength = 50,
    triggerMode = "hover", // default behavior
}: TooltipProps) {
    const shouldTruncate = description.length > maxLength;
    const truncatedDescription = shouldTruncate
        ? `${description.substring(0, maxLength)}...`
        : description;

    if (!shouldTruncate) {
        return <span className="text-muted-foreground">{description}</span>;
    }

    return (
        <HoverCard openDelay={0} closeDelay={0}>
            <HoverCardTrigger asChild>
                {triggerMode === "button" ? (
                    <Button
                        variant="outline"
                        size="sm"
                        className="text-xs h-auto px-2 py-1"
                    >
                        View
                    </Button>
                ) : (
                    <span className="text-muted-foreground cursor-help hover:text-foreground transition-colors">
                        {truncatedDescription}
                    </span>
                )}
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
                <div className="space-y-2">
                    <h4 className="text-sm font-semibold">{title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {description}
                    </p>
                </div>
            </HoverCardContent>
        </HoverCard>
    );
}
