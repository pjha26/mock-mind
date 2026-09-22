import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        surface: "#111111",
        "surface-raised": "#1a1a1a",
        primary: "#CC5500", // Warm Amber
        "primary-hover": "#e66000",
        secondary: "#1E3A8A", // Cool Blue for duotone
        text: "#FAFAFA",
        "text-muted": "#9CA3AF",
        border: "rgba(255, 255, 255, 0.1)",
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "sans-serif"],
        display: ["var(--font-syne)", "sans-serif"],
      },
      spacing: {
        "container-max": "1200px",
        "margin-mobile": "16px",
        gutter: "24px",
        "margin-desktop": "40px",
      },
    },
  },
  plugins: [],
};

export default config;
