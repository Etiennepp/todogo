import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unsetEditCollectionId, unsetEditListId } from "../../reducers/UIStateSlice";
import { BiX } from "react-icons/bi";
import axios from "axios";
import { API_URL } from "../../config";
import { getEditedCollection } from "../../selectors/selectors";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { CirclePicker, ColorResult } from "react-color";
import { BsEmojiSmile } from "react-icons/bs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { updateCollection } from "../../actions/collectionsActions";

export default function EditCollectionModal() {
     const collection = useSelector(getEditedCollection);
     const [isLoading, setIsLoading] = useState(false);
     const [selectedColor, setSelectedColor] = useState("#f44336");

     const dispatch = useDispatch();

     const handleClose = () => {
          dispatch(unsetEditCollectionId());
     };

     useEffect(() => {
          if (!collection) return;
          setSelectedColor(collection.color || "#f44336");
     }, [collection]);

     const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
          setIsLoading(true);
          e.preventDefault();

          const target = e.target as typeof e.target & {
               name: { value: string };
          };

          if (!target.name.value.replace(/\s/g, "") || !selectedColor) {
               setIsLoading(false);
               return;
          }
          const { data } = await axios.patch(API_URL + "collections/", {
               id: collection?._id,
               name: target.name.value,
               color: selectedColor,
          });
          setIsLoading(false);

          if (data.success) {
               dispatch(updateCollection(data.data));
               dispatch(unsetEditCollectionId());
          }
     };

     const handleColorChange = (color: ColorResult) => {
          setSelectedColor(color.hex);
     };

     return (
          <div
               className={`absolute w-full h-full z-50 flex backdrop-blur-sm justify-center items-center ${
                    !collection && "hidden"
               }`}
               onClick={handleClose}
          >
               <div
                    onClick={(e) => e.stopPropagation()}
                    className={`dark:bg-slate-700 bg-slate-100  w-3/4 lg:w-1/3  shadow-xl rounded-lg dark:text-white animate-modal relative`}
               >
                    <div className="flex justify-between items-center mb-10 px-10 py-4  border-b border-b-slate-300">
                         <h1 className="font-semibold text-xl">Edit collection</h1>
                         <div
                              onClick={handleClose}
                              className="flex justify-center items-center rounded-lg w-7 h-7 border-slate-400 border btn "
                         >
                              <BiX className="f w-full h-full" />
                         </div>
                    </div>
                    <div className={`px-10 ${isLoading && "invisible"}`}>
                         {collection && (
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
                                             className="bg-transparent border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                             placeholder="Name of the list"
                                             defaultValue={collection?.name}
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
                                             className="transition-all duration-200 cursor-pointer bg-transparent hover:bg-blue-500 text-blue-700 dark:text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 dark:border-white dark:hover:border-blue-500 hover:border-transparent rounded"
                                        ></input>
                                        <button
                                             type="submit"
                                             className="transition-all duration-200 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                                        >
                                             Update
                                        </button>
                                   </div>
                              </form>
                         )}
                    </div>

                    {isLoading && (
                         <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 w-fit ">
                              <AiOutlineLoading3Quarters className="w-8 h-8 animate-spin" />
                         </div>
                    )}
               </div>
          </div>
     );
}
