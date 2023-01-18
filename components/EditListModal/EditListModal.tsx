import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeCreateListModal, unsetEditListId } from "../../reducers/UIStateSlice";
import { RootState } from "../../store";
import { BiX } from "react-icons/bi";
import axios from "axios";
import { API_URL } from "../../config";
import { getEditedList, getSelectedCollection } from "../../selectors/selectors";
import { addList, updateList } from "../../actions/collectionsActions";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { CirclePicker, ColorResult } from "react-color";
import { BsEmojiSmile } from "react-icons/bs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import useOutsideClick from "../../hooks/useOutsideClick";

export default function EditListModal() {
     const list = useSelector(getEditedList);
     const collection = useSelector(getSelectedCollection);
     const [emoji, setEmoji] = useState<string | null>(null);
     const [isEmojiSelectorOpen, setIsEmojiSelectorOpen] = useState(false);
     const [isLoading, setIsLoading] = useState(false);
     const [selectedColor, setSelectedColor] = useState("#f44336");
     const emojiMenu = useRef(null);

     useOutsideClick(emojiMenu, () => {
          setIsEmojiSelectorOpen(false);
     });

     const dispatch = useDispatch();

     const handleClose = () => {
          dispatch(unsetEditListId());
     };

     useEffect(() => {
          if (!list) return;
          setEmoji(list.emoji || null);
          setSelectedColor(list.color || "#f44336");
     }, [list]);

     const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
          setIsLoading(true);
          e.preventDefault();

          const target = e.target as typeof e.target & {
               name: { value: string };
          };

          if (!target.name.value.replace(/\s/g, "") || !selectedColor || !emoji) {
               setIsLoading(false);
               return;
          }
          const { data } = await axios.patch(API_URL + "collections/lists", {
               collection_id: collection?._id,
               list_id: list?._id,
               name: target.name.value,
               color: selectedColor,
               emoji: emoji,
          });
          setIsLoading(false);

          if (data.success) {
               dispatch(
                    updateList({
                         collection_id: collection?._id,
                         list_id: list?._id,
                         value: { name: target.name.value, color: selectedColor, emoji: emoji },
                    })
               );
               dispatch(unsetEditListId());
          }
     };

     const handleColorChange = (color: ColorResult) => {
          setSelectedColor(color.hex);
     };

     return (
          <div
               className={`absolute w-full h-full z-50 flex backdrop-blur-sm justify-center items-center ${
                    !list && "hidden"
               }`}
               onClick={handleClose}
          >
               <div
                    onClick={(e) => e.stopPropagation()}
                    className={`dark:bg-slate-700 bg-slate-100 w-3/4 lg:w-1/3  shadow-xl rounded-lg dark:text-white animate-modal relative`}
               >
                    <div className="flex justify-between items-center mb-10 px-10 py-4  border-b border-b-slate-300">
                         <h1 className="font-semibold text-xl">Edit list</h1>
                         <div
                              onClick={handleClose}
                              className="flex justify-center items-center rounded-lg w-7 h-7 border-slate-400 border btn "
                         >
                              <BiX className="f w-full h-full" />
                         </div>
                    </div>
                    <div className={`px-10 ${isLoading && "invisible"}`}>
                         {list && (
                              <form onSubmit={handleSubmit} className="mb-5 flex flex-col gap-10">
                                   <div className="flex flex-col justify-center relative items-center">
                                        <span className="block text-center mb-2 text-lg font-medium text-gray-900 dark:text-white">
                                             Emoji
                                        </span>
                                        <span
                                             onClick={() => setIsEmojiSelectorOpen(!isEmojiSelectorOpen)}
                                             className="rounded-full cursor-pointer text-5xl text-center w-fit"
                                        >
                                             {emoji ? emoji : <BsEmojiSmile className="btn" />}
                                        </span>
                                        <div
                                             className="absolute top-full mt-2 left-2/4 -translate-x-2/4 z-50"
                                             ref={emojiMenu}
                                        >
                                             {isEmojiSelectorOpen && (
                                                  <Picker
                                                       data={data}
                                                       onEmojiSelect={(e: any) => {
                                                            setEmoji(e.native);
                                                            setIsEmojiSelectorOpen(false);
                                                       }}
                                                  />
                                             )}
                                        </div>
                                   </div>
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
                                             defaultValue={list?.name}
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
