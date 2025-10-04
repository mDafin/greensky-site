// tailwind.config.ts
import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "-apple-system","BlinkMacSystemFont","SF Pro Text","SF Pro Display",
          "Segoe UI","Roboto","Inter","Helvetica Neue","Arial","Noto Sans","sans-serif",
        ],
      },
      colors: {
        ink: { DEFAULT: "#0b0b0c" },
        mist: { DEFAULT: "#f7f8fa" },
        slate:{ DEFAULT: "#eef1f5" },
        brand:{
          50:"#e8f6f3",100:"#c9ebe4",200:"#9fded1",300:"#73d0bd",
          400:"#4cc4ad",500:"#2ab99f",600:"#1f9985",700:"#187a6b",
          800:"#135f55",900:"#0f4b44"
        }
      },
      borderRadius: { xl: "16px", "2xl": "20px" },
      boxShadow: { soft: "0 10px 30px rgba(0,0,0,.06)" },
      transitionTimingFunction: { swift:"cubic-bezier(.17,.67,.25,1)" },
      spacing: { 18:"4.5rem", 22:"5.5rem" },
      backdropBlur: { glass: "16px", "glass-lg": "24px" },
    },
  },
  plugins: [typography],
};
export default config;
