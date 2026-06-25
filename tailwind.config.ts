import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        saffron: {
          DEFAULT: "#FF9933",
          50: "#FFF4E8",
          100: "#FFE7CC",
          200: "#FFD3A1",
          300: "#FFBE75",
          400: "#FFA94A",
          500: "#FF9933",
          600: "#F57E0F",
          700: "#C9620A",
          800: "#9C4C0C",
          900: "#7A3D0E",
        },
        cream: {
          DEFAULT: "#FFF8F2",
          50: "#FFFCF9",
          100: "#FFF8F2",
          200: "#FDEFE2",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        // Pastel tints ported from the reference design (OKLCH)
        tint: {
          rose: "oklch(92% .045 15)",
          sky: "oklch(93% .04 230)",
          mint: "oklch(93% .05 160)",
          lavender: "oklch(92% .04 300)",
          sand: "oklch(94% .05 80)",
          peach: "oklch(93% .06 45)",
          lemon: "oklch(95% .07 100)",
          saffron: "oklch(93% .07 65)",
        },
      },
      borderRadius: {
        "4xl": "2rem",
        "3xl": "1.5rem",
        "2xl": "1.25rem",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
        display: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 8px 30px -10px oklch(70% .05 50/.18)",
        "soft-lg": "0 18px 50px -16px oklch(70% .05 50/.22)",
        card: "0 8px 30px -10px oklch(70% .05 50/.15)",
        glow: "0 20px 60px -20px oklch(74.5% .165 55/.45)",
      },
      backgroundImage: {
        "saffron-gradient": "linear-gradient(135deg, #FF9933 0%, #FF6B6B 100%)",
        "warm-gradient": "linear-gradient(135deg, #FFB347 0%, #FF9933 50%, #F57E0F 100%)",
        "calm-gradient": "linear-gradient(160deg, #FFF8F2 0%, #FDEFE2 100%)",
        "hero-glow":
          "radial-gradient(120% 120% at 80% 0%, oklch(93% .07 65) 0%, transparent 55%), linear-gradient(180deg, oklch(98.5% .012 75) 0%, oklch(96% .03 65) 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out",
        "float-slow": "float-slow 6s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
        shimmer: "shimmer 1.5s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
