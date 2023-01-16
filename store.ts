import RootReducer from "./reducers";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";

export const store = configureStore({
     reducer: RootReducer,
     middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({
               serializableCheck: false,
          }),
});
export type AppStore = typeof store;
export type RootState = ReturnType<typeof RootReducer>;
