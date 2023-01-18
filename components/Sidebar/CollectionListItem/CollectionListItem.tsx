import axios from "axios";
import React, { useState } from "react";
import { BiEditAlt, BiCheck } from "react-icons/bi";
import { API_URL } from "../../../config";
import { useSelector, useDispatch } from "react-redux";
import { updateCollection } from "../../../actions/collectionsActions";
import { getSelectedCollection } from "../../../selectors/selectors";
import { setEditCollectionId, setSelectedCollectionId } from "../../../reducers/UIStateSlice";
import collection from "../../../models/collection";

interface CollectionProps {
     name: string;
     color: string;
     id: string;
}

export default function CollectionListItem({ name, color, id }: CollectionProps) {
     const dispatch = useDispatch();
     const selectedCollection = useSelector(getSelectedCollection);

     const handleClick = () => {
          dispatch(setSelectedCollectionId(id));
     };

     return (
          <div
               onClick={handleClick}
               className={`w-full flex items-center gap-3 relative
               group
               px-8 py-4 cursor-pointer bg-transparent 
               transition-all duration-200 
               hover:bg-slate-300 dark:hover:bg-slate-800
               ${selectedCollection?._id === id ? "bg-slate-300 dark:bg-slate-800" : ""}`}
          >
               <div className="rounded w-8 h-8 shrink-0 " style={{ background: color }}></div>

               <p className="font-semibold inline-block h-fit dark:text-white overflow-hidden text-ellipsis whitespace-nowrap">
                    {name}
               </p>
               <BiEditAlt
                    onClick={(e) => {
                         e.stopPropagation();
                         dispatch(setEditCollectionId(id));
                    }}
                    className="w-6 h-6 shrink-0 ml-auto transition-all duration-200 cursor-pointer opacity-0 group-hover:opacity-50 dark:text-white hover:!opacity-100"
               />

               <div
                    className={`absolute right-0
                bg-slate-800 dark:bg-slate-300
                 w-2 h-full
                 transition-all duration-200 ${selectedCollection?._id === id ? "opacity-100" : "opacity-0"}
                 `}
               ></div>
          </div>
     );
}
