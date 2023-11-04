import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Treat any dot-separated string as a potential ENS name
const ensRegex = /.+\..+/
export const isEns = (address = "") => ensRegex.test(address)
