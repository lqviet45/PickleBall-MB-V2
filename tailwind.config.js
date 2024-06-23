/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        Base: "#08222F",
        primary: "#161622",
        secondary: {
          DEFAULT: "#FF9C01",
          100: "#FF9001",
          200: "#FF8E01",
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
        mubold: ["MuseoModerno-Bold", "sans-serif"],
        muregular: ["MuseoModerno-Regular", "sans-serif"],
        muitalic: ["MuseoModerno-Italic", "sans-serif"],
        mulight: ["MuseoModerno-Light", "sans-serif"],
        mobold: ["Montserrat-Bold", "sans-serif"],
        moregular: ["Montserrat-Regular", "sans-serif"],
        moitalic: ["Montserrat-Italic", "sans-serif"],
        molight: ["Montserrat-Light", "sans-serif"],
        jobold: ["JosefinSans-Bold", "sans-serif"],
        joregular: ["JosefinSans-Regular", "sans-serif"],
        joitalic: ["JosefinSans-Italic", "sans-serif"],
        jolight: ["JosefinSans-Light", "sans-serif"],
      },
    },
  },
  plugins: [],
}

