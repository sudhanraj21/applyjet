import { useState } from "react";

export default function Waitlist() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const response = await fetch("/api/waitlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const result = await response.json();
            if (result.success) {
                console.log("✅ Email added to Supabase waitlist:", result.data);
                setStatus("success");
                setEmail("");
            } else {
                throw new Error(result.error || "Failed to join waitlist");
            }
        } catch (err) {
            console.error("Waitlist submission failed:", err);
            setStatus("error");
        }
    };

    return (
        <section id="waitlist" className="py-20 bg-gray-50">
            <div className="max-w-2xl mx-auto text-center px-6">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">
                    Join the ApplyJet Waitlist 🚀
                </h2>
                <p className="text-gray-600 mb-8">
                    Be among the first to experience AI-powered job search automation.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full sm:w-auto flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        disabled={status === "loading"}
                        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {status === "loading" ? "Joining..." : "Join Waitlist"}
                    </button>
                </form>

                {status === "success" && (
                    <p className="text-green-600 mt-4">🎉 You're on the list!</p>
                )}
                {status === "error" && (
                    <p className="text-red-600 mt-4">
                        ❌ Something went wrong. Please try again later.
                    </p>
                )}
            </div>
        </section>
    );
}
