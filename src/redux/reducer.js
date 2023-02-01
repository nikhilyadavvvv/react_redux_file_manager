import { combineReducers } from "redux";
import fileMangerSlice from "../pages/FileManager/fileMangerSlice";
import loginSlice from "../pages/Login/loginSlice";
import searchSlice from "../utils/components/SearchBar/searchSlice";

const appReducer = combineReducers({
  login: loginSlice,
  fileManager: fileMangerSlice,
  search: searchSlice
});

export const rootReducer = (state, action) => {
  return appReducer(state, action);
};
