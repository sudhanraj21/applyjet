import { useEffect } from "react";
import { useUser, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { supabase } from "@/lib/supabaseClient";
import { usePlausibleEvent } from "@/lib/usePlausibleEvent";

export default function Dashboard() {
  const { user } = useUser();
  const { track } = usePlausibleEvent();

  useEffect(() => {
    const syncUser = async () => {
      if (!user) return;

      const { emailAddresses, id, fullName } = user;
      const email = emailAddresses?.[0]?.emailAddress;

      try {
        // Check if the user already exists in Supabase
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
            track("Dashboard Viewed", { email, synced: true });
          }
        } else {
          console.log("ℹ️ User already exists in Supabase.");
          track("Dashboard Viewed", { email, synced: false });
        }
      } catch (err) {
        console.error("Unexpected error syncing user:", err);
      }
    };

    syncUser();
  }, [user, track]);

  return (
    <>
      <SignedIn>
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            🚀 Welcome, {user?.fullName || "Jet Pilot"}!
          </h1>
          <p className="text-lg text-gray-600">
            Your ApplyJet profile is now synced with Supabase.
          </p>
        </div>
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
