module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8000FF",
        secondary: "#68A41C",
        accent: "#969A95",
        background: "#F0F8EE",
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
