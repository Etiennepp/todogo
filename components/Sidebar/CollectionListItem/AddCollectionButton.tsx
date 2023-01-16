import React from "react";
import { BiPlus } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { openNewCollectionModal } from "../../../reducers/UIStateSlice";

export default function AddCollectionButton() {
     const dispatch = useDispatch();

     return (
          <div className="w-full px-7 py-4">
               <div
                    onClick={() => dispatch(openNewCollectionModal())}
                    className="flex p-2 items-center gap-3 rounded-2xl border-dashed border-2 hover:border-spacing-2 border-black dark:border-white  cursor-pointer bg-transparent transition-all duration-200 hover:bg-slate-300 dark:hover:bg-slate-800 opacity-50 "
               >
                    <BiPlus className="rounded w-8 h-8 p-1 dark:text-white" />
                    <p className="font-semibold inline-block h-fit dark:text-white">New collection</p>
               </div>
          </div>
     );
}
