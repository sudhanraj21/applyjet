/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                jetBlue: "#2A5EFF",
                jetHover: "#1E4ED8",
                aqua: "#00E0FF",
                surfaceLight: "#FAFAFA",
                surfaceDark: "#0E1116",
                textPrimary: "#111317",
                textMuted: "#6B7280",
                success: "#22C55E",
            },
            boxShadow: {
                soft: "0 4px 12px rgba(0,0,0,.08)",
            },
            borderRadius: {
                xl2: "1.25rem",
            },
            fontFamily: {
                sans: [
                    "Inter",
                    "ui-sans-serif",
                    "system-ui",
                    "Helvetica",
                    "Arial",
                    "sans-serif",
                ],
            },
        },
    },
    plugins: [],
};
