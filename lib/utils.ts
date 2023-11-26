import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Treat any dot-separated string as a potential ENS name
const ensRegex = /.+\..+/
export const isEns = (address = "") => ensRegex.test(address)

export const truncateAddress = (address: `0x${string}`) => {
  return `${address.slice(0, 7)}...${address.slice(-5, address.length)}`
}
