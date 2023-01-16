import themeReducer from "./themeReducer";
import { combineReducers } from "redux";
import collectionsReducer, { CollectionsState } from "./collectionsReducer";
import UIStateSlice, { UIState } from "./UIStateSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

interface AppState {
     theme: string;
     collections: CollectionsState;
     uistate: UIState;
}

const combinedReducer = combineReducers<AppState>({
     theme: themeReducer,
     collections: collectionsReducer,
     uistate: UIStateSlice,
});

const persistConfig = {
     timeout: 200,
     key: "root",
     storage,
     whitelist: ["theme"],
};
const RootReducer = persistReducer(persistConfig, combinedReducer);

export default RootReducer;
export type RootState = ReturnType<typeof RootReducer>;
