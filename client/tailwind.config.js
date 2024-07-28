/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Base colors for dark theme
        // Use these for background, text, and other primary elements
        dark: {
          primary: "#111111", // Dark background
          secondary: "#181818", // Slightly lighter shade for contrast
          hover: "#1C1C1C", // White for text and important elements
        },

        // Custom colors for accents
        colors: {
          color: {
            primary: "#845EC2", // Main violet color
            light: "#B5A3D0", // Lighter shade for hover effects
            dark: "#5A3F8F", // Darker shade for shadows
          },
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
