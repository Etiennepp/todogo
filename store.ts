import rootReducer from "./reducers";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
     timeout: 200,
     key: "root",
     storage,
     whitelist: ["theme"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
     reducer: persistedReducer,
     middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({
               serializableCheck: false,
          }),
});
