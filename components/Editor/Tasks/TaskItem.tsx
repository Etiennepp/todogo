import axios from "axios";
import { debounce } from "lodash";
import React, { useState } from "react";
import { BiCheck, BiEditAlt, BiTrash } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { removeTask, updateTask } from "../../../actions/collectionsActions";
import { API_URL } from "../../../config";
import { RootState } from "../../../reducers";
import { getSelectedCollection, getTaskById } from "../../../selectors/selectors";
import { Task } from "../../../shared/interfaces/collection";
import { MdOutlineDragIndicator } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";

export default function TaskItem({ id, index }: { id: Task["_id"]; index: number }) {
     const task = useSelector(getTaskById(id));
     const listId = useSelector((state: RootState) => state.uistate.selectedListId);
     const selectedCollection = useSelector(getSelectedCollection);

     const dispatch = useDispatch();
     const [isEditing, setIsEditing] = useState(false);

     const handleCheckboxClick = async (e: React.ChangeEvent<HTMLInputElement>) => {
          e.preventDefault();
          const value = e.target.checked;

          const { data } = await axios.patch(API_URL + "collections/tasks", {
               task_id: task?._id,
               collection_id: selectedCollection?._id,
               list_id: listId,
               completed: value,
          });
          if (data.success) {
               dispatch(
                    updateTask({
                         collection_id: selectedCollection?._id,
                         list_id: listId,
                         task_id: task?._id,
                         value: { completed: value },
                    })
               );
          }
     };

     const handleDelete = async () => {
          const { data } = await axios.delete(API_URL + "collections/tasks", {
               data: {
                    task_id: task?._id,
                    collection_id: selectedCollection?._id,
                    list_id: listId,
               },
          });

          if (data.success) {
               dispatch(removeTask({ collection_id: selectedCollection?._id, list_id: listId, task_id: task?._id }));
          }
     };

     const handleEdit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
          e.preventDefault();
          const target = e.target as typeof e.target & {
               name: { value: string };
          };
          if (!target.name.value) {
               return;
          }

          const { data } = await axios.patch(API_URL + "collections/tasks", {
               collection_id: selectedCollection?._id,
               list_id: listId,
               task_id: task?._id,
               name: target.name.value,
          });

          if (data.success) {
               dispatch(
                    updateTask({
                         collection_id: selectedCollection?._id,
                         list_id: listId,
                         task_id: task?._id,
                         value: { name: target.name.value },
                    })
               );
               setIsEditing(false);
          }
     };

     if (!task) return <></>;

     return (
          <Draggable draggableId={task._id} index={index}>
               {(provided) => (
                    <div
                         className="flex !top-auto !left-auto mb-5 gap-3 text-lg rounded-xl justify-between bg-slate-50 dark:bg-slate-800 transition-all duration-300 lg:hover:bg-slate-100 lg:dark:hover:bg-slate-600 shadow-md p-3 w-full xl:w-2/3"
                         id={id}
                         {...provided.draggableProps}
                         ref={provided.innerRef}
                    >
                         <div className="flex gap-3 items-center flex-1">
                              <label className="cursor-pointer border-2 border-slate-400 rounded-lg w-7 h-7 btn">
                                   <input
                                        type="checkbox"
                                        className="hidden"
                                        checked={task?.completed}
                                        onChange={handleCheckboxClick}
                                   />
                                   {task?.completed && <BiCheck className="w-full h-full animate-checkbox" />}
                              </label>

                              {isEditing ? (
                                   <form onSubmit={(e) => handleEdit(e)} className="flex-1">
                                        <input
                                             autoFocus
                                             type="text"
                                             name="name"
                                             placeholder="Task name"
                                             className=" dark:text-white w-full border-b-2 border-slate-500 bg-transparent outline-none"
                                             onBlur={(e: any) => e.target.form.requestSubmit()}
                                             defaultValue={task?.name}
                                             required
                                        ></input>
                                   </form>
                              ) : (
                                   <span
                                        onDoubleClick={() => setIsEditing(true)}
                                        className={`relative block line-through cursor-text ${
                                             task?.completed
                                                  ? "decoration-black dark:decoration-white opacity-60 delay-200"
                                                  : "decoration-transparent"
                                        }
                         transition-all duration-400`}
                                   >
                                        {task?.name}
                                   </span>
                              )}
                         </div>
                         <div className="flex gap-3">
                              <span {...provided.dragHandleProps}>
                                   <MdOutlineDragIndicator className="w-6 h-6 btn " />
                              </span>
                              <BiTrash className="w-6 h-6 btn" onClick={handleDelete} />
                         </div>
                    </div>
               )}
          </Draggable>
     );
}
