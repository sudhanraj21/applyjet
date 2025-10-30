// ✅ /src/pages/profile.tsx
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { getCareerProfile, upsertCareerProfile, calculateProfileCompletion } from "@/lib/supabaseProfile";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { ProfileForm } from "@/components/forms/ProfileForm";
import { toast } from "sonner";

export default function ProfilePage() {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>({});
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
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

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading profile...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-12 p-6">
      <h1 className="text-3xl font-bold mb-2">Your Career Profile</h1>
      <p className="text-gray-600 mb-6">
        Build your professional identity — your AI assistant will use this to match jobs automatically.
      </p>

      <Card className="shadow-md border border-gray-200 rounded-2xl p-6">
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Full Name"
              value={profile.full_name || ""}
              onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
            />
            <Input
              placeholder="Headline (e.g., Senior Automation Lead at FOS)"
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

            <div className="pt-2">
              <Button onClick={handleSave} className="w-full">
                Save Profile
              </Button>
            </div>

            <div className="mt-6">
              <p className="text-sm text-gray-600 mb-2">Profile Completion</p>
              <Progress value={completion} />
              <p className="text-sm mt-1 text-gray-500">{completion}% complete</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
