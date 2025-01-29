import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { customAlphabet } from "nanoid";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function generateRandomId(length: number = 12) {
    const nanoid = customAlphabet(alphabet, length);
    return nanoid();
}
