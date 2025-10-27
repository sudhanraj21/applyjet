import { useEffect } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Waitlist from '@/components/Waitlist'
import Footer from '@/components/Footer'
import { useReveal } from '@/lib/useReveal'

export default function Home() {
    useReveal()
    useEffect(() => { window.scrollTo(0, 0) }, [])
    return (
        <main className="min-h-screen bg-white text-textPrimary">
            <Header />
            <Hero />
            <Features />
            <Waitlist />
            <Footer />
        </main>
    )
}
