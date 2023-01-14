import React from "react";
import { BiPlus } from "react-icons/bi";
export default function AddButton() {
     return (
          <div className="w-7 h-7 rounded-lg cursor-pointer bg-slate-500 flex items-center justify-center bg-gradient-to-bl from-red-500 to-purple-600">
               <BiPlus className="text-white" />
          </div>
     );
}
