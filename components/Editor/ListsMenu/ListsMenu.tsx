import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedListId, unselectCollection } from "../../../actions/collectionsActions";
import { getSelectedCollection } from "../../../selectors/selectors";
import { BiXCircle } from "react-icons/bi";

export default function ListsMenu() {
     const dispatch = useDispatch();
     const collection = useSelector(getSelectedCollection);

     const handleClick = (id: string) => {
          dispatch(setSelectedListId(id));
     };

     const handleUnselectCollection = () => {
          dispatch(unselectCollection());
     };

     return (
          <div className="h-full w-full dark:text-white flex flex-col py-10 px-20">
               <div className="flex flex-row items-center gap-8">
                    <BiXCircle
                         className={`h-7 w-7
                         transition-all duration-200 
                                   cursor-pointer 
                                   opacity-50 dark:text-white hover:opacity-100`}
                         onClick={handleUnselectCollection}
                    />
                    <h1 className="font-bold text-2xl dark:text-white">{collection?.name}</h1>
               </div>
               <div className="h-full w-full dark:text-white flex flex-col pt-6 items-center">
                    {collection?.lists.map((list: any) => {
                         return (
                              <div
                                   key={list._id}
                                   className={"cursor-pointer p-3 bg-slate-300"}
                                   onClick={() => handleClick(list._id)}
                              >
                                   {list.name}
                              </div>
                         );
                    })}
               </div>
          </div>
     );
}
