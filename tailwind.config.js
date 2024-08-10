/* eslint-disable no-undef */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3BB77E",
        secondary: "#e5f3f3"
      },
      fontFamily: {
        sans: ["Quicksand", "sans-serif"],
        serif: ["Lato", "sans-serif"],
        body: ['Jost', 'sans-serif'],
      }
    },
  },
  plugins: [],
});
