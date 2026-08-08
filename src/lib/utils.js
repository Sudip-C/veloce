import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes intelligently, resolving conflicts
 * (e.g. cn("px-2", "px-4") -> "px-4").
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/** Format a number as USD, no decimals — e.g. 608358 -> "$608,358" */
export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
