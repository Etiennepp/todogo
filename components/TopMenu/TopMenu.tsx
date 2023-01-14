import React, { useState, useRef } from "react";
import { BiSearch, BiArrowFromRight } from "react-icons/bi";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";
import useOutsideClick from "../../hooks/useOutsideClick";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function TopMenu() {
     const { user } = useUser();
     const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
     const ProfileMenuButton = useRef<any>();
     const ProfileMenu = useRef<any>();

     useOutsideClick(ProfileMenu, (el: Node) => {
          if (ProfileMenuButton.current && !ProfileMenuButton.current.contains(el)) setIsProfileMenuOpen(false);
     });

     const handleProfileClick = () => {
          setIsProfileMenuOpen(!isProfileMenuOpen);
     };

     return (
          <div className="container bg-gray-200 dark:bg-slate-700 h-16 flex flex-row justify-between align-middle items-center px-8 shadow-md relative z-20">
               {/* <span className="font-regular text-3xl flex-1 block dark:text-white">TodoGo</span> */}
               <img src="/logo.svg" className="h-9" />
               <div className="flex-row gap-6 items-center hidden md:visible md:flex relative ml-auto">
                    <BiSearch className="w-7 h-7 cursor-pointer dark:text-white" />
                    <ThemeSwitch />
                    <img
                         className="w-10 h-10 rounded-full bg-amber-500 cursor-pointer"
                         src={user?.picture || undefined}
                         onClick={handleProfileClick}
                         alt={user?.name || undefined}
                         ref={ProfileMenuButton}
                    />
                    <div
                         className={`absolute right-0 py-3 flex flex-col gap-5 px-5 pr-14 top-full m-1 bg-gray-300 rounded  dark:bg-slate-800 ${
                              !isProfileMenuOpen && "hidden"
                         }`}
                         ref={ProfileMenu}
                    >
                         <span className="whitespace-nowrap dark:text-white font-semibold">{user?.name} </span>
                         <button
                              className="flex items-center justify-center transition-all duration-200 hover:bg-slate-400 dark:hover:bg-slate-700 rounded-xl p-2 gap-2 dark:text-white bg-slate-200 dark:bg-slate-900"
                              onClick={() => {
                                   const win: Window = window;
                                   win.location = "/api/auth/logout";
                              }}
                         >
                              <BiArrowFromRight />
                              Logout
                         </button>
                    </div>
               </div>
          </div>
     );
}
