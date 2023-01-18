import React from "react";
import { BiEditAlt, BiPlus } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { openNewCollectionModal } from "../../reducers/UIStateSlice";
import { getCollectionById } from "../../selectors/selectors";

export default function AddCollectionItem() {
     const dispatch = useDispatch();
     return (
          <div
               onClick={() => dispatch(openNewCollectionModal())}
               className={`w-full flex items-center gap-10 relative bg-slate-200 dark:bg-slate-800 shadow-lg rounded-xl
               group
               px-8 py-4 cursor-pointer bg-transparent 
               transition-all duration-200 
               hover:bg-slate-300 dark:hover:bg-slate-800  text-xl  border-dashed border-2`}
          >
               <div className="flex flex-row items-center gap-5 w-full h-16 py-2">
                    <BiPlus className="h-full w-10" />
                    <span>New collection</span>
               </div>
          </div>
     );
}
