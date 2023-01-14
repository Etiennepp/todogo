import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import _ from "lodash";
import ListsMenu from "./ListsMenu/ListsMenu";
import Todos from "./Todos/Todos";
import { getSelectedCollection, getSelectedList } from "../../selectors/selectors";

export default function Editor() {
     const list = useSelector(getSelectedList);
     const collection = useSelector(getSelectedCollection);

     if (collection && list)
          return (
               <div className="w-full h-full dark:text-white flex flex-row">
                    <Todos />
               </div>
          );

     if (collection)
          return (
               <div className="w-full h-full dark:text-white flex flex-row">
                    <ListsMenu />
               </div>
          );

     return (
          <div className="w-full h-full flex justify-center items-center dark:text-white opacity-50">
               <span>Select or create a collection to get started</span>
          </div>
     );
}
