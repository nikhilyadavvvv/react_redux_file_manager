import { faA, faHouse, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFolders } from "../../../pages/FileManager/fileMangerSlice";
import {
  addUser,
  setExpireAt,
  setLoginAt,
} from "../../../pages/Login/loginSlice";
import Logo from "../../assets/images/logo.png";
import { setSearchFiles } from "../SearchBar/searchSlice";
import AlphabetColor from "./AlphabetColor";
import AlphabetIcon from "./AlphabetIcon";

const SideBar = () => {
  const folderTitle = useSelector((state) => state.fileManager.folderTitle);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div
      id="sidebar"
      className="sidebar d-flex"
      style={{
        width: 90,
        flexDirection: "column",
        paddingTop: 20,
      }}
    >
      <div className="d-flex justify-content-center">
        <img src={Logo} height="70" />
      </div>

      <div id="side_buttons">
        <div
          className="d-flex justify-content-center"
          style={{ marginTop: 50, cursor: "pointer" }}
        >
          <div
            className="btn-round d-flex justify-content-center align-items-center"
            style={{ backgroundColor: "#007E01" }}
            onClick={() => {
              navigate("/");
              dispatch(setSearchFiles([]));
            }}
          >
            <FontAwesomeIcon icon={faHouse} style={{ fontSize: 12 }} />
          </div>
        </div>

        {folderTitle !== "" ? (
          <div
            className="d-flex justify-content-center"
            style={{ marginTop: 10 }}
          >
            <div
              className="btn-round d-flex justify-content-center align-items-center"
              onClick={() => dispatch(setSearchFiles([]))}
              style={{
                cursor: "pointer",
                backgroundColor:
                  AlphabetColor[Array.from(folderTitle)[0].toLowerCase()],
              }}
            >
              <FontAwesomeIcon
                icon={AlphabetIcon[Array.from(folderTitle)[0].toLowerCase()]}
                style={{ fontSize: 12, color: "black" }}
              />
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div style={{ bottom: 10, position: "absolute", left: 0, width: 80 }}>
        <div
          className="d-flex justify-content-center"
          style={{ marginTop: 10 }}
        >
          <div
            className="btn-round d-flex justify-content-center align-items-center"
            style={{ backgroundColor: "#FF6600", cursor: "pointer" }}
            onClick={() => {
              localStorage.clear();
              dispatch(setFolders([]));
              dispatch(addUser({}));
              dispatch(setLoginAt(""));
              dispatch(setExpireAt(""));
              navigate("/login");
            }}
          >
            <FontAwesomeIcon icon={faPowerOff} style={{ fontSize: 12 }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
