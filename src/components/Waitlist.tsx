import { useState } from "react";

export default function Waitlist() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("Jobseeker");
    const [loading, setLoading] = useState(false);
    const [ok, setOk] = useState<null | boolean>(null);
    const [msg, setMsg] = useState<string>("");

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setOk(null);
        setMsg("");

        try {
            const r = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, role }),
            });
            const data = await r.json();

            if (data?.success) {
                setOk(true);
                setMsg("You’re on the list! We’ll notify you as soon as ApplyJet takes off.");
                setName("");
                setEmail("");
                setRole("Jobseeker");
                // Plausible custom event (works because we load plausible in _app)
                try { (window as any)?.plausible?.("Waitlist Signup"); } catch { }
            } else {
                setOk(false);
                setMsg(data?.error || "Something went wrong. Please try again.");
            }
        } catch (err: any) {
            setOk(false);
            setMsg(err?.message || "Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <section id="waitlist" className="py-20 bg-[#F9FAFB]">
            <div className="mx-auto max-w-3xl px-6 text-center">
                <h2 className="reveal text-2xl md:text-3xl font-semibold text-textPrimary">
                    Be first to launch with ApplyJet
                </h2>
                <p className="reveal mt-3 text-textMuted">
                    Get early access, lifetime discounts, and a front-row seat to the next generation of AI-powered hiring.
                </p>

                <form className="reveal mt-8 flex flex-col gap-3 items-stretch"
                    style={{ transitionDelay: "150ms" }}
                    onSubmit={onSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="rounded-xl border border-black/10 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-jetBlue/30"
                        value={name} onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="rounded-xl border border-black/10 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-jetBlue/30"
                        required
                        value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                    <select
                        name="role"
                        className="rounded-xl border border-black/10 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-jetBlue/30"
                        value={role} onChange={(e) => setRole(e.target.value)}
                    >
                        <option>Jobseeker</option>
                        <option>Recruiter</option>
                    </select>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`btn-glow mt-2 rounded-xl px-6 py-3 text-white ${loading ? "bg-jetHover" : "bg-jetBlue hover:bg-jetHover"}`}
                    >
                        {loading ? "Adding…" : "Join the Early Access List"}
                    </button>

                    {ok === true && (
                        <p className="mt-2 text-success font-medium">
                            ✅ {msg}
                        </p>
                    )}
                    {ok === false && (
                        <p className="mt-2 text-red-600">
                            ❗ {msg}
                        </p>
                    )}
                </form>
            </div>
        </section>
    );
}
