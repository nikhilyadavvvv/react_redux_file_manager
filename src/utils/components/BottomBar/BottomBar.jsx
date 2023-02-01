import {
  faA,
  faHouse,
  faPowerOff,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFolders } from "../../../pages/FileManager/fileMangerSlice";
import { addUser, setExpireAt, setLoginAt } from "../../../pages/Login/loginSlice";
import Logo from "../../assets/images/logo.png";
import { setSearchFiles } from "../SearchBar/searchSlice";
import AlphabetColor from "../SideBar/AlphabetColor";
import AlphabetIcon from "../SideBar/AlphabetIcon";

const BottomBar = () => {
  const folderTitle = useSelector((state) => state.fileManager.folderTitle);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div
      className="sidebar d-flex justify-content-between align-items-center"
      style={bottomBarStyle}
    >
      <div className="d-flex">
        <div
          className="btn-round d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "white" }}
          onClick={() => {
            navigate("/");
            dispatch(setSearchFiles([]));
          }}
        >
          <FontAwesomeIcon icon={faHouse} color="#007E01" />
        </div>

        {folderTitle !== "" ? (
          <>
            <div className="btn-round d-flex justify-content-center align-items-center">
              <FontAwesomeIcon
                icon={faArrowRightLong}
                color={AlphabetColor[Array.from(folderTitle)[0].toLowerCase()]}
              />
            </div>
            <div
              className="btn-round d-flex justify-content-center align-items-center"
              onClick={() => dispatch(setSearchFiles([]))}
              style={{
                border: "1px solid black",
                borderColor:
                  AlphabetColor[Array.from(folderTitle)[0].toLowerCase()],
              }}
            >
              <FontAwesomeIcon
                icon={AlphabetIcon[Array.from(folderTitle)[0].toLowerCase()]}
                color={"black"}
                style={{ fontSize: 14 }}
              />
            </div>
          </>
        ) : (
          <></>
        )}
      </div>

      <div
        className="btn-round d-flex justify-content-center align-items-center"
        onClick={() => {
          localStorage.clear();
          dispatch(setFolders([]));
          dispatch(addUser({}));
          dispatch(setLoginAt(""));
          dispatch(setExpireAt(""));
          navigate("/login");
        }}
      >
        <FontAwesomeIcon icon={faPowerOff} color="#FF6600" />
      </div>
    </div>
  );
};

const bottomBarStyle = {
  marginTop: "auto",
  height: 90,
  flexDirection: "row",
  paddingLeft: 20,
  paddingRight: 20,
};
export default BottomBar;
