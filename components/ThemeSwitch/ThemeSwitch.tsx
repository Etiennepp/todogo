import React, { useEffect, useState } from "react";
import { BiSun, BiMoon } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../reducers/index";
import { SwitchTheme } from "../../actions/themeActions";

export default function ThemeSwitch() {
     const theme = useSelector((state: RootState) => state.theme);
     const dispatch = useDispatch();

     const handleClick: Function = () => {
          dispatch(SwitchTheme());
     };

     return (
          <div className="h-9 w-9 relative  rounded overflow-hidden cursor-pointer" onClick={() => handleClick()}>
               <div
                    className={`absolute transition-all duration-200 h-fit ${
                         theme === "LIGHT" ? "top-0" : "-top-full"
                    }`}
               >
                    <div className="h-9 w-9 flex justify-center items-center bg-slate-300">
                         <BiMoon className="h-6 w-6" />
                    </div>
                    <div className="h-9 w-9 flex justify-center items-center bg-slate-800">
                         <BiSun className="h-6 w-6 text-white" />
                    </div>
               </div>
               <div className="absolute w-full h-full shadow-inner"></div>
          </div>
     );
}
