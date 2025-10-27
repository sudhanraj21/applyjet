import { motion } from "framer-motion";

const features = [
    {
        icon: "✈️",
        title: "AI Job Search",
        desc: "Our smart engine scans global job sites and surfaces roles that match your skills, location, and salary goals.",
    },
    {
        icon: "⚡",
        title: "Auto Apply Mode",
        desc: "When enabled, ApplyJet tailors your résumé and cover letter to each job and submits them automatically — hands-free.",
    },
    {
        icon: "🤝",
        title: "Recruiter Connect",
        desc: "Let recruiters find you instantly. When a role matches your profile, both sides get notified to connect.",
    },
];

export default function Features() {
    return (
        <section id="features" className="py-24 bg-white">
            <div className="max-w-5xl mx-auto px-6 text-center">
                <h2 className="text-2xl font-semibold text-textPrimary mb-14">
                    How ApplyJet Works
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {features.map((f, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: idx * 0.2 }}
                            viewport={{ once: true }}
                            className="bg-surfaceLight shadow-soft rounded-xl2 p-8 hover:shadow-lg transition-all"
                        >
                            <div className="text-4xl mb-4">{f.icon}</div>
                            <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                            <p className="text-textMuted text-sm leading-relaxed">{f.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
