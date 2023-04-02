// const colors = require('tailwindcss/colors')
import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./assets/**/*.{vue,js,css}",
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./server/**/*.{js,ts}",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],

  darkMode: "class", // or 'media' or 'class'

  theme: {
    extend: {
      animation: {
        "fade-in": "fade-in 0.5s linear forwards",
        marquee: "marquee var(--marquee-duration) linear infinite",
        "spin-slow": "spin 4s linear infinite",
        "spin-slower": "spin 6s linear infinite",
        "spin-reverse": "spin-reverse 1s linear infinite",
        "spin-reverse-slow": "spin-reverse 4s linear infinite",
        "spin-reverse-slower": "spin-reverse 6s linear infinite",
      },
      colors: {
        action: {
          DEFAULT: "#A0EB15",
          400: "#A0EB15",
          500: "#A0EB15",
          600: "#A0EB15",
          700: "#A0EB15",
          800: "#68990a",
          900: "#000000",
        },
        dark: {
          DEFAULT: "#464F52",
        },
        primary: {
          DEFAULT: "#3B9EB7",
          50: "#BFE2EA",
          100: "#B0DBE5",
          200: "#91CCDC",
          300: "#28B6D9",
          400: "#53B0C8",
          500: "#3B9EB7",
          600: "#037F9F",
          700: "#0281A0",
          800: "#0080A0",
          900: "#145B6D",
          1000: "#123038",
          1100: "#040B0D",
        },
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        input: "0 3px 6px rgba(0, 0, 0, 0.16)",
        "input-inset": "inset 0 3px 6px rgba(0, 0, 0, 0.16)",
        calc: "-6px 6px 11px #68929D",
        calc2: "-2px 7px 16px #186274",
      },
      fontSize: {
        sm: "0.9rem",
        calc: "1rem",
        base: "1.1rem",
        xl: "1.25rem",
        "2xl": "1.563rem",
        "3xl": "1.953rem",
        "4xl": "2.441rem",
        "4xl2": "2.8rem",
        "5xl": "3.052rem",
      },
      keyframes: {
        "fade-in": {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        },
        marquee: {
          "100%": {
            transform: "translateY(-50%)",
          },
        },
        "spin-reverse": {
          to: {
            transform: "rotate(-360deg)",
          },
        },
      },
    },
  },

  plugins: [
    // require('@tailwindcss/forms'),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
