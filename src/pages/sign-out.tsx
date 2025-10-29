import { useEffect } from "react";
import { useClerk } from "@clerk/nextjs";

export default function SignOutPage() {
    const { signOut } = useClerk();

    useEffect(() => {
        (async () => {
            await signOut();
            window.location.href = "/";
        })();
    }, [signOut]);

    return (
        <div className="flex justify-center items-center h-screen text-gray-700">
            Signing you out...
        </div>
    );
}
