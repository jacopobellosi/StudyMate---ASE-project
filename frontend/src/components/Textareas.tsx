import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Textareas.css';

interface TextareasProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  resultText: string;
  isPopupVisible: boolean;
  closePopup: () => void;
  setCurrentNoteId: React.Dispatch<React.SetStateAction<number | null>>;
}

const Textareas: React.FC<TextareasProps> = ({
  text,
  setText,
  resultText,
  isPopupVisible,
  closePopup,
  setCurrentNoteId
}) => {

  const [isCopied, setIsCopied] = useState(false);

  const handleChange = (value: React.SetStateAction<string>) => {
    setText(value);
    console.log(value);
  }

  const handleClear = () => {
    setText("");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(resultText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000);
  };

  return (
    <div className="d-flex mb-3 mt-2 vh-100">
      <div style={{ flex: "0.5" }} className="me-2 d-flex position-relative">
      <Sidebar setText={setText} setCurrentNoteId={setCurrentNoteId}/>
      </div>
      <div style={{ flex: "2" }} className="me-2 d-flex position-relative">
        <div data-mdb-input-init className="form-outline flex-grow-1">
          <ReactQuill
            theme="snow"
            className="h-100 custom-quill" 
            id="input"
            placeholder="Start taking notes here"
            value={text}
            onChange={handleChange}
            style={{
              borderRadius: '0px',
              overflow: 'hidden',
              boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.1)'
            }} />
          <div
            className="position-absolute top-0 end-0 mt-2 me-2 bg-white p-1"
            style={{ cursor: "pointer", fontSize: "1em" }}
            onClick={handleClear}
          >
            <i className="bi bi-x-circle"></i>
          </div>
        </div>
      </div>
      {isPopupVisible && (
        <div className="popup position-fixed top-0 end-0 vh-100 vw-100 d-flex justify-content-end align-items-center">
          <div className="popup-content bg-white p-3 shadow rounded-3 position-relative" style={{ maxWidth: "400px", width: "100%", height: "70vh", overflowY: "auto" }}> {/* Adjust height and round corners */}
            <div
              className="position-absolute top-0 end-0 mt-2 me-2 bg-light p-1 d-flex"
              style={{ cursor: "pointer", fontSize: "1em" }}
            >
              <i className={`bi ${isCopied ? "bi-check-circle" : "bi-clipboard"} me-2`} onClick={handleCopy}></i>
              <i className="bi bi-x-circle" onClick={closePopup}></i>
            </div>
            <h3 className="mb-3">Result</h3>
            <textarea
              className="form-control h-100 border-0"
              id="output"
              placeholder="Result will appear here"
              style={{ resize: "none", height: "100%" }}
              value={resultText}
              readOnly
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Textareas;
