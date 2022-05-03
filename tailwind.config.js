module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3300FF",
        secondary: "#29AC00",
        accent: "#9FAB9B",
        background: "#E6FFEB",
      },
      borderWidth: {
        1: "1px",
      },
      backgroundImage: {
        "gradient-radial":
          "radial-gradient(ellipse closest-side at center, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
