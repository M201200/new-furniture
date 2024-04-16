import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "selector",
  theme: {
    fluidTypography: {
      maxScreenSize: 2560,
    },
    extend: {
      colors: {
        textPrimary: "var(--text-primary)",
        textSecondary: "var(--text-secondary)",
        textCrossed: "var(--text-crossed)",
        textHoverSecondary: "var(--text-hover-secondary)",
        brand1: "var(--brand-1)",
        brand2: "var(--brand-2)",
        bgPrimary: "var(--bg-primary)",
        bgFav: "var(--bg-fav)",
        primary: "var(--primary)",
        hoverPrimary: "var(--hover-primary)",
        secondary: "var(--secondary)",
        hoverSecondary: "var(--hover-secondary)",
        accent: "var(--accent)",
        hoverAccent: "var(--hover-accent)",
        borderThin: "var(--border-thin)",
      },
    },
  },
  plugins: [require("tailwind-fluid-typography")],
}
export default config
