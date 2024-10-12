/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px"
      },
      colors: {
        "white": "#ffffff",
        "black": "#1e1e1e",
        "grey": "#1e1e1ecc",
        "yellow": "#a0a0a0"
      },
      fontFamily: {
        sans: [
          "Inter", "sans-serif"
        ]
      }
    }
  },
  plugins: []
};

