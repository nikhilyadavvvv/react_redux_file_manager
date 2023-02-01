import React from "react";
import SideBar from "../SideBar/SideBar";

const LayoutDesktop = ({ children }) => {
  return (
    <div
      className="d-flex"
      style={{
        minHeight: "100%",
        maxHeight: "100%",
        flexDirection: "row",
      }}
    >
      <SideBar />
      <div
        style={{ width: "100%", overflow: "hidden" }}
      >
        {children}
      </div>
    </div>
  );
};

export default LayoutDesktop;
