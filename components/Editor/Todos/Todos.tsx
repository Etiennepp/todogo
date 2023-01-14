import React, { useEffect } from "react";
import { Collection, List, Todo } from "../../../shared/interfaces/collection";
import { BiLeftArrowCircle } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { unselectList } from "../../../actions/collectionsActions";
import { getSelectedCollection, getSelectedList } from "../../../selectors/selectors";

export default function Todos() {
     const dispatch = useDispatch();
     const list = useSelector(getSelectedList);
     const collection = useSelector(getSelectedCollection);

     const handleBackButtonClick = () => {
          dispatch(unselectList());
     };

     return (
          <div className="h-full w-full dark:text-white flex flex-col py-10 px-20">
               <div className="flex flex-row items-center gap-8">
                    <BiLeftArrowCircle
                         className={`h-7 w-7
                                   transition-all duration-200 
                                   cursor-pointer 
                                   opacity-50 dark:text-white hover:opacity-100`}
                         onClick={handleBackButtonClick}
                    />
                    <h1 className="font-bold text-2xl dark:text-white">
                         {collection?.name}
                         <span className="font-bold text-2xl dark:text-white opacity-50"> - {list?.name}</span>
                    </h1>
               </div>

               <div className="h-full w-full dark:text-white flex flex-col pt-6 items-center">
                    {list?.todos.map((todo: Todo) => {
                         return (
                              <div key={todo._id} className={"cursor-pointer p-3 bg-slate-300"}>
                                   {todo.name}
                              </div>
                         );
                    })}
               </div>
          </div>
     );
}
