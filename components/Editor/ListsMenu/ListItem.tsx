import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openDeleteListModal, setEditListId, setSelectedListId } from "../../../reducers/UIStateSlice";
import { getListById, getListCompletedTaskCount } from "../../../selectors/selectors";
import TimeAgo from "react-timeago";
import { BiCheck, BiDotsHorizontalRounded, BiEditAlt, BiTrash } from "react-icons/bi";
import useOutsideClick from "../../../hooks/useOutsideClick";

export default function ListItem({ id }: { id: string }) {
     const list = useSelector(getListById(id));
     const completedTasksCount = useSelector(getListCompletedTaskCount(id));
     const dispatch = useDispatch();
     const menuButton = useRef<any>(null);
     const menu = useRef<any>(null);
     const [isMenuOpen, setIsMenuOpen] = useState(false);

     useOutsideClick(menu, (el: Node) => {
          if (menuButton.current && !menuButton.current.contains(el) && isMenuOpen) setIsMenuOpen(false);
     });

     const handleClick = () => {
          dispatch(setSelectedListId(id));
     };

     const handleMenuClick = (e: React.SyntheticEvent) => {
          e.preventDefault();
          e.stopPropagation();
          setIsMenuOpen(!isMenuOpen);
     };

     const handleDelete = () => {
          setSelectedListId(id);
          dispatch(openDeleteListModal());
     };

     const handleEdit = (e: React.SyntheticEvent) => {
          e.preventDefault();
          e.stopPropagation();
          dispatch(setEditListId(list?._id));
     };

     return (
          <div
               className={
                    "cursor-pointer relative shadow-md p-4 text-white gap-4 md:gap-0 w-64 md:w-44 md:h-44 rounded-xl flex flex-col transition-all duration-200 justify-between hover:scale-105"
               }
               style={{ backgroundColor: list?.color }}
               onClick={handleClick}
               onMouseLeave={() => setIsMenuOpen(false)}
          >
               {isMenuOpen && (
                    <div
                         ref={menu}
                         className="absolute overflow-hidden top-8 right-2 rounded-lg z-40 bg-slate-100 text-black dark:bg-slate-700 dark:text-white flex flex-col"
                    >
                         <button
                              onClick={(e) => handleEdit(e)}
                              className="flex transition-all duration-200 items-center pl-5 p-3 pr-10 gap-2 hover:bg-slate-200 dark:hover:bg-slate-800"
                         >
                              <BiEditAlt /> Edit
                         </button>
                         <button
                              onClick={handleDelete}
                              className="flex transition-all duration-200 items-center pl-5 p-3 pr-10 gap-2 hover:bg-slate-200 dark:hover:bg-slate-800"
                         >
                              <BiTrash /> Delete
                         </button>
                    </div>
               )}
               <div className="flex flex-1 flex-row justify-between overflow-hidden">
                    <div className="flex flex-col gap-1 overflow-hidden">
                         <span className="text-2xl shrink-0">{list?.emoji}</span>
                         <span className="text-md font-semibold break-words text-ellipsis overflow-hidden shrink-1 shrink-1">
                              {list?.name}
                         </span>
                         <span>
                              {list?.createdAt && (
                                   <TimeAgo className="opacity-60 text-sm shrink-0" date={list?.createdAt} />
                              )}
                         </span>
                    </div>
                    <div className="relative h-fit overflow-visible" ref={menuButton} onClick={handleMenuClick}>
                         <BiDotsHorizontalRounded className="w-6 h-6 btn shrink-0" />
                    </div>
               </div>
               <div className="flex flex-row justify-between items-center">
                    <span className={`${!completedTasksCount && "opacity-60"}`}>
                         {list?.tasks && list?.tasks?.length > 0
                              ? completedTasksCount + " of " + list?.tasks.length
                              : "Empty"}
                    </span>
                    <div className="relative">
                         <svg className="w-8 h-8">
                              <circle
                                   className=" text-gray-200 opacity-50"
                                   strokeWidth="4"
                                   stroke="currentColor"
                                   fill="transparent"
                                   r="12"
                                   cx="16"
                                   cy="16"
                              />
                              <circle
                                   className="text-white"
                                   stroke-width="4"
                                   stroke-dasharray="75"
                                   stroke-dashoffset={
                                        completedTasksCount && list?.tasks
                                             ? 75 - (completedTasksCount / list?.tasks.length) * 75
                                             : 75
                                   }
                                   stroke="currentColor"
                                   fill="transparent"
                                   r="12"
                                   cx="16"
                                   cy="16"
                              />
                         </svg>

                         {completedTasksCount === list?.tasks.length && completedTasksCount ? (
                              <BiCheck className="absolute w-full h-full p-2 text-white top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4" />
                         ) : (
                              ""
                         )}
                    </div>
               </div>
          </div>
     );
}
