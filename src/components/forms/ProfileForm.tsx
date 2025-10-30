// ✅ /src/components/forms/ProfileForm.tsx
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { getCareerProfile, upsertCareerProfile, calculateProfileCompletion } from "@/lib/supabaseProfile";
import { useUser } from "@clerk/nextjs";

export function ProfileForm() {
    const { user } = useUser();
    const [profile, setProfile] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const [completion, setCompletion] = useState(0);

    useEffect(() => {
        if (user) fetchProfile();
    }, [user]);

    async function fetchProfile() {
        try {
            const data = await getCareerProfile(user!.id);
            if (data) {
                setProfile(data);
                setCompletion(calculateProfileCompletion(data));
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    async function handleSave() {
        try {
            await upsertCareerProfile(user!.id, profile);
            setCompletion(calculateProfileCompletion(profile));
            toast.success("✅ Profile saved successfully!");
        } catch (err) {
            toast.error("❌ Failed to save profile.");
        }
    }

    if (loading) return <p className="text-center mt-8 text-gray-500">Loading profile...</p>;

    return (
        <div className="space-y-4">
            <Input
                placeholder="Full Name"
                value={profile.full_name || ""}
                onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
            />
            <Input
                placeholder="Headline (e.g., Automation Lead at FOS)"
                value={profile.headline || ""}
                onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
            />
            <Input
                placeholder="Location (e.g., Magdeburg, Germany)"
                value={profile.location || ""}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
            />
            <Input
                placeholder="Skills (comma separated)"
                value={(profile.skills || []).join(", ")}
                onChange={(e) =>
                    setProfile({ ...profile, skills: e.target.value.split(",").map((s) => s.trim()) })
                }
            />
            <Textarea
                placeholder="Career Goals / What are you aiming for?"
                value={profile.career_goals || ""}
                onChange={(e) => setProfile({ ...profile, career_goals: e.target.value })}
            />
            <Button onClick={handleSave} className="w-full">
                Save Profile
            </Button>

            <div className="pt-3">
                <p className="text-sm text-gray-600 mb-2">Profile Completion</p>
                <Progress value={completion} />
                <p className="text-xs text-gray-500 mt-1">{completion}% complete</p>
            </div>
        </div>
    );
}
