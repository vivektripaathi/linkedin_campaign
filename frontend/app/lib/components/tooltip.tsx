"use client";

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@components/ui/hover-card";

interface TooltipProps {
    title: string;
    description: string;
    maxLength?: number;
}

export function Tooltip({ title, description, maxLength = 50 }: TooltipProps) {
    const shouldTruncate = description.length > maxLength;
    const truncatedDescription = shouldTruncate
        ? `${description.substring(0, maxLength)}...`
        : description;

    if (!shouldTruncate) {
        return <span className="text-muted-foreground">{description}</span>;
    }

    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <span className="text-muted-foreground cursor-help hover:text-foreground transition-colors">
                    {truncatedDescription}
                </span>
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
