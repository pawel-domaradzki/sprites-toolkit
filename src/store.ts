import {
  createSlice,
  configureStore,
  type PayloadAction,
} from "@reduxjs/toolkit";

const filesSlice = createSlice({
  name: "files",
  initialState: {
    files: "",
  },
  reducers: {
    setFiles: (state, action: PayloadAction<string>) => {
      state.files = action.payload;
    },
  },
});

export const { setFiles } = filesSlice.actions;

export const store = configureStore({
  reducer: { files: filesSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;

export const selectFiles = (state: RootState) => state.files.files;
