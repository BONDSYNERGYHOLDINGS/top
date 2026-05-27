import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },
        forest: {
          DEFAULT: "#0A4D2E",
          light: "#0D6B3F",
          dark: "#063320",
          50: "#E8F5EE",
          100: "#C3E6D0",
          200: "#8FCF9A",  
          300: "#4DB870",
          400: "#1E9E4F",
          500: "#0A4D2E",
          600: "#084025",
          700: "#06331D",
          800: "#042614",
          900: "#02190D",
        },
        gold: {
          DEFAULT: "#C9963A",
          light: "#E0AE52",
          50: "#FDF6E9",
          100: "#F8E7C4",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #052e16 0%, #0A4D2E 40%, #166534 70%, #16a34a 100%)",
        "card-gradient": "linear-gradient(180deg, transparent 40%, rgba(5,46,22,0.95) 100%)",
        "section-gradient": "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #f0fdf4 100%)",
        "green-shimmer": "linear-gradient(90deg, #0A4D2E, #16a34a, #0A4D2E)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-right": "slideRight 0.6s ease-out forwards",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2s infinite",
        "pulse-slow": "pulse 3s infinite",
        "scroll": "scroll 30s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideRight: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      boxShadow: {
        "green-glow": "0 0 30px rgba(22,163,74,0.3)",
        "card-hover": "0 25px 50px rgba(10,77,46,0.2)",
        "luxury": "0 10px 40px rgba(10,77,46,0.15), 0 2px 10px rgba(0,0,0,0.05)",
      },
    },
  },
  plugins: [],
};
export default config;
