import React from "react";
import Sidebar from "./Sidebar";

interface TextareasProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  resultText: string;
  isPopupVisible: boolean;
  closePopup: () => void;
}

const Textareas: React.FC<TextareasProps> = ({
  text,
  setText,
  resultText,
  isPopupVisible,
  closePopup,
}) => {
  const handleClear = () => {
    setText("");
  };

  return (
    <div className="d-flex mb-3 mt-2 vh-100">
      <div style={{ flex: "1" }} className="me-2 d-flex position-relative">
        <Sidebar />
      </div>
      <div style={{ flex: "2" }} className="me-2 d-flex position-relative">
        <div data-mdb-input-init className="form-outline flex-grow-1">
          <textarea
            className="form-control h-100"
            id="input"
            placeholder="Enter or paste text here"
            style={{ resize: "none" }}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div
            className="position-absolute top-0 end-0 mt-2 me-2 bg-light p-1"
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
              className="position-absolute top-0 end-0 mt-2 me-2 bg-light p-1"
              style={{ cursor: "pointer", fontSize: "1em" }}
              onClick={closePopup}
            >
              <i className="bi bi-x-circle"></i>
            </div>
            <h3 className="mb-3">Result</h3> {/* Add title */}
            <textarea
              className="form-control h-100 border-0" // Remove border
              id="output"
              placeholder="Result will appear here"
              style={{ resize: "none", height: "100%" }} // Ensure the textarea takes the full height
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
