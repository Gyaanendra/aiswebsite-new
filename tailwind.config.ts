import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "stellar-blue": "#6ae8ff",
        "neon-purple": "#b026ff",
        "space-black": "#020024",
      },
    },
  },
  plugins: [],
} satisfies Config;
