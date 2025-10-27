import Link from 'next/link'

export default function Header() {
    return (
        <header className="w-full sticky top-0 z-30 bg-white/70 backdrop-blur border-b border-black/5">
            <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <img src="/logo.svg" alt="ApplyJet" className="h-6 w-6" />
                    <span className="font-semibold text-textPrimary">ApplyJet</span>
                </div>
                <Link
                    href="#waitlist"
                    className="btn-glow inline-flex items-center rounded-full bg-jetBlue px-4 py-2 text-white text-sm hover:bg-jetHover transition"
                >
                    Join the Waitlist
                </Link>
            </div>
        </header>
    )
}
