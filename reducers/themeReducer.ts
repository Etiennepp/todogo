import { Action } from "@reduxjs/toolkit";

// const initialTheme = localStorage.getItem("theme") || "LIGHT";

export default (state = "DARK", action: Action) => {
     switch (action.type) {
          case "theme/switch":
               if (state === "LIGHT") return "DARK";
               else return "LIGHT";
          default:
               return state;
     }
};
