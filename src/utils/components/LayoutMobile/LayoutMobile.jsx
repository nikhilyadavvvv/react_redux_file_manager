import React from "react";
import BottomBar from "../BottomBar/BottomBar";
import Logo from "../../assets/images/logo.png";
import SearchBar from "../SearchBar/SearchBar";

const LayoutMobile = ({ children }) => {
  return (
    <div
      className="d-flex"
      style={{
        minHeight: "100%",
        maxHeight: "100%",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: window.screen.height - 70,
          overflowY: "scroll",
          padding: 10,
        }}
      >
        <div className="d-flex">
          <div>
            <img src={Logo} height="50" style={{ marginRight: 15 }} />
          </div>
          <SearchBar />
        </div>
        {children}
      </div>

      <BottomBar />
    </div>
  );
};

export default LayoutMobile;
