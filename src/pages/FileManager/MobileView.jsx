import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LayoutMobile from "../../utils/components/LayoutMobile/LayoutMobile";
import SearchView from "../../utils/components/SearchView/SearchView";
import { setFiles, setFolderTitle } from "./fileMangerSlice";
import AlphabetColor from "../../utils/components/SideBar/AlphabetColor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAt,
  faFile,
  faFolder,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

const MobileView = ({ folders }) => {
  const [folderWidth, setFolderWidth] = useState(200);
  const [folderHeight, setFolderHeight] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [rowHeight, setRowHeight] = useState(500);
  const searchFiles = useSelector((state) => state.search.searchFiles);
  const [colHeight, setColHeight] = useState(200);
  const ref = React.useRef();

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

  return (
    <LayoutMobile>
      <div id="header" style={{ marginTop: 20 }}>
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
          }}
          ref={ref}
        >
          {folders.map((folder, key) => {
            return (
              <div
                className="col-6"
                style={{ marginTop: 20, textOverflow: "ellipsis" }}
              >
                <div
                  id={key + "folder"}
                  onClick={() => {
                    dispatch(setFiles(folder.files));
                    dispatch(setFolderTitle(folder.Inhaltstyp));
                    navigate("/folder");
                  }}
                  className="d-flex folder"
                  style={{
                    width: "100%",
                    aspectRatio: "21/9",
                    height: "100%",
                    backgroundColor:
                      AlphabetColor[
                        Array.from(folder.Inhaltstyp)[0].toLowerCase()
                      ],
                    borderRadius: 10,
                    padding: 20,
                    flexDirection: "column",
                    textOverflow: "ellipsis",
                  }}
                >
                  <div
                    style={{ overflowWrap: "break-word" }}
                  >
                    <FontAwesomeIcon icon={faFolder} />
                    <p style={{ width: "100%", textOverflow: "ellipsis" }}>
                      <b style={{ textOverflow: "ellipsis" }}>
                        {folder.Inhaltstyp}
                      </b>
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
    </LayoutMobile>
  );
};

export default MobileView;
