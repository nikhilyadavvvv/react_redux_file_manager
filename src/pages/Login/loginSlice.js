import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  loginAt: "",
  expireAt: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    addUser(state, action) {
      state.user = action.payload;
    },
    setLoginAt(state, action) {
      state.loginAt = action.payload;
    },
    setExpireAt(state, action) {
      state.expireAt = action.payload;
    },
  },
});

export const { addUser, setLoginAt, setExpireAt } = loginSlice.actions;
export default loginSlice.reducer;
