import themeReducer from "./themeReducer";
import { combineReducers } from "redux";
import collectionsReducer from "./collectionsReducer";
import { Collection } from "../shared/interfaces/collection";
interface CollectionsState {
     data: Collection[];
     loading: boolean;
     selectedCollectionId: string | null;
     selectedListId: string | null;
}
interface AppState {
     theme: string;
     collections: CollectionsState;
}

const rootReducer = combineReducers<AppState>({
     theme: themeReducer,
     collections: collectionsReducer,
});
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
