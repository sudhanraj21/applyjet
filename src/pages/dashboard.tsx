// src/pages/dashboard.tsx
import { useEffect, useState } from "react";
import { useUser, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { supabase } from "@/lib/supabaseClient";

export default function Dashboard() {
    const { user } = useUser();
    const [totalProfiles, setTotalProfiles] = useState<number | null>(null);
    const [totalWaitlist, setTotalWaitlist] = useState<number | null>(null);

    useEffect(() => {
        const syncUser = async () => {
            if (!user) return;

            const { emailAddresses, id, fullName } = user;
            const email = emailAddresses?.[0]?.emailAddress;

            try {
                const { data: existingUser, error: selectError } = await supabase
                    .from("profiles")
                    .select("id")
                    .eq("clerk_id", id)
                    .single();

                if (selectError && selectError.code !== "PGRST116") {
                    console.error("Error checking existing user:", selectError.message);
                    return;
                }

                if (!existingUser) {
                    const { error: insertError } = await supabase.from("profiles").insert([
                        {
                            clerk_id: id,
                            email,
                            name: fullName || "",
                        },
                    ]);

                    if (insertError) {
                        console.error("Error inserting user:", insertError.message);
                    } else {
                        console.log("✅ User synced to Supabase successfully!");
                    }
                } else {
                    console.log("ℹ️ User already exists in Supabase.");
                }

                // Fetch counts for dashboard
                const [{ count: profilesCount }, { count: waitlistCount }] =
                    await Promise.all([
                        supabase.from("profiles").select("*", { count: "exact", head: true }),
                        supabase.from("waitlist").select("*", { count: "exact", head: true }),
                    ]);

                setTotalProfiles(profilesCount || 0);
                setTotalWaitlist(waitlistCount || 0);
            } catch (err) {
                console.error("Unexpected error syncing user:", err);
            }
        };

        syncUser();
    }, [user]);

    return (
        <>
            <SignedIn>
                <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center">
                    <h1 className="text-4xl font-bold mb-4 text-gray-800">
                        🚀 Welcome back, {user?.fullName || "Jet Pilot"}!
                    </h1>
                    <p className="text-lg text-gray-600 mb-2">
                        Your ApplyJet profile is now synced with Supabase.
                    </p>
                    <div className="mt-6 space-y-2">
                        <p className="text-md text-gray-700">
                            👥 Total ApplyJet Users:{" "}
                            <span className="font-semibold text-blue-600">{totalProfiles ?? "..."}</span>
                        </p>
                        <p className="text-md text-gray-700">
                            📝 Total Waitlist Signups:{" "}
                            <span className="font-semibold text-green-600">{totalWaitlist ?? "..."}</span>
                        </p>
                    </div>
                </div>
            </SignedIn>

            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>
        </>
    );
}
