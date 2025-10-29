﻿import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <SignUp afterSignUpUrl="/dashboard" redirectUrl="/dashboard" />
        </div>
    );
}
