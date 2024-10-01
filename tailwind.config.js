/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#08222F",
        primary: "#161622",
        secondary: {
          DEFAULT: "#ADE603",
          100: "#ADD503",
          200: "#ADC703",
        },
        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },
        gray: {
          100: "#CDCDE0",
          200: "#242760",
        },
        blue: {
          DEFAULT: "#007AFF",
        },
        yellow: {
          100: "#ADE603"
        }
      },
      fontFamily: {
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
        jolight: ["JosefinSans-Light", "sans-serif"],
      },
      backgroundImage: {
        "landing": "url('assets/images/landing.png')",
      },
    },
  },
  plugins: [],
}

