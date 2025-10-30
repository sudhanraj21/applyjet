// ✅ /src/lib/supabaseProfile.ts
import { supabase } from "./supabaseClient";

/**
 * Fetch the logged-in user's career profile.
 */
export async function getCareerProfile(userId: string) {
  const { data, error } = await supabase
    .from("career_profiles")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("❌ Error fetching career profile:", error.message);
    throw error;
  }

  return data;
}

/**
 * Create or update the user's career profile.
 */
export async function upsertCareerProfile(userId: string, profileData: Record<string, any>) {
  const payload = { user_id: userId, ...profileData };

  const { data, error } = await supabase
    .from("career_profiles")
    .upsert(payload, { onConflict: "user_id" })
    .select()
    .single();

  if (error) {
    console.error("❌ Error saving career profile:", error.message);
    throw error;
  }

  console.log("✅ Career profile saved:", data);
  return data;
}

/**
 * Compute profile completion (e.g., % based on filled fields).
 */
export function calculateProfileCompletion(profile: Record<string, any>): number {
  const keys = [
    "full_name",
    "headline",
    "location",
    "skills",
    "experience",
    "education",
    "projects",
  ];

  const filled = keys.filter((key) => {
    const val = profile[key];
    return val && (Array.isArray(val) ? val.length > 0 : val !== "");
  });

  return Math.round((filled.length / keys.length) * 100);
}
