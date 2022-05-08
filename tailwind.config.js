module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF008A",
        secondary: "#29AC00",
        accent: "#A4A4A4",
        background: "#F8F8F8",
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
