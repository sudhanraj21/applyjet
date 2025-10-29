import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <SignIn afterSignInUrl="/dashboard" redirectUrl="/dashboard" />
        </div>
    );
}
