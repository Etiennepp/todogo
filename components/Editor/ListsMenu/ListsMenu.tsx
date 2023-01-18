import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedCollection } from "../../../selectors/selectors";
import { BiXCircle, BiTrash } from "react-icons/bi";
import { openCreateListModal, openDeleteCollectionModal, unselectCollection } from "../../../reducers/UIStateSlice";
import ListItem from "./ListItem";
import AddListButton from "./AddListButton";

export default function ListsMenu() {
     const dispatch = useDispatch();
     const collection = useSelector(getSelectedCollection);

     const handleUnselectCollection = () => {
          dispatch(unselectCollection());
     };

     return (
          <div
               className={`absolute top-0 left-0 h-full w-full 
               dark:text-white flex flex-col
               anima animate-list_menu
           `}
          >
               <div className="flex flex-row items-center justify-between px-20 h-20 shadow-sm shrink-0">
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
                    <div
                         className="flex flex-row items-center gap-2 btn font-medium !text-red-600"
                         onClick={() => dispatch(openDeleteCollectionModal())}
                    >
                         <BiTrash className="w-5 h-5" />
                         <span className="hidden sm:inline">Delete collection</span>
                    </div>
               </div>
               <div className="overflow-y-auto flex justify-center lg:scrollbar lg:scrollbar-thumb-slate-700 lg:scrollbar-track-slate-200 lg:scrollbar-thumb-rounded-full lg:scrollbar-track-rounded-full">
                    <div className="gap-5 w-fit dark:text-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 pt-6 p-5 pb-50 h-fit">
                         {collection && collection?.lists?.length > 0 ? (
                              <>
                                   {collection?.lists.map((list: any) => {
                                        return <ListItem id={list._id} key={list._id} />;
                                   })}
                                   <AddListButton />
                              </>
                         ) : (
                              <div className="h-full w-full absolute top-0 left-0 pointer-events-none dark:text-white flex flex-col justify-center items-center">
                                   <div className="pointer-events-auto">
                                        <AddListButton />
                                   </div>
                              </div>
                         )}
                    </div>
               </div>
          </div>
     );
}
