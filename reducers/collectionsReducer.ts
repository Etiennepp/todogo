import { Collection } from "../shared/interfaces/collection";

interface CollectionsState {
     data: Collection[];
     loading: boolean;
     selectedCollectionId: string | null;
     selectedListId: string | null;
}

const initialState: CollectionsState = {
     data: [],
     loading: true,
     selectedCollectionId: null,
     selectedListId: null,
};

export default (state = initialState, action: any) => {
     switch (action.type) {
          case "collections/get":
               return {
                    ...state,
                    data: action.payload,
                    loading: false,
               };
          case "collections/put":
               return {
                    ...state,
                    data: state.data.map((collection: any) => {
                         return collection._id === action.payload._id
                              ? { ...collection, name: action.payload.name }
                              : collection;
                    }),
                    loading: false,
               };
          case "collections/selectCollection":
               return {
                    ...state,
                    selectedCollectionId: action.payload,
               };
          case "collections/unselectCollection":
               return {
                    ...state,
                    selectedCollectionId: null,
                    selectedListId: null,
               };
          case "collections/selectList":
               return {
                    ...state,
                    selectedListId: action.payload,
               };
          case "collections/unselectList":
               return {
                    ...state,
                    selectedListId: null,
               };
          default:
               return state;
     }
};
