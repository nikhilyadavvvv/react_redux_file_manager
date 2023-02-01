import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import FileManger from "./pages/FileManager/FileManger";
import Login from "./pages/Login/Login";
import Folder from "./pages/Folder/Folder";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<FileManger />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/folder" element={<Folder />} />
    </Routes>
  );
}

export default App;
