import {
  faAt,
  faFile,
  faFolder,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LayoutDesktop from "../../utils/components/LayoutDeskTop/LayoutDesktop";
import SearchBar from "../../utils/components/SearchBar/SearchBar";
import SearchView from "../../utils/components/SearchView/SearchView";
import AlphabetColor from "../../utils/components/SideBar/AlphabetColor";
import colors from "../../utils/sharedLogics/colors";
import { setFiles, setFolderTitle } from "./fileMangerSlice";

const DesktopView = ({ folders }) => {
  const [folderWidth, setFolderWidth] = useState(200);
  const [folderHeight, setFolderHeight] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [rowHeight, setRowHeight] = useState(500);
  const searchFiles = useSelector((state) => state.search.searchFiles);
  const [colHeight, setColHeight] = useState(200);
  const ref = React.useRef();

  useEffect(() => {
    console.log('folders',folders);
  }, []);

  useEffect(() => {
    const container_h = document.getElementById("container").offsetHeight;
    const header_h = document.getElementById("header").offsetHeight;
    setRowHeight(container_h - header_h - 30);
  }, []);

  useEffect(() => {
    if (searchFiles.length > 0) {
      return;
    }
    if (folders.length === 0) {
      return;
    }
    const width = document.getElementById("folders_container").offsetWidth;
    setFolderWidth(width / 4 - 25);
  }, [searchFiles, folders]);

  useEffect(() => {
    if (searchFiles.length > 0) {
      return;
    }
    if (folders.length === 0) {
      return;
    }
    const height = document.getElementById("0folder").offsetHeight;
    setColHeight(height);
  }, [searchFiles, folders]);

  return (
    <LayoutDesktop>
      <div className="container" style={{ height: "100%" }} id="container">
        <div id="header" style={{ marginTop: 20 }}>
          <SearchBar />
          <div className="display-4" style={{ marginTop: 10 }}>
            {searchFiles.length > 0 ? "Search Results" : "Home"}
          </div>
        </div>
        {searchFiles.length > 0 ? (
          <SearchView />
        ) : (
          <div
            className="row overflow-auto"
            id="folders_container"
            style={{
              minHeight: colHeight,
              maxHeight: rowHeight,
              paddingBottom: 40,
            }}
            ref={ref}
          >
            {folders.map((folder, key) => {
              return (
                <div className="col-3">
                  <div
                    id={key + "folder"}
                    onClick={() => {
                      dispatch(setFiles(folder.files));
                      dispatch(setFolderTitle(folder.Inhaltstyp));
                      navigate("/folder");
                    }}
                    className="d-flex folder"
                    style={{
                      marginTop: key > 3 ? 25 : 10,
                      width: folderWidth,
                      aspectRatio: "21/9",
                      height: "100%",
                      backgroundColor:
                        AlphabetColor[
                          Array.from(folder.Inhaltstyp)[0].toLowerCase()
                        ],
                      borderRadius: 10,
                      padding: 20,
                      flexDirection: "column",
                    }}
                  >
                    <div>
                      <FontAwesomeIcon icon={faFolder} />
                      <p>
                        <b>{folder.Inhaltstyp}</b>
                      </p>
                    </div>
                    <div
                      className="d-flex justify-content-end"
                      style={{ marginTop: "auto" }}
                    >
                      {folder.files.length}{" "}
                      {folder.files.length > 1 ? "files" : "file"}{" "}
                      <FontAwesomeIcon
                        icon={faFile}
                        style={{ marginTop: 4, marginLeft: 5 }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </LayoutDesktop>
  );
};

export default DesktopView;
