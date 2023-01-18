import React from "react";
import { BiEditAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setEditCollectionId, setSelectedCollectionId } from "../../reducers/UIStateSlice";
import { getCollectionById } from "../../selectors/selectors";
interface CollectionProps {
     name: string;
     color: string;
     id: string;
}
export default function CollectionItem({ name, color, id }: CollectionProps) {
     const dispatch = useDispatch();
     const collection = useSelector(getCollectionById(id));
     const handleClick = () => {
          dispatch(setSelectedCollectionId(id));
     };
     return (
          <div
               onClick={handleClick}
               className={`w-full flex items-center gap-10 relative bg-slate-200 dark:bg-slate-800 shadow-lg rounded-xl
               group
               px-8 py-4 cursor-pointer bg-transparent 
               transition-all duration-200 
               hover:bg-slate-300 dark:hover:bg-slate-800  text-xl`}
          >
               <div className="rounded-xl w-16 h-16 shrink-0 " style={{ background: color }}></div>

               <div className="flex flex-col justify-between h-full py-2">
                    <p className="font-semibold inline-block h-fit dark:text-white overflow-hidden text-ellipsis whitespace-nowrap">
                         {name}
                    </p>
                    <span className="opacity-60 font-semibold">{collection?.lists.length} lists</span>
               </div>

               <BiEditAlt
                    onClick={(e) => {
                         e.stopPropagation();
                         dispatch(setEditCollectionId(id));
                    }}
                    className="w-8 h-8 shrink-0 ml-auto transition-all duration-200 cursor-pointer dark:text-white"
               />
          </div>
     );
}
