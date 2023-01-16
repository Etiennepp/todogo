/** @type {import('tailwindcss').Config} */
module.exports = {
     content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
     darkMode: "class",
     theme: {
          extend: {
               keyframes: {
                    checkbox: {
                         "0%": { transform: "scale(0) rotate(0)" },
                         "70%": { transform: "scale(1.5) rotate(5deg)" },
                         "100%": { transform: "scale(1) rotate(0)" },
                    },
               },
               animation: {
                    checkbox: "checkbox .2s ease-in forwards",
               },
          },
     },
     plugins: [],
};
