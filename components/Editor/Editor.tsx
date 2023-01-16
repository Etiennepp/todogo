import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
import ListsMenu from "./ListsMenu/ListsMenu";
import { getSelectedCollection } from "../../selectors/selectors";
import Tasks from "./Tasks/Tasks";
import CreateCollectionModal from "../CreateCollectionModal/CreateCollectionModal";

export default function Editor() {
     const collection = useSelector(getSelectedCollection);

     if (collection)
          return (
               <div className="w-full h-full relative overflow-hidden">
                    <ListsMenu />
                    <Tasks />
               </div>
          );

     return (
          <div className="w-full h-full flex justify-center items-center dark:text-white opacity-50">
               <span>Select or create a collection to get started</span>
          </div>
     );
}
