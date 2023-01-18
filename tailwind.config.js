/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
     content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
     darkMode: "class",
     theme: {
          screens: {
               xs: "475px",
               ...defaultTheme.screens,
          },
          extend: {
               keyframes: {
                    checkbox: {
                         "0%": { transform: "scale(0) rotate(0)" },
                         "70%": { transform: "scale(1.5) rotate(5deg)" },
                         "100%": { transform: "scale(1) rotate(0)" },
                    },
                    modal: {
                         "0%": { opacity: "0" },
                         "100%": { opacity: "1" },
                    },
                    list_menu: {
                         "0%": { transform: "translateX(100%)" },
                         "100%": { transform: "translateX(0)" },
                    },
               },
               animation: {
                    checkbox: "checkbox .2s ease-in forwards",
                    modal: "modal .2s ease-in forwards",
                    list_menu: "list_menu .5s ease-in-out forwards",
               },
          },
     },
     plugins: [require("tailwind-scrollbar")],
     variants: {
          scrollbar: ["rounded"],
     },
};
