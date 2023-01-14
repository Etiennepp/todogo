import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../reducers";

const collections = (state: RootState) => state.collections.data;
const selectedCollectionId = (state: RootState) => state.collections.selectedCollectionId;
const selectedListId = (state: RootState) => state.collections.selectedListId;

export const getSelectedCollection = createSelector(
     [collections, selectedCollectionId],
     (collections, selectedCollectionId) => collections.find((collection) => collection._id === selectedCollectionId)
);

export const getSelectedList = createSelector([getSelectedCollection, selectedListId], (collection, list_id) =>
     collection?.lists.find((list) => list._id === list_id)
);
