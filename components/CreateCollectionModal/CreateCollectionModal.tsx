import React, { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeNewCollectionModal, setSelectedCollectionId } from "../../reducers/UIStateSlice";
import { RootState } from "../../store";
import { BiX } from "react-icons/bi";
import axios from "axios";
import { API_URL } from "../../config";
import { addCollection } from "../../actions/collectionsActions";
import { CirclePicker, ColorResult } from "react-color";

export default function CreateCollectionModal() {
     const isOpen = useSelector((state: RootState) => state.uistate.newCollectionModalOpen);
     const dispatch = useDispatch();

     const [selectedColor, setSelectedColor] = useState("#f44336");

     const handleClose = (e: React.SyntheticEvent) => {
          e.preventDefault();
          setSelectedColor("#f44336");
          dispatch(closeNewCollectionModal());
     };

     const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
          e.preventDefault();

          const target = e.target as typeof e.target & {
               name: { value: string };
          };

          if (!target.name.value || !selectedColor) return;

          const { data } = await axios.post(API_URL + "collections", {
               name: target.name.value,
               color: selectedColor,
          });

          if (data.success) {
               dispatch(addCollection(data.data));
               dispatch(setSelectedCollectionId(data.data._id));
               dispatch(closeNewCollectionModal());
          }
     };

     const handleColorChange = (color: ColorResult) => {
          setSelectedColor(color.hex);
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
                    className="dark:bg-slate-700 bg-slate-100 w-3/4 lg:w-1/3 shadow-xl rounded-lg dark:text-white animate-modal"
               >
                    <div className="flex justify-between items-center mb-10 px-10 py-4  border-b border-b-slate-300">
                         <h1 className="font-semibold text-xl">New collection</h1>
                         <div
                              onClick={handleClose}
                              className="flex justify-center items-center rounded-lg w-7 h-7 border-slate-400 border btn "
                         >
                              <BiX className="f w-full h-full" />
                         </div>
                    </div>
                    <div className=" px-10">
                         {isOpen && (
                              <form onSubmit={handleSubmit} className="mb-5 flex flex-col gap-10">
                                   <div>
                                        <label
                                             htmlFor="name"
                                             className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                             Name
                                        </label>
                                        <input
                                             type="text"
                                             name="name"
                                             className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                             placeholder="Work, personnal..."
                                             required
                                        />
                                   </div>
                                   <div className="flex flex-col justify-between">
                                        <label
                                             htmlFor="name"
                                             className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                             Color
                                        </label>
                                        <div className="flex justify-center">
                                             <CirclePicker color={selectedColor} onChangeComplete={handleColorChange} />
                                        </div>
                                   </div>
                                   <div className="flex flex-row justify-end gap-5">
                                        <input
                                             type="button"
                                             value="Cancel"
                                             onClick={handleClose}
                                             className="transition-all duration-200 cursor-pointer bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                                        ></input>
                                        <button
                                             type="submit"
                                             className="transition-all duration-200 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                                        >
                                             Create
                                        </button>
                                   </div>
                              </form>
                         )}
                    </div>
               </div>
          </div>
     );
}
