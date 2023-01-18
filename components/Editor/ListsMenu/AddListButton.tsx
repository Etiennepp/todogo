import React from "react";
import { BiPlus } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { openCreateListModal } from "../../../reducers/UIStateSlice";

export default function AddListButton() {
     const dispatch = useDispatch();

     const handleClick = () => {
          dispatch(openCreateListModal());
     };

     return (
          <div
               className={
                    "cursor-pointer flex flex-col items-center justify-center border-dashed border-2 pb-10 border-slate-400 w-64 h-64 md:w-44 md:h-44  rounded-xl btn"
               }
               onClick={handleClick}
          >
               <BiPlus className="w-7 h-7" />
               Create list
          </div>
     );
}
