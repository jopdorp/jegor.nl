import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'secondary': '#5938A2', // Vibrant orange for a secondary color with a modern twist
        'secondary-dark': '#CC7A1B',
        'primary': '#6E45C0', // Deep purple, more sophisticated and less whimsical than light purple
        'primary-dark': '#FF9F45',
        'tertiary': '#CCC5B9', // Cooler gray with a slight brown tone to maintain warmth without being too peach-like
        'tertiary-dark': '#4C5760', // Darker version for contrast in dark mode, avoiding harsh blues or greens
        'background': '#FFF6E3', // Very light cream background to support vibrant colors
        'background-dark': '#1C1B19', // Dark gray for a modern dark mode that feels less oppressive
        'foreground': '#3D3D3D', // Slightly darker neutral gray, more balanced than black
        'foreground-dark': '#F0E6D2', // Bright white in dark mode to prevent eye strain
        'text': '#1A1A1A', // Dark text for better contrast on light backgrounds
        'text-dark': '#CCC5B9', // Lighter gray in dark mode, more balanced and less harsh
      },
      screens: {
        dark: { raw: "(prefers-color-scheme: dark)" }, // Add a new screen for dark mode
      },
    },
  },
  darkMode: 'class', // Enable dark mode based on the presence of a class
};

export default config;
