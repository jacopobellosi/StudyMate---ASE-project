import React from "react";
import Sidebar from "./Sidebar";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface TextareasProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  resultText: string;
  setResultText: React.Dispatch<React.SetStateAction<string>>;
}

const Textareas: React.FC<TextareasProps> = ({
  text,
  setText,
  resultText,
  setResultText,
}) => {

  const handleChange = (value) => {
    setText(value);
    console.log(value);
  }

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
          {/* <textarea
            className="form-control h-100"
            id="input"
            placeholder="HEEEEEEEEEEERE"
            style={{ resize: "none" }}
            value={text}
            onChange={(e) => setText(e.target.value)}
          /> */}
          <ReactQuill
            theme="snow"
            className="h-100"
            id="input"
            placeholder="Start taking notes here"
            value={text}
            onChange={handleChange}
            // className="form-control h-100"
            style={{
              borderRadius: '7px',
              overflow: 'hidden',
              border: '1px solid gray'
            }} />
          <div
            className="position-absolute top-0 end-0 mt-2 me-2 bg-light p-1"
            style={{ cursor: "pointer", fontSize: "1em" }}
            onClick={handleClear} // also remove or make it white bg
          >
            <i className="bi bi-x-circle"></i>
          </div>
        </div>
      </div>
      <div style={{ flex: "2" }} className="ms-2 d-flex">
        <div data-mdb-input-init className="form-outline flex-grow-1">
          <textarea
            className="form-control h-100"
            id="output"
            placeholder="Result will appear here"
            style={{ resize: "none" }}
            value={resultText}
            onChange={(e) => setResultText(e.target.value)} // change to non-editable
          />
        </div>
      </div>
    </div>
  );
};

export default Textareas;
