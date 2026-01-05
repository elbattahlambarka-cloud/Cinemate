// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 1. Color Palette
      colors: {
        'primary': '#0D1520',      // Very dark blue from the header/footer area
        'secondary': '#161F2E',    // Slightly lighter dark blue for cards/containers
        'accent': '#E11D48',       // Vibrant pink/red from badges and highlights
        'background': '#0F172A',   // Dark blue-black for the main page background
        'surface': '#1E293B',      // Slate color for elevated surfaces
        'text-primary': '#F8FAFC', // Very light grey/off-white for main text
        'text-secondary': '#CBD5E1', // Muted grey for secondary text/placeholders
        'text-accent': '#38BDF8',  // Light blue for subtle accents or links
        'border': '#334155',       // Grey for borders and dividers
        'mood-active': '#10B981',  // Emerald green for selected mood option
      },
      // 2. Typography
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],     // Clean, modern font for body
        'heading': ['Poppins', 'system-ui', 'sans-serif'], // Distinct font for titles
      },
      // 3. Custom Spacing/Container Size
      maxWidth: {
        'screen-2xl': '1400px', // A common max-width for large containers
      },
      // 4. Border Radius (common values)
      borderRadius: {
        'custom-card': '1rem',      // For main content cards (like mood selector)
        'custom-button': '0.75rem', // For search button and primary buttons
        'custom-input': '0.75rem',  // For the search input field
      },
      // 5. Box Shadow
      boxShadow: {
        'card': '0 10px 25px -5px rgba(0, 0, 0, 0.3)', // Subtle shadow for cards
      }
    },
  },
  plugins: [],
}