/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        yuvashakti: {
          primary: "#1B5E20",     // NGO green
          secondary: "#2E7D32",
          accent: "#81C784",
          neutral: "#1f2937",
          "base-100": "#ffffff",
          info: "#0284c7",
          success: "#16a34a",
          warning: "#facc15",
          error: "#dc2626",
        },
      },
      "light",
    ],
    defaultTheme: "yuvashakti",
  },
};
