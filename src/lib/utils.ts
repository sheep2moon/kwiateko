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

export const uploadFileToS3 = async (file: File, uploadUrl: string) => {
    try {
        const response = await fetch(uploadUrl, {
            method: "PUT",
            body: file,
            headers: {
                "Content-Type": file.type
            }
        });

        if (!response.ok) {
            throw new Error("Failed to upload file to S3");
        }

        console.log("File uploaded successfully");
        const uploadedImageUrl = uploadUrl.split("?")[0];
        return uploadedImageUrl;
    } catch (error) {
        console.error("Error uploading file to S3", error);
    }
};
