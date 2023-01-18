import React, { useState } from "react";
import CollectionListItem from "./CollectionListItem/CollectionListItem";
import { BiArrowFromRight, BiArrowFromLeft, BiCog } from "react-icons/bi";
import AddCollectionButton from "./CollectionListItem/AddCollectionButton";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers/index";

export default function Sidebar() {
     const [open, setOpen] = useState<Boolean>(true);
     const collections = useSelector((state: RootState) => state.collections);

     return (
          <>
               <aside
                    className={`w-64 hidden lg:flex bg-gray-200 dark:bg-slate-700 flex-col justify-between relative z-10 pt-5 shadow-lg ${
                         !open && "hidden"
                    }`}
               >
                    <div className="flex flex-col flex-1 overflow-hidden">
                         <h2 className="font-bold opacity-30 dark:text-white mb-3 px-8">Collections</h2>
                         <div className="overflow-x-hidden overflow-y-auto">
                              <div>
                                   {!collections.loading &&
                                        collections.data.map(
                                             (collection: { name: string; color: string; _id: string }) => {
                                                  return (
                                                       <CollectionListItem
                                                            name={collection.name}
                                                            color={collection.color}
                                                            id={collection._id}
                                                            key={collection._id}
                                                       />
                                                  );
                                             }
                                        )}
                              </div>
                         </div>
                         <AddCollectionButton />
                    </div>
                    <div className="flex justify-between w-full p-5">
                         <BiCog className="h-7 w-7 cursor-pointer transition-all duration-200 opacity-50 dark:text-white hover:opacity-100" />
                         <BiArrowFromRight
                              className="h-7 w-7 transition-all duration-200 cursor-pointer opacity-50 dark:text-white hover:opacity-100"
                              onClick={() => setOpen(false)}
                         />
                    </div>
               </aside>
               <BiArrowFromLeft
                    className={`absolute ${
                         open && "hidden"
                    } bottom-5 left-5 h-7 w-7 transition-all duration-200 cursor-pointer opacity-50 dark:text-white hover:opacity-100 z-10`}
                    onClick={() => setOpen(true)}
               />
          </>
     );
}
