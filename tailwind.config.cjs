import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // primary: "#3BB77E",
        primary: "#30a444",
        secondary: "#DEF9EC",
        textColor: "#253D4E",
      },
      fontFamily: {
        sans: ["Quicksand", "sans-serif"],
        serif: ["Lato", "sans-serif"],
        body: ["Jost", "sans-serif"],
      },
    },
  },
  plugins: [],
});