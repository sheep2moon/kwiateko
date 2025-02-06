"use server";
import AWS from "aws-sdk";
import { env } from "../../env";

const s3 = new AWS.S3({
    accessKeyId: env.S3_ACCESS_KEY,
    secretAccessKey: env.S3_SECRET_KEY,
    region: env.S3_REGION
});

export const createS3UploadUrl = async (key: string, expiresIn: number = 60) => {
    const params = {
        Bucket: "kwiateko-db",
        Key: key,
        Expires: expiresIn
    };

    try {
        const uploadUrl = await s3.getSignedUrlPromise("putObject", params);
        return uploadUrl;
    } catch (error) {
        console.error("Error creating S3 upload URL", error);
        throw new Error("Could not create S3 upload URL");
    }
};
