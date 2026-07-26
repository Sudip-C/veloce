import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes intelligently, resolving conflicts
 * (e.g. cn("px-2", "px-4") -> "px-4").
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
