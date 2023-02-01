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
import AlphabetColor from "../SideBar/AlphabetColor";
import Modal from "react-modal";
import { Spinner } from "react-bootstrap";
import { GetRequest } from "../../repository/RequestMaker";
import b64toBlob from "../../sharedLogics/b64toBlob";
import Endpoints from "../../repository/Endpoints";

Modal.setAppElement("#root");

const SearchView = () => {
  const searchFiles = useSelector((state) => state.search.searchFiles);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [rowHeight, setRowHeight] = useState("100%");
  const [windowHeight, setWindowHeight] = useState(0);
  const [showSpinner, setShowSpinner] = useState(false);

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

  useEffect(() => {
    if (!modalIsOpen) {
      return;
    }
  }, [modalIsOpen]);

  const onSelect = (fileId) => {
    GetRequest(Endpoints.file + fileId).then((res) => {
      var blob = b64toBlob(res.body.file_base64, "application/pdf");
      setPdfFile(URL.createObjectURL(blob));
      setTimeout(() => {
        setWindowHeight(document.getElementById("iframe_modal").offsetHeight);
        setShowSpinner(false);
      }, 100);
    });
  };

  return (
    <>
      <div className="row">
        {searchFiles.map((file, key) => {
          return (
            <div className="col-md-3 mb-3">
              <div
                className="d-flex folder"
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor:
                    AlphabetColor[Array.from(file.Titel)[0].toLowerCase()],
                  padding: 10,
                  borderRadius: 10,
                  marginTop: 10,
                  flexDirection: "column",
                }}
                onClick={() => {
                  openModal();
                  onSelect(file.id);
                  setSelectedFile(file.Titel);
                }}
                id={key + ""}
              >
                <div>{file.Titel}</div>
                <div
                  className="d-flex justify-content-end"
                  style={{ marginTop: "auto" }}
                >
                  <FontAwesomeIcon icon={faFilePdf} />
                </div>
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

            {windowHeight > 0 ? (
              <iframe
                id="pdf-js-viewer"
                src={"lib/web/viewer.html?file=" + pdfFile}
                title="webviewer"
                frameBorder="0"
                width="100%"
                height={windowHeight}
              ></iframe>
            ) : (
              <Spinner animation="grow" />
            )}
          </div>
        ) : (
          <>
            {" "}
            <Spinner animation="grow" />
          </>
        )}
      </Modal>
    </>
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

export default SearchView;
