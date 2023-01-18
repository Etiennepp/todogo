import { createSlice } from "@reduxjs/toolkit";

export interface UIState {
     selectedCollectionId: string | null;
     selectedListId: string | null;
     editCollectionId: string | null;
     editListId: string | null;
     newCollectionModalOpen: boolean;
     deleteCollectionModalOpen: boolean;
     createListModalOpen: boolean;
     deleteListModalOpen: boolean;
     isAddingTask: boolean;
}

const initialState: UIState = {
     selectedCollectionId: null,
     selectedListId: null,
     editCollectionId: null,
     editListId: null,
     newCollectionModalOpen: false,
     deleteCollectionModalOpen: false,
     createListModalOpen: false,
     deleteListModalOpen: false,
     isAddingTask: false,
};

const UIStateSlice = createSlice({
     name: "uistate",
     initialState: initialState,
     reducers: {
          setSelectedCollectionId: (state, action) => {
               return { ...state, selectedCollectionId: action.payload };
          },
          unselectCollection: (state) => {
               return { ...state, selectedCollectionId: null };
          },
          setEditCollectionId: (state, action) => {
               return { ...state, editCollectionId: action.payload };
          },
          unsetEditCollectionId: (state) => {
               return { ...state, editCollectionId: null };
          },
          setSelectedListId: (state, action) => {
               return { ...state, selectedListId: action.payload };
          },
          unselectList: (state) => {
               return { ...state, selectedListId: null };
          },
          setEditListId: (state, action) => {
               return { ...state, editListId: action.payload };
          },
          unsetEditListId: (state) => {
               return { ...state, editListId: null };
          },
          openNewCollectionModal: (state) => {
               return { ...state, newCollectionModalOpen: true };
          },
          closeNewCollectionModal: (state) => {
               return { ...state, newCollectionModalOpen: false };
          },
          openDeleteCollectionModal: (state) => {
               return { ...state, deleteCollectionModalOpen: true };
          },
          closeDeleteCollectionModal: (state) => {
               return { ...state, deleteCollectionModalOpen: false };
          },
          openCreateListModal: (state) => {
               return { ...state, createListModalOpen: true };
          },
          closeCreateListModal: (state) => {
               return { ...state, createListModalOpen: false };
          },
          openDeleteListModal: (state) => {
               return { ...state, deleteListModalOpen: true };
          },
          closeDeleteListModal: (state) => {
               return { ...state, deleteListModalOpen: false };
          },
          setIsAddingTask: (state, action) => {
               return { ...state, isAddingTask: action.payload };
          },
     },
});

export const {
     setSelectedCollectionId,
     unselectCollection,
     setSelectedListId,
     setEditCollectionId,
     unsetEditCollectionId,
     unselectList,
     unsetEditListId,
     setEditListId,
     openNewCollectionModal,
     closeNewCollectionModal,
     openDeleteCollectionModal,
     closeDeleteCollectionModal,
     openCreateListModal,
     closeCreateListModal,
     openDeleteListModal,
     closeDeleteListModal,
     setIsAddingTask,
} = UIStateSlice.actions;
export default UIStateSlice.reducer;
