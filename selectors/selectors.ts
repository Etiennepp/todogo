import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../reducers";

const collections = (state: RootState) => state.collections.data;
const selectedCollectionId = (state: RootState) => state.uistate.selectedCollectionId;
const selectedListId = (state: RootState) => state.uistate.selectedListId;
const editedListId = (state: RootState) => state.uistate.editListId;
const editedCollectionId = (state: RootState) => state.uistate.editCollectionId;

export const getSelectedCollection = createSelector(
     [collections, selectedCollectionId],
     (collections, selectedCollectionId) => collections.find((collection) => collection._id === selectedCollectionId)
);

export const getCollectionById = (collection_id: string) =>
     createSelector([collections], (collections) =>
          collections?.find((collection) => collection._id === collection_id)
     );

export const getListById = (list_id: string) =>
     createSelector([getSelectedCollection], (collection) => collection?.lists.find((list) => list._id === list_id));

export const getSelectedList = createSelector([getSelectedCollection, selectedListId], (collection, list_id) =>
     collection?.lists.find((list) => list._id === list_id)
);

export const getEditedCollection = createSelector(
     [collections, editedCollectionId],
     (collections, editedCollectionId) => collections?.find((collection) => collection._id === editedCollectionId)
);

export const getEditedList = createSelector([getSelectedCollection, editedListId], (collection, editedListId) =>
     collection?.lists.find((list) => list._id === editedListId)
);

export const getTaskById = (task_id: string) =>
     createSelector([getSelectedList], (list) => list?.tasks.find((task) => task._id === task_id));

export const getListCompletionRate = createSelector([getSelectedList], (list) => {
     let count = list?.tasks.filter((task) => task?.completed).length;
     let total = list?.tasks?.length;
     let rate = count && total ? Math.round((count / total) * 10) / 10 : 0;
     return rate;
});

export const getListCompletedTaskCount = (list_id: string) =>
     createSelector([getListById(list_id)], (list) => {
          let count = list?.tasks.filter((task) => task?.completed).length;
          return count;
     });
