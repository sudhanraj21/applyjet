// ✅ /src/components/forms/AutopilotSettingsForm.tsx
import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
    getAutopilotSettings,
    upsertAutopilotSettings,
    getAIApplicationLogs,
} from "@/lib/supabaseAutopilot";
import { useUser } from "@clerk/nextjs";
import { Card } from "@/components/ui/card";

export function AutopilotSettingsForm() {
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

    if (loading) return <p className="text-center text-gray-500">Loading settings...</p>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <Label>Enable Autopilot</Label>
                <Switch
                    checked={settings.auto_apply_enabled || false}
                    onCheckedChange={(v) => setSettings({ ...settings, auto_apply_enabled: v })}
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
                    value={settings.daily_limit || 5}
                    onChange={(e) => setSettings({ ...settings, daily_limit: Number(e.target.value) })}
                />
            </div>

            <div>
                <Label>AI Confidence Threshold (%)</Label>
                <Input
                    type="number"
                    value={settings.ai_accuracy_threshold || 85}
                    onChange={(e) =>
                        setSettings({ ...settings, ai_accuracy_threshold: Number(e.target.value) })
                    }
                />
            </div>

            <div className="flex justify-between items-center">
                <Label>Email Notifications</Label>
                <Switch
                    checked={settings.notify_via_email ?? true}
                    onCheckedChange={(v) => setSettings({ ...settings, notify_via_email: v })}
                />
            </div>

            <div className="flex justify-between items-center">
                <Label>App Notifications</Label>
                <Switch
                    checked={settings.notify_via_app ?? true}
                    onCheckedChange={(v) => setSettings({ ...settings, notify_via_app: v })}
                />
            </div>

            <Button onClick={handleSave} className="w-full">
                Save Settings
            </Button>

            <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Recent AI Actions</h3>
                {logs.length === 0 ? (
                    <p className="text-sm text-gray-500">No AI activity recorded yet.</p>
                ) : (
                    <div className="space-y-2">
                        {logs.map((log) => (
                            <Card key={log.id} className="p-3 border rounded-md">
                                <p className="font-medium">{log.job_title}</p>
                                <p className="text-sm text-gray-500">{log.company}</p>
                                <p className="text-xs text-gray-400 mt-1">
                                    {new Date(log.created_at).toLocaleString()}
                                </p>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
