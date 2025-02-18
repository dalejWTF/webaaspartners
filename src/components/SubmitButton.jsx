// components/SubmitButton.js
"use client";

import { Button } from "@/components/ui/button";
import { FaCheck } from "react-icons/fa";

export const SubmitButton = ({ isLoading, isSuccess, sendMessageButton, sendingMessageButton, emailSentSuccess }) => {
    return (
        <div className="w-full">
            {!isLoading && !isSuccess && (
                <Button
                    type="submit"
                    className="max-w-40"
                    variant="outline"
                >
                    {sendMessageButton}
                </Button>
            )}
            {isLoading && !isSuccess && (
                <div className="w-full flex items-center justify-center bg-white text-primary/90 px-4 py-2 rounded-md">
                    <svg className="mr-3 h-5 w-5 animate-spin" viewBox="0 0 24 24">
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            fill="transparent"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                    {sendingMessageButton}
                </div>
            )}
            {isSuccess && (
                <div className="w-full flex items-center justify-center bg-white text-primary/90 px-4 py-2 rounded-md">
                    <FaCheck className="mr-3 h-5 w-5 text-green-500" />
                    {emailSentSuccess}
                </div>
            )}
        </div>
    );
};