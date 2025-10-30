// ✅ /src/pages/settings/autopilot.tsx
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import {
    getAutopilotSettings,
    upsertAutopilotSettings,
    getAIApplicationLogs,
} from "@/lib/supabaseAutopilot";
import { Card, CardContent } from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";
import { AutopilotSettingsForm } from "@/components/forms/AutopilotSettingsForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function AutopilotSettingsPage() {
    const { user } = useUser();
    const [settings, setSettings] = useState<any>({});
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) loadData();
    }, [user]);

    async function loadData() {
        try {
            const [s, l] = await Promise.all([
                getAutopilotSettings(user!.id),
                getAIApplicationLogs(user!.id),
            ]);
            if (s) setSettings(s);
            if (l) setLogs(l);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    async function handleSave() {
        try {
            await upsertAutopilotSettings(user!.id, settings);
            toast.success("✅ Autopilot settings saved!");
        } catch (err) {
            toast.error("❌ Failed to save settings.");
        }
    }

    if (loading) return <p className="text-center mt-10 text-gray-500">Loading settings...</p>;

    return (
        <div className="max-w-3xl mx-auto mt-12 p-6">
            <h1 className="text-3xl font-bold mb-2">AI Autopilot Settings</h1>
            <p className="text-gray-600 mb-6">
                Control how ApplyJet AI applies jobs for you while you're offline.
            </p>

            <Card className="shadow-md border border-gray-200 rounded-2xl p-6 mb-10">
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="autoApply">Enable Autopilot</Label>
                        <Switch
                            id="autoApply"
                            checked={settings.auto_apply_enabled || false}
                            onCheckedChange={(val) => setSettings({ ...settings, auto_apply_enabled: val })}
                        />
                    </div>

                    <div>
                        <Label>Approval Mode</Label>
                        <select
                            className="w-full border rounded-md p-2 mt-1"
                            value={settings.approval_mode || "manual"}
                            onChange={(e) => setSettings({ ...settings, approval_mode: e.target.value })}
                        >
                            <option value="manual">Manual Review</option>
                            <option value="auto">Auto Apply</option>
                        </select>
                    </div>

                    <div>
                        <Label>Daily Limit</Label>
                        <Input
                            type="number"
                            min="1"
                            value={settings.daily_limit || 5}
                            onChange={(e) =>
                                setSettings({ ...settings, daily_limit: parseInt(e.target.value) || 5 })
                            }
                        />
                    </div>

                    <div>
                        <Label>AI Accuracy Threshold (%)</Label>
                        <Input
                            type="number"
                            min="50"
                            max="100"
                            value={settings.ai_accuracy_threshold || 85}
                            onChange={(e) =>
                                setSettings({
                                    ...settings,
                                    ai_accuracy_threshold: parseInt(e.target.value) || 85,
                                })
                            }
                        />
                    </div>

                    <div className="flex justify-between items-center">
                        <Label>Notify via Email</Label>
                        <Switch
                            checked={settings.notify_via_email ?? true}
                            onCheckedChange={(v) => setSettings({ ...settings, notify_via_email: v })}
                        />
                    </div>

                    <div className="flex justify-between items-center">
                        <Label>Notify via App</Label>
                        <Switch
                            checked={settings.notify_via_app ?? true}
                            onCheckedChange={(v) => setSettings({ ...settings, notify_via_app: v })}
                        />
                    </div>

                    <Button onClick={handleSave} className="w-full">
                        Save Settings
                    </Button>
                </CardContent>
            </Card>

            <h2 className="text-xl font-semibold mb-3">Recent AI Actions</h2>
            {logs.length === 0 ? (
                <p className="text-gray-500 text-sm">No AI activity recorded yet.</p>
            ) : (
                <div className="space-y-3">
                    {logs.map((log) => (
                        <Card key={log.id} className="p-3 border rounded-lg">
                            <p className="font-medium">{log.job_title}</p>
                            <p className="text-sm text-gray-500">
                                {log.company} — Confidence: {log.ai_confidence}%
                            </p>
                            <p className="text-xs text-gray-400">{new Date(log.created_at).toLocaleString()}</p>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
