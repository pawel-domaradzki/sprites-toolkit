import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import filesReducer from "./features/filesSlice";
export const store = configureStore({
  reducer: {
    filesReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const selectFiles = (state: RootState) =>
  state.filesReducer.uploadedFiles[0];
