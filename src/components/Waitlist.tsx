import { useState } from "react";

export default function Waitlist() {
    const [email, setEmail] = useState("");
    const [joined, setJoined] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);

        try {
            // Call your subscribe API
            const res = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (!res.ok) throw new Error("Failed to join waitlist");

            // Track Plausible event (works both local + production)
            if (typeof window !== "undefined" && window.plausible) {
                console.log("📊 Plausible event (dev mode): Waitlist Joined", { email });
                window.plausible("Waitlist Joined", { props: { email } });
            }

            setJoined(true);
        } catch (err) {
            console.error("Waitlist join failed:", err);
        } finally {
            setLoading(false);
        }
    };

    if (joined) {
        return (
            <section className="py-20 bg-gray-50 text-center">
                <h2 className="text-2xl font-bold mb-2">🎉 You’re on the list!</h2>
                <p className="text-gray-600">We’ll notify you as soon as ApplyJet takes off.</p>
            </section>
        );
    }

    return (
        <section id="waitlist" className="py-20 bg-gray-100 text-center">
            <h2 className="text-3xl font-bold mb-4">Join the Waitlist</h2>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col gap-3">
                <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="px-4 py-2 border rounded-md w-full"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    {loading ? "Joining..." : "Join Waitlist"}
                </button>
            </form>
        </section>
    );
}
