/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // "Gift wrap" palette — a deep forest green + brass gold, built
        // around the idea of unwrapping something considered, not loud.
        forest: {
          DEFAULT: "#000000",
          light: "#1A1A1A",
          dark: "#000000",
        },
        brass: {
          DEFAULT: "#D4AF37",
          light: "#F3E5AB",
          dark: "#AA8C2C",
        },
        porcelain: "#FFFFFF",
        burgundy: "#6E2A2A",
        ink: "#FFFFFF",
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      boxShadow: {
        tag: "0 2px 12px rgba(15, 46, 34, 0.15)",
      },
    },
  },
  plugins: [],
};
