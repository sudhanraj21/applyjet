// src/pages/dashboard.tsx
import { useEffect, useState } from "react";
import { useUser, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { supabase } from "@/lib/supabaseClient";

interface Profile {
    id: number;
    clerk_id: string;
    name: string;
    email: string;
    created_at: string;
}

export default function Dashboard() {
    const { user } = useUser();
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfiles = async () => {
            if (!user) return;
            try {
                const { data, error } = await supabase.from("profiles").select("*");
                if (error) throw error;
                setProfiles(data || []);
            } catch (err) {
                console.error("Error fetching profiles:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfiles();
    }, [user]);

    const myProfile = profiles.find((p) => p.clerk_id === user?.id);

    return (
        <>
            <SignedIn>
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-6">
                    <h1 className="text-4xl font-bold mb-4 text-gray-800">
                        🚀 Welcome back, {user?.fullName || "Jet Pilot"}!
                    </h1>

                    {loading ? (
                        <p className="text-gray-500">Loading your dashboard...</p>
                    ) : (
                        <>
                            <p className="text-lg text-gray-700 mb-2">
                                Total ApplyJet users: <strong>{profiles.length}</strong>
                            </p>
                            {myProfile && (
                                <p className="text-md text-gray-600">
                                    Joined on: {new Date(myProfile.created_at).toLocaleDateString()}
                                    <br />
                                    Email: {myProfile.email}
                                </p>
                            )}
                        </>
                    )}
                </div>
            </SignedIn>

            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>
        </>
    );
}
