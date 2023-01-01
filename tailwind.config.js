const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", ...defaultTheme.fontFamily.sans],
        poppins: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        backgroundMain: "#fafcff",
        primary: "#3026b9",
        lightPrimary: "#362cba",
        yellow: "#f0be4a",
        green: "#4daa5d",
        lightGreen: "#dceede",
        red: "#ec364b",
      },
    },
  },
  plugins: [],
};
