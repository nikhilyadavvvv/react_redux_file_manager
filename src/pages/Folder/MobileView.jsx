import LayoutMobile from "../../utils/components/LayoutMobile/LayoutMobile";
import {
  faFilePdf,
  faPause,
  faRepeat,
  faPlay,
  faForward,
  faCircle,
  faCircleDot,
  faVideo,
  faMagnifyingGlassPlus,
  faMagnifyingGlassMinus,
  faTimes,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { saveAs } from "file-saver";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SearchBar from "../../utils/components/SearchBar/SearchBar";
import AlphabetColor from "../../utils/components/SideBar/AlphabetColor";
import SearchView from "../../utils/components/SearchView/SearchView";
import { Spinner } from "react-bootstrap";
import {
  GetRequest,
  PDFStreamMaker,
} from "../../utils/repository/RequestMaker";
import Endpoints from "../../utils/repository/Endpoints";
import b64toBlob from "../../utils/sharedLogics/b64toBlob";
import Modal from "react-modal";

Modal.setAppElement("#root");

const MobileView = () => {
  const files = useSelector((state) => state.fileManager.files);
  const folderTitle = useSelector((state) => state.fileManager.folderTitle);
  const [selectedFile, setSelectedFile] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [rowHeight, setRowHeight] = useState(500);
  const searchFiles = useSelector((state) => state.search.searchFiles);
  const [currentSelected, setCurrentSelected] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [windowHeight, setWindowHeight] = useState(0);

  function openModal() {
    setIsOpen(true);
    setShowSpinner(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  function afterOpenModal() {}

  const iframeButtonClick = (button_id) => {
    let iframe = document.getElementById("pdf-js-viewer").contentWindow;
    let button = iframe.document.getElementById(button_id);
    button.click();
  };

  const onSelect = (id, fileId) => {
    if (currentSelected !== "") {
      document.getElementById(currentSelected).style.border = "none";
    }
    setCurrentSelected(id);
    document.getElementById(id).style.border = "2px solid black";
    openModal();
    GetRequest(Endpoints.file + fileId).then((res) => {
      console.log(res);
      var blob = b64toBlob(res.body.file_base64, "application/pdf");
      setPdfFile(URL.createObjectURL(blob));
      setShowSpinner(false);
    });
  };

  useEffect(() => {
    setWindowHeight(document.getElementsByTagName("body")[0].offsetHeight);
  }, []);

  return (
    <LayoutMobile>
      <div className="header" id="header" style={{ marginTop: 20 }}>
        <div className="display-4" style={{ marginTop: 10 }}>
          {searchFiles.length > 0 ? "Search Results" : folderTitle}
        </div>
      </div>
      {searchFiles.length > 0 ? (
        <SearchView />
      ) : (
        <div className="row">
          <div className="col">
            {files.map((file, key) => {
              return (
                <div
                  className="folder"
                  style={{
                    width: "100%",
                    backgroundColor:
                      AlphabetColor[Array.from(file.Titel)[0].toLowerCase()],
                    padding: 10,
                    borderRadius: 10,
                    marginTop: 10,
                  }}
                  onClick={() => {
                    setPdfFile(null);
                    setShowSpinner(true);
                    onSelect(key + file.Filename, file.id);
                    setSelectedFile(file.Titel);
                  }}
                  id={key + file.Filename}
                >
                  <div style={{ marginTop: 5 }}>{file.Titel}</div>
                  <div className="d-flex justify-content-end">
                    <FontAwesomeIcon icon={faFilePdf} />
                  </div>
                </div>
              );
            })}
          </div>
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={{
              border: "2px solid black",
              borderRadius: 10,
            }}
          >
            {pdfFile ? (
              <div
                style={{
                  height: rowHeight,
                }}
                id="iframe_modal"
              >
                <div className="d-flex justify-content-center mb-3">
                  <b>{selectedFile}</b>
                </div>
                <div className="d-flex justify-content-end">
                  <button
                    className="btn-round d-flex justify-content-center align-items-center"
                    style={zoomButtonStyle}
                    onClick={() => iframeButtonClick("zoomIn")}
                  >
                    <FontAwesomeIcon icon={faMagnifyingGlassPlus} />
                  </button>

                  <button
                    className="btn-round d-flex justify-content-center align-items-center"
                    style={{ ...zoomButtonStyle, marginLeft: 10 }}
                    onClick={() => {
                      iframeButtonClick("zoomOut");
                    }}
                  >
                    <FontAwesomeIcon icon={faMagnifyingGlassMinus} />
                  </button>

                  <button
                    className="btn-round d-flex justify-content-center align-items-center"
                    style={{ ...zoomButtonStyle, marginLeft: 10 }}
                    onClick={() => {
                      saveAs(pdfFile, selectedFile + ".pdf");
                    }}
                  >
                    <FontAwesomeIcon icon={faDownload} />
                  </button>

                  <button
                    className="btn-round d-flex justify-content-center align-items-center"
                    style={{ ...zoomButtonStyle, marginLeft: 10 }}
                    onClick={() => {
                      closeModal();
                    }}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>

                <iframe
                  id="pdf-js-viewer"
                  src={"lib/web/viewer.html?file=" + pdfFile}
                  title="webviewer"
                  frameBorder="0"
                  width="100%"
                  height={windowHeight}
                ></iframe>
              </div>
            ) : (
              <>
                <Spinner animation="grow" />
              </>
            )}
          </Modal>
        </div>
      )}
    </LayoutMobile>
  );
};

const zoomButtonStyle = {
  maxHeight: 35,
  minHeight: 35,
  maxWidth: 35,
  minWidth: 35,
  fontSize: 15,
  backgroundColor: "black",
};

export default MobileView;
