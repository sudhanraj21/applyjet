export default function Footer() {
    return (
        <footer className="bg-surfaceDark text-white/80">
            <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm">© 2025 ApplyJet. Crafted with precision.</p>
                <nav className="flex items-center gap-5 text-sm">
                    <a href="#" className="hover:text-white">Privacy</a>
                    <a href="#" className="hover:text-white">Terms</a>
                    <a href="#" className="hover:text-white">LinkedIn</a>
                    <a href="#" className="hover:text-white">Twitter</a>
                </nav>
            </div>
        </footer>
    )
}
