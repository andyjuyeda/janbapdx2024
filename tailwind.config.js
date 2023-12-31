/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },
    },
    colors: {
      primary: {
        DEFAULT: "#F9A4BB",
        50: "#FFFFFF",
        100: "#FFFFFF",
        200: "#FFFFFF",
        300: "#FEF1F4",
        400: "#FCCAD8",
        500: "#F9A4BB",
        600: "#F66F94",
        700: "#F23B6C",
        800: "#E60F49",
        900: "#B10C38",
        950: "#970A30",
      },
      slate: {
        DEFAULT: "#1D1C1D",
        50: "#F5F5F5",
        100: "#E9E8E9",
        200: "#D0CED0",
        300: "#B7B4B7",
        400: "#9E9A9E",
        500: "#858085",
        600: "#6B676B",
        700: "#514E51",
        800: "#373537",
        900: "#1D1C1D",
        950: "#100F10",
      },
      danger: {
        DEFAULT: "#EF4444",
        50: "#FDEDED",
        100: "#FCDADA",
        200: "#F9B5B5",
        300: "#F58F8F",
        400: "#F26A6A",
        500: "#EF4444",
        600: "#E71414",
        700: "#B30F0F",
        800: "#800B0B",
        900: "#4C0707",
        950: "#320404",
      },
      "dark-blue": "#0E1F33",
      white: "#FFFFFF",
    },
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
