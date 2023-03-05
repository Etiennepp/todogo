import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedCollection } from "../../../selectors/selectors";
import { BiXCircle, BiTrash } from "react-icons/bi";
import {
     openCreateListModal,
     openDeleteCollectionModal,
     unselectCollection,
} from "../../../reducers/UIStateSlice";
import ListItem from "./ListItem";
import AddListButton from "./AddListButton";
import {
     GridContextProvider,
     GridDropZone,
     GridItem,
     swap,
} from "react-grid-dnd";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import { updateListPosition } from "../../../actions/collectionsActions";
import axios from "axios";
import { API_URL } from "../../../config";

export default function ListsMenu() {
     const dispatch = useDispatch();
     const collection = useSelector(getSelectedCollection);
     const { width: scrwidth } = useWindowDimensions();

     const handleUnselectCollection = () => {
          dispatch(unselectCollection());
     };

     const handleReorder = (
          sourceId: string,
          sourceIndex: number,
          targetIndex: number,
          targetId?: string | undefined
     ) => {
          if (
               targetIndex !== sourceIndex &&
               targetIndex !== collection?.lists.length &&
               sourceIndex !== collection?.lists.length
          ) {
               dispatch(
                    updateListPosition({
                         collection_id: collection?._id,
                         old_index: sourceIndex,
                         new_index: targetIndex,
                    })
               );
               axios.patch(API_URL + "collections/lists", {
                    collection_id: collection?._id,
                    move_list: {
                         source: sourceIndex,
                         destination: targetIndex,
                    },
               });
          }
     };

     if (!collection) return <></>;

     return (
          <div
               className={`absolute top-0 left-0 h-full w-full 
               dark:text-white flex flex-col
               anima animate-list_menu
           `}
          >
               <div className="flex flex-row items-center justify-between px-6 md:px-20 h-20 shadow-sm shrink-0">
                    <div className="flex flex-row items-center gap-8">
                         <BiXCircle
                              className={`h-7 w-7
                         transition-all duration-200 
                                   cursor-pointer 
                                   opacity-50 dark:text-white hover:opacity-100`}
                              onClick={handleUnselectCollection}
                         />
                         <h1 className="font-bold text-2xl dark:text-white">
                              {collection?.name}
                         </h1>
                    </div>
                    <div
                         className="flex flex-row items-center gap-2 btn font-medium !text-red-600"
                         onClick={() => dispatch(openDeleteCollectionModal())}
                    >
                         <BiTrash className="w-5 h-5" />
                         <span>Delete collection</span>
                    </div>
               </div>
               <div className="overflow-y-auto w-full pt-10 h-full flex justify-center lg:scrollbar lg:scrollbar-thumb-slate-700 lg:scrollbar-track-slate-200 lg:scrollbar-thumb-rounded-full lg:scrollbar-track-rounded-full">
                    {/* <div className="gap-5 w-fit dark:text-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 pt-6 p-5 pb-50 h-fit">
                         {collection && collection?.lists?.length > 0 ? (
                              <>
                                   {collection?.lists.map((list: any) => {
                                        return <ListItem id={list._id} key={list._id} />;
                                   })}
                                   <AddListButton />
                              </>
                         ) : (
                              <div className="h-full w-full absolute top-0 left-0 pointer-events-none dark:text-white flex flex-col justify-center items-center">
                                   <div className="pointer-events-auto">
                                        <AddListButton />
                                   </div>
                              </div>
                         )}
                    </div> */}
                    {collection && collection?.lists?.length > 0 ? (
                         <GridContextProvider onChange={handleReorder}>
                              <GridDropZone
                                   id="items"
                                   boxesPerRow={
                                        scrwidth > 768
                                             ? 3
                                             : scrwidth > 475
                                             ? 2
                                             : 1
                                   }
                                   rowHeight={190}
                                   style={{
                                        height:
                                             scrwidth > 768
                                                  ? `calc(11rem + 20px) * ${Math.ceil(
                                                         collection.lists
                                                              .length / 3
                                                    )}`
                                                  : scrwidth > 475
                                                  ? `calc(11rem + 20px) * ${Math.ceil(
                                                         collection.lists
                                                              .length / 3
                                                    )}`
                                                  : `calc((16rem + 20px) * ${collection.lists.length})`,
                                        width:
                                             scrwidth > 768
                                                  ? "calc(33rem + 30px)"
                                                  : scrwidth > 475
                                                  ? "calc(32rem + 30px)"
                                                  : "calc(16rem)",
                                   }}
                                   className="w-2/3"
                              >
                                   {collection.lists.map((list) => (
                                        <GridItem key={list._id}>
                                             <ListItem
                                                  id={list._id}
                                                  key={list._id}
                                             />
                                        </GridItem>
                                   ))}
                                   <GridItem key="addlist">
                                        <AddListButton />
                                   </GridItem>
                              </GridDropZone>
                         </GridContextProvider>
                    ) : (
                         <AddListButton />
                    )}
               </div>
          </div>
     );
}
