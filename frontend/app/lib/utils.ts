import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { AccountViewInterface } from "@lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getInitials = (name: string) => {
  return name
  ?.split(" ")
  ?.map((n) => n[0])
  ?.join("")
  ?.toUpperCase();
};

export async function getLinkedAccounts(): Promise<AccountViewInterface[]> {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/accounts`);
  if (!response.ok) {
    throw new Error("Failed to fetch accounts");
  }
  return await response.json();
}
