import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0F0F10",
          800: "#161618",
          700: "#1D1D20",
          600: "#26262A",
        },
        gold: {
          DEFAULT: "#C9A227",
          light: "#E4C766",
          dark: "#9E7F1C",
        },
        mist: "#F5F5F4",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        gold: "0 10px 40px -12px rgba(201, 162, 39, 0.45)",
        card: "0 24px 60px -24px rgba(15, 15, 16, 0.35)",
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #E4C766 0%, #C9A227 45%, #9E7F1C 100%)",
        "ink-gradient":
          "linear-gradient(160deg, #0F0F10 0%, #161618 60%, #1D1D20 100%)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        shimmer: "shimmer 6s linear infinite",
        "fade-up": "fade-up 0.7s ease forwards",
      },
    },
  },
  plugins: [],
};

export default config;
