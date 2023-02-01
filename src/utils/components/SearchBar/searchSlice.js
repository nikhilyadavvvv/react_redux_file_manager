import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchFiles: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchFiles(state, action) {
      state.searchFiles = action.payload;
    },
  },
});

export const {setSearchFiles} = searchSlice.actions;
export default searchSlice.reducer;
