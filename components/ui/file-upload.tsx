"use client";

import { UploadDropzone } from "@/lib/uploadthing";

import "@uploadthing/react/styles.css";

import Image from "next/image";


interface FileUploadProps {
    onChange: (url?: string) => void;
    value: string;
    endpoint: "serverImage" | "messageFile"
};

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url);
            }}
            onUploadError={(error: Error) => {
                console.log(error)
            }}
        />
    )
};