import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeDeleteListModal, unselectList } from "../../reducers/UIStateSlice";
import { RootState } from "../../store";
import { BiX } from "react-icons/bi";
import axios from "axios";
import { API_URL } from "../../config";
import { getSelectedCollection, getSelectedList } from "../../selectors/selectors";
import { removeList } from "../../actions/collectionsActions";

export default function DeleteListModal() {
     const isOpen = useSelector((state: RootState) => state.uistate.deleteListModalOpen);
     const collection = useSelector(getSelectedCollection);
     const list = useSelector(getSelectedList);

     const dispatch = useDispatch();

     const handleClose = (e: React.SyntheticEvent) => {
          dispatch(closeDeleteListModal());
     };

     const handleDelete = async () => {
          const { data } = await axios.delete(API_URL + "collections/lists", {
               data: {
                    collection_id: collection?._id,
                    list_id: list?._id,
               },
          });

          if (data.success) {
               dispatch(
                    removeList({
                         collection_id: collection?._id,
                         list_id: list?._id,
                    })
               );
               dispatch(unselectList());
               dispatch(closeDeleteListModal());
          }
     };

     return (
          <div
               className={`absolute w-full h-full z-50 flex backdrop-blur-sm justify-center items-center ${
                    !isOpen && "hidden"
               }`}
               onClick={handleClose}
          >
               <div
                    onClick={(e) => e.stopPropagation()}
                    className={`dark:bg-slate-700 bg-slate-100 w-3/4 lg:w-1/3  shadow-xl rounded-lg dark:text-white animate-modal relative`}
               >
                    <div className="flex justify-between items-center mb-10 px-10 py-4  border-b border-b-slate-300">
                         <h1 className="f font-semibold">Delete list</h1>
                         <div
                              onClick={handleClose}
                              className="flex justify-center items-center rounded-lg w-7 h-7 border-slate-400 border btn "
                         >
                              <BiX className="f w-full h-full" />
                         </div>
                    </div>
                    <div className="px-10 flex flex-col mb-5 gap-10">
                         <span>Do you really want to delete this list ?</span>
                         <div className="flex flex-row justify-end gap-5">
                              <input
                                   type="button"
                                   value="Cancel"
                                   onClick={handleClose}
                                   className="transition-all duration-200 cursor-pointer bg-transparent hover:bg-blue-500 text-blue-700 dark:text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 dark:border-white dark:hover:border-blue-500 hover:border-transparent rounded"
                              ></input>
                              <button
                                   className="transition-all duration-200 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                                   onClick={handleDelete}
                              >
                                   Delete
                              </button>
                         </div>
                    </div>
               </div>
          </div>
     );
}
