import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CustomFile = {
  name: string;
  lastModified: number;
  lastModifiedDate: Date;
  size: number;
  type: string;
  webkitRelativePath: string;
};

type InitialState = {
  uploadedFiles: CustomFile[];
};

const initialState: InitialState = {
  uploadedFiles: [],
};

export const files = createSlice({
  name: "files",
  initialState,
  reducers: {
    clearFiles: (state) => {
      state.uploadedFiles = [];
    },
    uploadFile: (state, action: PayloadAction<CustomFile>) => {
      state.uploadedFiles.push(action.payload);
    },
  },
});

export const { clearFiles, uploadFile } = files.actions;

export default files.reducer;

//PayloadAction<any> define type for file uploaded
