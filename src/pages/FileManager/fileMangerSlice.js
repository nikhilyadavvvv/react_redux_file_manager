import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isRefreshed: false,
  files: [],
  folders: [],
  folderTitle: "",
};

const fileMangerSlice = createSlice({
  name: "filemanager",
  initialState,
  reducers: {
    setIsRefreshed(state, action) {
      state.isRefreshed = action.payload;
    },
    setFiles(state, action) {
      state.files = action.payload;
    },
    setFolders(state, action) {
      state.folders = action.payload;
    },
    setFolderTitle(state, action) {
      state.folderTitle = action.payload;
    },
  },
});

export const { setIsRefreshed, setFiles, setFolderTitle, setFolders } =
  fileMangerSlice.actions;
export default fileMangerSlice.reducer;
