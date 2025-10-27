export default function Hero() {
    return (
        <section className="relative hero-blobs">
            <div className="mx-auto max-w-4xl px-6 py-28 text-center reveal">
                <h1 className="text-4xl md:text-6xl font-bold text-textPrimary tracking-tight">
                    Your Career. <br className="hidden md:block" />
                    On Autopilot.
                </h1>
                <p className="mt-5 text-textMuted text-base md:text-lg">
                    ApplyJet finds, matches, and applies to jobs for you — while you focus on what matters.
                </p>
                <div className="mt-8 flex items-center justify-center gap-3">
                    <a
                        href="#waitlist"
                        className="btn-glow rounded-full bg-jetBlue hover:bg-jetHover text-white px-6 py-3 shadow-soft"
                    >
                        Join the Waitlist
                    </a>
                    <a
                        href="#recruiters"
                        className="rounded-full border border-black/10 px-6 py-3 text-sm text-textPrimary hover:border-black/20"
                    >
                        For Recruiters →
                    </a>
                </div>
            </div>
        </section>
    )
}
