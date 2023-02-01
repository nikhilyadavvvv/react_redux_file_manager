import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import DesktopView from "./DesktopView";
import MobileView from "./MobileView";

const Folder = () => {
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  return <>{isPortrait ? <MobileView /> : <DesktopView />}</>;
};

export default Folder;
