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
          if (e.currentTarget != e.target) return;
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
               <div className="dark:bg-slate-700 bg-slate-100 w-1/3 px-10 py-10 shadow-xl rounded-lg dark:text-white">
                    <div className="flex justify-between items-center mb-10">
                         <h1 className="f font-semibold">Delete list</h1>
                         <BiX className="f w-7 h-7 btn" onClick={handleClose} />
                    </div>
                    <div>
                         <span>Do you really want to delete this list ?</span>
                         <button className="m-2 p-1 bg-slate-200 text-red-500" onClick={handleDelete}>
                              Delete
                         </button>
                    </div>
               </div>
          </div>
     );
}
