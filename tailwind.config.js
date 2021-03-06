module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        varela: ["Varela Round", "sans-serif"],
        opensans: ["Open Sans", "sans-serif"],
      },
    },
    colors: {
      primary1: "#E63946",
      primary2: "#F1FAEE",
      primary3: "#1D3557",
      accent1: "#A8DADC",
      accent2: "#457B9D",
    },
    screens: {
      mobile: { min: "300px", max: "480px" },
      laptop: { min: "1024px" },
    },
  },
  plugins: [],
};
