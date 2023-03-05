import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
import ListsMenu from "./ListsMenu/ListsMenu";
import { getSelectedCollection } from "../../selectors/selectors";
import Tasks from "./Tasks/Tasks";
import { RootState } from "../../reducers";
import CollectionItem from "./CollectionItem";
import AddCollectionItem from "./AddCollectionItem";

export default function Editor() {
     const collection = useSelector(getSelectedCollection);
     const collections = useSelector((state: RootState) => state.collections);

     if (collection)
          return (
               <div className="w-full h-full relative overflow-hidden">
                    <ListsMenu />
                    <Tasks />
               </div>
          );

     return (
          <div className="w-full h-full flex justify-center pt-5 lg:pt-0 lg:items-center dark:text-white">
               <span className="hidden lg:inline-block">
                    Select or create a collection to get started
               </span>
               <div className="lg:hidden gap-5 w-fit dark:text-white grid grid-cols-1 pt-6 p-5 pb-50 h-fit">
                    {!collections.loading &&
                         collections.data.map(
                              (collection: {
                                   name: string;
                                   color: string;
                                   _id: string;
                              }) => {
                                   return (
                                        <CollectionItem
                                             name={collection.name}
                                             color={collection.color}
                                             id={collection._id}
                                             key={collection._id}
                                        />
                                   );
                              }
                         )}
                    <AddCollectionItem />
               </div>
          </div>
     );
}
