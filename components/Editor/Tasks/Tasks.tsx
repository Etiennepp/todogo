import React, { useEffect, useRef, useState } from "react";
import { Task } from "../../../shared/interfaces/collection";
import { BiLeftArrowCircle, BiTrash, BiPlus, BiEditAlt, BiDotsHorizontalRounded } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getListCompletionRate, getSelectedCollection, getSelectedList } from "../../../selectors/selectors";
import TaskItem from "./TaskItem";
import { openDeleteListModal, setEditListId, setIsAddingTask, unselectList } from "../../../reducers/UIStateSlice";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { DropResult } from "react-beautiful-dnd";

import AddTaskItem from "./AddTaskItem";
import Confetti from "react-confetti";
import { updateTaskPosition } from "../../../actions/collectionsActions";
import axios from "axios";
import { API_URL } from "../../../config";
import useOutsideClick from "../../../hooks/useOutsideClick";

export default function Tasks() {
     const dispatch = useDispatch();
     const list = useSelector(getSelectedList);
     const collection = useSelector(getSelectedCollection);
     const completionRate = useSelector(getListCompletionRate);
     const [showOnlyIncomplete, setShowOnlyIncomplete] = useState(false);
     const [showConfetti, setShowConfetti] = useState(false);
     const [isMenuOpen, setIsMenuOpen] = useState(false);
     const menu = useRef(null);

     useOutsideClick(menu, () => {
          setIsMenuOpen(false);
     });

     const firstUpdate = useRef(true);

     useEffect(() => {
          console.log("changed list");
          if (!list) {
               firstUpdate.current = true;
               setShowConfetti(false);
               return;
          }
          if (firstUpdate.current) {
               firstUpdate.current = false;
               return;
          }
          if (completionRate === 1) setShowConfetti(true);
     }, [list]);

     const handleDragEnd = (result: DropResult) => {
          const { destination, source } = result;
          if (!destination) return;
          if (destination.droppableId === source.droppableId && destination.index === source.index) return;
          dispatch(
               updateTaskPosition({
                    collection_id: collection?._id,
                    list_id: list?._id,
                    old_index: source.index,
                    new_index: destination.index,
               })
          );
          axios.patch(API_URL + "collections/lists", {
               collection_id: collection?._id,
               list_id: list?._id,
               move: { source: source.index, destination: destination.index },
          });
     };

     const handleBackButtonClick = () => {
          dispatch(unselectList());
     };

     const handleShowincompletedClick = (e: any) => {
          setShowOnlyIncomplete(e.target.checked);
     };

     return (
          <div
               className={`h-full w-full
           bg-white dark:bg-slate-900 dark:text-white 
           shadow-xl
           flex flex-col 
           absolute top-0 left-0
           duration-500 transition-transform ease-in-out
           will-change-transform
           ${list ? "translate-x-0" : "translate-x-full"} transform-gpu
           `}
          >
               <div className="absolute w-full h-full top-0 left-0 pointer-events-none">
                    {showConfetti && <Confetti gravity={0.2} recycle={false} />}
               </div>
               <div className="flex flex-col gap-5 md:gap-0 md:flex-row md:items-center md:justify-between pt-5 md:pt-10 px-6 md:px-20">
                    <div className="flex flex-row items-center gap-8">
                         <BiLeftArrowCircle
                              className={`h-7 w-7
                                   transition-all duration-200 
                                   cursor-pointer 
                                   opacity-50 dark:text-white hover:opacity-100`}
                              onClick={handleBackButtonClick}
                         />
                         <h1 className="font-bold text-2xl dark:text-white flex">
                              <span className="opacity-50 hidden md:inline">{collection?.name} -&nbsp;</span>
                              <div className="font-bold text-2xl dark:text-white flex gap-5 items-center">
                                   <span>
                                        {list?.name}&nbsp;{list?.emoji}
                                   </span>
                              </div>
                         </h1>
                    </div>
                    <div className="flex flex-row justify-between md:justify-start items-center gap-10 font-medium">
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

                         <div className="relative" onClick={() => setIsMenuOpen(true)}>
                              <BiDotsHorizontalRounded className="w-6 h-6 btn shrink-0" />
                              {isMenuOpen && (
                                   <div
                                        ref={menu}
                                        className="absolute shadow-md overflow-hidden top-8 right-2 rounded-lg z-40 bg-slate-100 text-black dark:bg-slate-700 dark:text-white flex flex-col"
                                   >
                                        <button
                                             onClick={(e) => dispatch(setEditListId(list?._id))}
                                             className="flex transition-all duration-200 items-center pl-5 p-3 pr-10 gap-2 hover:bg-slate-200 dark:hover:bg-slate-800"
                                        >
                                             <BiEditAlt /> Edit
                                        </button>
                                        <button
                                             onClick={() => dispatch(openDeleteListModal())}
                                             className="flex transition-all duration-200 items-center pl-5 p-3 pr-10 gap-2 hover:bg-slate-200 dark:hover:bg-slate-800"
                                        >
                                             <BiTrash /> Delete
                                        </button>
                                   </div>
                              )}
                         </div>
                    </div>
               </div>
               <div className="flex flex-row gap-5 items-center mt-5 px-8 md:px-0 md:pl-20">
                    <div className="opacity-50 w-5 flex justify-center items-center font-semibold text-sm">
                         <span>{completionRate * 100}%</span>
                    </div>
                    <div className="w-full md:w-1/4 h-2 relative bg-slate-100 dark:bg-slate-600 rounded-full">
                         <div
                              className={`absolute w-full h-full top-0 left-0
                         rounded-full
                         transition-all duration-1000 ease-in-out`}
                              style={{ width: completionRate * 100 + "%", backgroundColor: list?.color }}
                         ></div>
                    </div>
               </div>
               <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="tasksContainer">
                         {(provided) => (
                              <div
                                   {...provided.droppableProps}
                                   ref={provided.innerRef}
                                   className="mt-16 px-5 lg:px-20 lg:ml-10 dark:text-white overflow-y-auto overflow-x-hidden xl:scrollbar xl:scrollbar-thumb-slate-700 xl:scrollbar-track-slate-200 xl:scrollbar-thumb-rounded-full lg:scrollbar-track-rounded-full"
                              >
                                   {list?.tasks.map((task: Task, index: number) => {
                                        if (showOnlyIncomplete && task.completed) return;
                                        return <TaskItem key={task._id} id={task._id} index={index} />;
                                   })}
                                   <AddTaskItem />
                                   {provided.placeholder}

                                   <div
                                        className={`flex gap-3 text-lg justify-between 
                              
                              transition-all duration-300 
                              hover:bg-slate-100 dark:hover:bg-slate-700 shadow-md 
                              p-3 rounded-xl w-full xl:w-2/3 mb-5
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
                         )}
                    </Droppable>
               </DragDropContext>
          </div>
     );
}
