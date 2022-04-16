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
        background: "#F0F8EE",
      },
    },
  },
  plugins: [],
};
