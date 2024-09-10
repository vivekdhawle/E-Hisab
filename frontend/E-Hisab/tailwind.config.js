/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderWidth:{
        "1":"0.5px"
      },
      colors: {
        'zinc-850': '#1f2937', // Add your custom color here
      },
    },
  },
  plugins: [],
}

