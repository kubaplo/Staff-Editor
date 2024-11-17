import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        dark: "var(--dark)",
      },

      boxShadow: {
        'header': '3px 3px 15px 5px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
};

export default config;