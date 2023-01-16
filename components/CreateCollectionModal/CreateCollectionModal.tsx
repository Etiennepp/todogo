import React, { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeNewCollectionModal, setSelectedCollectionId } from "../../reducers/UIStateSlice";
import { RootState } from "../../store";
import { BiX } from "react-icons/bi";
import axios from "axios";
import { API_URL, COLLECTION_COLORS } from "../../config";
import { addCollection } from "../../actions/collectionsActions";
import ColorPicker from "../ColorPicker";

export default function CreateCollectionModal() {
     const isOpen = useSelector((state: RootState) => state.uistate.newCollectionModalOpen);
     const dispatch = useDispatch();

     const [selectedColor, setSelectedColor] = useState(COLLECTION_COLORS[0]);

     const handleClose = (e: React.SyntheticEvent) => {
          if (e.currentTarget != e.target) return;
          dispatch(closeNewCollectionModal());
     };

     const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
          e.preventDefault();

          const target = e.target as typeof e.target & {
               name: { value: string };
               color: { value: string };
          };

          const { data } = await axios.post(API_URL + "collections", {
               name: target.name.value,
               color: target.color.value,
          });

          if (data.success) {
               dispatch(addCollection(data.data));
               dispatch(setSelectedCollectionId(data.data._id));
               dispatch(closeNewCollectionModal());
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
                         <h1 className="f font-semibold">New collection</h1>
                         <BiX className="f w-7 h-7 btn" onClick={handleClose} />
                    </div>
                    <div>
                         <form onSubmit={handleSubmit} className="mb-5">
                              <input type="text" name="name" required className="text-black" />
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
                              <button type="submit">Create</button>
                         </form>
                    </div>
               </div>
          </div>
     );
}
