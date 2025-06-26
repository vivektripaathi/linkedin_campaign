"use client";

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@components/ui/hover-card";
import { Button } from "@components/ui/button";
import React, { useEffect, useState } from "react";

interface TooltipProps {
    title: string;
    description: string;
    maxLength?: number;
}

export function Tooltip({ title, description, maxLength = 50 }: TooltipProps) {
    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const shouldTruncate = description.length > maxLength;
    const truncatedDescription = shouldTruncate
        ? `${description.substring(0, maxLength)}...`
        : description;

    if (!shouldTruncate) {
        return <span className="text-muted-foreground">{description}</span>;
    }

    // Use button trigger on mobile, hover trigger on desktop
    const useButtonTrigger = isMobile;

    return (
        <HoverCard
            open={useButtonTrigger ? isOpen : undefined}
            onOpenChange={useButtonTrigger ? setIsOpen : undefined}
            openDelay={0}
            closeDelay={0}
        >
            <HoverCardTrigger asChild>
                {useButtonTrigger ? (
                    <Button
                        variant="outline"
                        size="sm"
                        className="text-xs h-auto px-2 py-1 cursor-pointer"
                        onClick={() => setIsOpen(!isOpen)}
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
