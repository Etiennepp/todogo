import { Action } from "@reduxjs/toolkit";

export default (state: string = "DARK", action: Action) => {
     switch (action.type) {
          case "theme/switch":
               if (state === "LIGHT") return "DARK";
               else return "LIGHT";
          default:
               return state;
     }
};
