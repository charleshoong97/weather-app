import { configureStore } from "@reduxjs/toolkit";
import historyReducer from "./slice/historySlice";
import searchReducer from "./slice/searchSlice";
import alertReducer from "./slice/alertSlice";

export const store = configureStore({
  reducer: {
    history: historyReducer,
    search: searchReducer,
    alert: alertReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
