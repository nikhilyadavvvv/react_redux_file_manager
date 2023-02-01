import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import useInterval from "../../utils/hooks/useInterval";
import Endpoints from "../../utils/repository/Endpoints";
import { GetRequest, PostRequest } from "../../utils/repository/RequestMaker";
import { addUser, setExpireAt, setLoginAt } from "../Login/loginSlice";
import DesktopView from "./DesktopView";
import {
  setFiles,
  setFolders,
  setFolderTitle,
  setIsRefreshed,
} from "./fileMangerSlice";
import MobileView from "./MobileView";

const FileManger = () => {
  const user = useSelector((state) => state.login.user);
  const loginAt = useSelector((state) => state.login.loginAt);
  const expireAt = useSelector((state) => state.login.expireAt);
  const folders = useSelector((state) => state.fileManager.folders);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const body = document.getElementsByTagName("body")[0];
  const html = document.getElementsByTagName("html")[0];
  const root = document.getElementById("root");

  useEffect(() => {
    html.style.removeProperty("background-image");
    body.style.removeProperty("background-image");
    root.style.removeProperty("background-image");
    html.classList.add("backgroundPicture");
    body.classList.add("backgroundPicture");
    root.classList.add("backgroundPicture");
    dispatch(setFolderTitle(""));
    console.log("loginAt", loginAt);
    console.log("expireAt", expireAt);
    if (!user.token) {
      navigate("/login");
      return;
    }

    if (folders.length === 0) {
      GetRequest(Endpoints.files).then((res) => {
        console.log("res", res);
        dispatch(setFolders(res.body.data));
      });
    }
  }, []);



  useInterval(() => {
    const currentTime = new Date().toLocaleTimeString("de-DE");
    if (currentTime > expireAt) {
      dispatch(addUser({}));
      dispatch(setLoginAt(""));
      dispatch(setExpireAt(""));
      localStorage.clear();
      navigate("/login");
    } else {
    }
  }, 1000);

  return (
    <>
      {isPortrait ? (
        <MobileView folders={folders} />
      ) : (
        <DesktopView folders={folders} />
      )}
    </>
  );
};

export default FileManger;
