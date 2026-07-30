/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // "Gift wrap" palette — a deep forest green + brass gold, built
        // around the idea of unwrapping something considered, not loud.
        forest: {
          DEFAULT: "#0F2E22",
          light: "#164A35",
          dark: "#0A1F17",
        },
        brass: {
          DEFAULT: "#C9A227",
          light: "#E0C15C",
          dark: "#9C7D1D",
        },
        porcelain: "#F3F0E8",
        burgundy: "#6E2A2A",
        ink: "#181611",
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
