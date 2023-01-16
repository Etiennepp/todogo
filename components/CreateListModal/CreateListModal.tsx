import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeCreateListModal } from "../../reducers/UIStateSlice";
import { RootState } from "../../store";
import { BiX } from "react-icons/bi";
import axios from "axios";
import { API_URL, COLLECTION_COLORS } from "../../config";
import { getSelectedCollection } from "../../selectors/selectors";
import { addList } from "../../actions/collectionsActions";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import ColorPicker from "../ColorPicker";

export default function CreateListModal() {
     const isOpen = useSelector((state: RootState) => state.uistate.createListModalOpen);
     const collection = useSelector(getSelectedCollection);
     const input = useRef<HTMLInputElement>(null);
     const [emoji, setEmoji] = useState(null);
     const [isEmojiSelectorOpen, setIsEmojiSelectorOpen] = useState(false);
     const [selectedColor, setSelectedColor] = useState(COLLECTION_COLORS[0]);

     const dispatch = useDispatch();

     const handleClose = (e: React.SyntheticEvent) => {
          if (e.currentTarget != e.target) return;
          if (input.current) input.current.value = "";

          dispatch(closeCreateListModal());
          setEmoji(null);
     };

     const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
          e.preventDefault();

          const target = e.target as typeof e.target & {
               name: { value: string };
          };

          const { data } = await axios.post(API_URL + "collections/lists", {
               collection_id: collection?._id,
               name: target.name.value,
               color: selectedColor,
               emoji: emoji,
          });

          if (data.success) {
               if (input.current) input.current.value = "";
               dispatch(addList({ collection_id: collection?._id, list: data.data }));
               dispatch(closeCreateListModal());
               setEmoji(null);
          }
     };

     const handleColorChange = (e: any) => {
          setSelectedColor(e.target.value);
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
                         <h1 className="f font-semibold">Create list</h1>
                         <BiX className="f w-7 h-7 btn" onClick={handleClose} />
                    </div>
                    <div>
                         <form onSubmit={handleSubmit} className="mb-5">
                              <input ref={input} type="text" name="name" required className="text-black" />
                              <input
                                   type="button"
                                   className="m-2 p-1 bg-slate-200 text-red-500"
                                   value="Add emoji"
                                   onClick={() => setIsEmojiSelectorOpen(true)}
                              />
                              <span>{emoji}</span>
                              {isEmojiSelectorOpen && (
                                   <Picker
                                        data={data}
                                        onEmojiSelect={(e: any) => {
                                             console.log(e.native);
                                             setEmoji(e.native);
                                             setIsEmojiSelectorOpen(false);
                                        }}
                                   />
                              )}

                              <div className="flex justify-between">
                                   {COLLECTION_COLORS.map((color) => (
                                        <ColorPicker
                                             color={color}
                                             selected={color === selectedColor}
                                             key={color}
                                             onChange={handleColorChange}
                                        />
                                   ))}
                              </div>
                              <button type="submit" className="m-2 p-1 bg-slate-200 text-red-500">
                                   Create
                              </button>
                         </form>
                    </div>
               </div>
          </div>
     );
}
