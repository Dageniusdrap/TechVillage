import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f3f7ff",
          100: "#e6efff",
          200: "#c5d9ff",
          300: "#9cbaff",
          400: "#6a8eff",
          500: "#3b5cff",
          600: "#2a45db",
          700: "#2136ac",
          800: "#1d2f8a",
          900: "#1b2b72"
        }
      },
    }
  },
  plugins: []
} satisfies Config;
