import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchFiles } from "./searchSlice";

const SearchBar = () => {
  const [files, setFiles] = useState([]);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const folders = useSelector((state) => state.fileManager.folders);

  useEffect(() => {
    var allFiles = [];
    folders.forEach((folder) => {
      allFiles.push(folder.files);
    });
    setFiles(allFiles.flat());
  }, [folders]);

  useEffect(() => {
    if (searchText !== "") {
      const arr = files.filter((value) => {
        var re = new RegExp(searchText, "gi");
        if (
          value.Action.match(re) ||
          value.Filename.match(re) ||
          value.Titel.match(re) ||
          value.Version.match(re) ||
          value.FolderType.match(re)
        ) {
          return value;
        }
      });
      dispatch(setSearchFiles(arr));
    } else {
      dispatch(setSearchFiles([]));
    }
  }, [searchText]);

  return (
    <div
      className="input-group flex-nowrap folder"
      style={{ borderRadius: 10 }}
    >
      <span
        className="input-group-text"
        id="addon-wrapping"
        style={{
          border: "none",
          backgroundColor: "#F7FAFB",
          height: 60,
          paddingLeft: 20,
        }}
      >
        <FontAwesomeIcon icon={faSearch} color="#007E01"/>
      </span>
      <input
        style={{ border: "none", backgroundColor: "#F7FAFB", height: 60 }}
        type="text"
        className="form-control"
        placeholder="Search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      {searchText !== "" ? (
        <span
          className="input-group-text input-group-append"
          style={{
            border: "none",
            backgroundColor: "#F7FAFB",
            height: 60,
            paddingRight: 20,
          }}
          onClick={() => setSearchText("")}
        >
          <FontAwesomeIcon icon={faXmark} color="#FF6600"/>
        </span>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SearchBar;
