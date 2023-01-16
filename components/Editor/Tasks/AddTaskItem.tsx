import axios from "axios";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../../actions/collectionsActions";
import { API_URL } from "../../../config";
import { setIsAddingTask } from "../../../reducers/UIStateSlice";
import { getSelectedCollection, getSelectedList } from "../../../selectors/selectors";
import { RootState } from "../../../store";

export default function AddTaskItem() {
     const dispatch = useDispatch();
     const isOpen = useSelector((state: RootState) => state.uistate.isAddingTask);
     const collection = useSelector(getSelectedCollection);
     const list = useSelector(getSelectedList);

     const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
          e.preventDefault();
          const target = e.target as typeof e.target & {
               name: { value: string };
          };
          if (!target.name.value) {
               dispatch(setIsAddingTask(false));
               return;
          }

          const { data } = await axios.post(API_URL + "collections/tasks", {
               collection_id: collection?._id,
               list_id: list?._id,
               name: target.name.value,
          });

          if (data.success) {
               dispatch(setIsAddingTask(false));
               dispatch(
                    addTask({
                         collection_id: collection?._id,
                         list_id: list?._id,
                         task: data.data,
                    })
               );
          }
     };

     return (
          <div
               className={`flex gap-3 text-lg justify-between 
               bg-slate-50 dark:bg-slate-800 
               transition-all duration-300  shadow-md 
               p-3 rounded-xl w-2/3
               ${!isOpen && "hidden"}
               `}
          >
               <div className="flex gap-3 items-center w-full">
                    <label className="cursor-pointer rounded-lg w-7 h-7 btn"></label>
                    <form onSubmit={handleSubmit} className="flex-1">
                         {isOpen && (
                              <input
                                   autoFocus
                                   type="text"
                                   name="name"
                                   className="w-full dark:bg-slate-800 dark:text-white border-b-2 border-slate-500 bg-transparent outline-none"
                                   placeholder="New task"
                                   onBlur={(e: any) => e.target.form.requestSubmit()}
                              ></input>
                         )}
                    </form>
               </div>
          </div>
     );
}
