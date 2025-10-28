// src/components/Waitlist.tsx
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { usePlausibleEvent } from "@/lib/usePlausibleEvent";

export default function Waitlist() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const plausible = usePlausibleEvent();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");

        try {
            const res = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (!res.ok) throw new Error("Subscription failed");

            // 🔥 Log success event to Plausible
            plausible.track("Waitlist Signup", { email });
            trackEvent("Waitlist Signup", { email });

            setStatus("success");
            setEmail("");
        } catch (err) {
            console.error("Error joining waitlist:", err);
            setStatus("error");
        } finally {
            setTimeout(() => setStatus("idle"), 4000);
        }
    };

    return (
        <section id="waitlist" className="py-20 bg-gray-50">
            <div className="max-w-lg mx-auto text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Join the ApplyJet Waitlist 🚀
                </h2>
                <p className="text-gray-600 mb-6">
                    Be among the first to experience AI-powered job search automation.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row items-center justify-center gap-3"
                >
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <button
                        type="submit"
                        disabled={status === "loading"}
                        className={`px-6 py-3 font-semibold rounded-xl transition-colors text-white ${status === "loading"
                                ? "bg-blue-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                            }`}
                    >
                        {status === "loading" ? "Joining..." : "Join Waitlist"}
                    </button>
                </form>

                {status === "success" && (
                    <p className="text-green-600 mt-4 font-medium">
                        🎉 You’re on the list! We’ll keep you posted.
                    </p>
                )}
                {status === "error" && (
                    <p className="text-red-600 mt-4 font-medium">
                        ❌ Something went wrong. Please try again.
                    </p>
                )}
            </div>
        </section>
    );
}
