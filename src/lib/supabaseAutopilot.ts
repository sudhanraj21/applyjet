// ✅ /src/lib/supabaseAutopilot.ts
import { supabase } from "./supabaseClient";

/**
 * Fetch a user's Autopilot settings.
 */
export async function getAutopilotSettings(userId: string) {
  const { data, error } = await supabase
    .from("autopilot_settings")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("❌ Error fetching Autopilot settings:", error.message);
    throw error;
  }

  return data;
}

/**
 * Create or update Autopilot settings for the user.
 */
export async function upsertAutopilotSettings(userId: string, settingsData: Record<string, any>) {
  const payload = { user_id: userId, ...settingsData };

  const { data, error } = await supabase
    .from("autopilot_settings")
    .upsert(payload, { onConflict: "user_id" })
    .select()
    .single();

  if (error) {
    console.error("❌ Error saving Autopilot settings:", error.message);
    throw error;
  }

  console.log("✅ Autopilot settings saved:", data);
  return data;
}

/**
 * Log AI-driven actions for transparency.
 */
export async function logAIAction(userId: string, logData: Record<string, any>) {
  const payload = { user_id: userId, ...logData };

  const { data, error } = await supabase
    .from("ai_application_logs")
    .insert(payload)
    .select()
    .single();

  if (error) {
    console.error("❌ Error logging AI action:", error.message);
    throw error;
  }

  console.log("🧠 AI Action logged:", data);
  return data;
}

/**
 * Fetch all AI Application Logs for a user.
 */
export async function getAIApplicationLogs(userId: string) {
  const { data, error } = await supabase
    .from("ai_application_logs")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("❌ Error fetching AI logs:", error.message);
    throw error;
  }

  return data || [];
}
