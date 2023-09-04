/** @type {import('tailwindcss').Config} */
export default {
  purge: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans'], // Add your preferred fonts here
      },
      colors: {
        primary: '#FF5733', // Define your custom color palette
        secondary: '#3A3A3A',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    // Add any additional Tailwind CSS plugins here
    // Example: require('@tailwindcss/forms'),
  ],
};
