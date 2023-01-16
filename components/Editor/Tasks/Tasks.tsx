import React, { useState } from "react";
import { Task } from "../../../shared/interfaces/collection";
import { BiLeftArrowCircle, BiTrash, BiPlus, BiEditAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getListCompletionRate, getSelectedCollection, getSelectedList } from "../../../selectors/selectors";
import TaskItem from "./TaskItem";
import { openDeleteListModal, setIsAddingTask, unselectList } from "../../../reducers/UIStateSlice";

import AddTaskItem from "./AddTaskItem";
import Confetti from "react-confetti";
import { swapTasksPosition, updateList } from "../../../actions/collectionsActions";
import axios from "axios";
import { API_URL } from "../../../config";

export default function Tasks() {
     const dispatch = useDispatch();
     const [isEditingTitle, setIsEditingTitle] = useState(false);
     const list = useSelector(getSelectedList);
     const collection = useSelector(getSelectedCollection);
     const completionRate = useSelector(getListCompletionRate);
     const [dragId, setDragId] = useState();
     const [showOnlyIncomplete, setShowOnlyIncomplete] = useState(false);
     const handleDrag = (ev: any) => {
          setDragId(ev.currentTarget.id);
     };

     const handleDrop = async (ev: any) => {
          if (!list?.tasks) return;

          const dragTaskIndex = list?.tasks.findIndex((task) => task._id === dragId);
          const dropTaskIndex = list?.tasks.findIndex((task) => task._id === ev.currentTarget.id);

          dispatch(
               swapTasksPosition({
                    collection_id: collection?._id,
                    list_id: list._id,
                    firstIndex: dragTaskIndex,
                    secondIndex: dropTaskIndex,
               })
          );

          console.log(list.tasks);

          axios.patch(API_URL + "collections/lists", {
               collection_id: collection?._id,
               list_id: list._id,
               swap: { firstIndex: dragTaskIndex, secondIndex: dropTaskIndex },
          });
     };

     const handleBackButtonClick = () => {
          dispatch(unselectList());
     };

     const handleShowincompletedClick = (e: any) => {
          setShowOnlyIncomplete(e.target.checked);
     };

     const handleUpdateTitle = async (e: any) => {
          e.preventDefault();
          const target = e.target as typeof e.target & {
               name: { value: string };
          };
          if (!target.name.value) {
               return;
          }

          const { data } = await axios.patch(API_URL + "collections/lists", {
               collection_id: collection?._id,
               list_id: list?._id,
               name: target.name.value,
          });

          if (data.success) {
               dispatch(
                    updateList({
                         collection_id: collection?._id,
                         list_id: list?._id,
                         value: { name: target.name.value },
                    })
               );
               setIsEditingTitle(false);
          }
     };

     return (
          <div
               className={`h-full w-full
           bg-white dark:bg-slate-900 dark:text-white 
           shadow-xl
           flex flex-col 
           absolute top-0 left-0
           duration-500 transition-transform ease-in-out
           back will-change-transform
           ${list ? "translate-x-0" : "translate-x-full"} transform-gpu
           `}
          >
               <div className="absolute w-full h-full top-0 left-0 pointer-events-none">
                    {completionRate === 1 && <Confetti gravity={0.2} recycle={false} />}
               </div>

               <div className="flex flex-row items-center justify-between pt-10 px-20">
                    <div className="flex flex-row items-center gap-8">
                         <BiLeftArrowCircle
                              className={`h-7 w-7
                                   transition-all duration-200 
                                   cursor-pointer 
                                   opacity-50 dark:text-white hover:opacity-100`}
                              onClick={handleBackButtonClick}
                         />
                         <h1 className="font-bold text-2xl dark:text-white flex">
                              {collection?.name}
                              <span className="opacity-50">&nbsp;-&nbsp;</span>
                              <div className="font-bold text-2xl dark:text-white flex gap-5 items-center">
                                   {isEditingTitle ? (
                                        <form onSubmit={handleUpdateTitle}>
                                             <input
                                                  type="text"
                                                  onBlur={(e: any) => e.target.form.requestSubmit()}
                                                  required
                                                  defaultValue={list?.name}
                                                  autoFocus
                                                  name="name"
                                                  className=" dark:text-white bg-transparent"
                                             ></input>
                                        </form>
                                   ) : (
                                        <>
                                             <span className="opacity-50">{list?.name}</span>
                                             <BiEditAlt className="btn" onClick={() => setIsEditingTitle(true)} />
                                        </>
                                   )}
                              </div>
                         </h1>
                    </div>
                    <div className="flex flex-row items-center gap-10 font-medium">
                         <div className="flex flex-row items-center font-medium">
                              <label className="relative inline-flex items-center cursor-pointer">
                                   <input
                                        type="checkbox"
                                        value=""
                                        className="sr-only peer"
                                        onChange={handleShowincompletedClick}
                                   />
                                   <div className="w-10 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[50%] after:-translate-y-2/4 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                   <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                        Hide completed
                                   </span>
                              </label>
                         </div>
                         <div
                              className="flex flex-row items-center gap-2 btn font-medium !text-red-600"
                              onClick={() => dispatch(openDeleteListModal())}
                         >
                              <BiTrash className="w-5 h-5" />
                              <span>Delete list</span>
                         </div>
                    </div>
               </div>

               <div className="flex flex-row gap-5 items-center mt-5 pl-20">
                    <div className="opacity-50 w-5 flex justify-center items-center font-semibold text-sm">
                         <span>{completionRate * 100}%</span>
                    </div>
                    <div className="w-1/4 h-2 relative bg-slate-100 dark:bg-slate-600 rounded-full">
                         <div
                              className={`absolute w-full h-full top-0 left-0
                         rounded-full
                         transition-all duration-1000 ease-in-out
                     bg-slate-400 dark:bg-slate-100`}
                              style={{ width: completionRate * 100 + "%" }}
                         ></div>
                    </div>
               </div>

               <div className="mt-16 px-20 ml-10 dark:text-white flex flex-col gap-5 overflow-y-auto overflow-x-hidden">
                    {list?.tasks.map((task: Task) => {
                         if (showOnlyIncomplete && task.completed) return;
                         return (
                              <TaskItem key={task._id} id={task._id} handleDrag={handleDrag} handleDrop={handleDrop} />
                         );
                    })}
                    <AddTaskItem />

                    <div
                         className={`flex gap-3 text-lg justify-between 
                         
                         transition-all duration-300 
                         hover:bg-slate-100 dark:hover:bg-slate-700 shadow-md 
                         p-3 rounded-xl w-2/3 mb-5
                         border-2 border-slate-400
                         btn
                         `}
                         onClick={() => dispatch(setIsAddingTask(true))}
                    >
                         <div className="flex gap-3 items-center">
                              <div className="w-7 h-7 flex justify-center items-center">
                                   <BiPlus className="w-6 h-6" />
                              </div>
                              <span>New task</span>
                         </div>
                    </div>
               </div>
          </div>
     );
}
