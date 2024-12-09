import Footer from "./Footer";
import { useState } from "react";

function Paraphrizer() {
  const [text, setText] = useState("");

  const handleClear = () => {
    setText("");
  };

  return (
    <div className="container-fluid vh-100 d-flex flex-column">
      <h1>Paraphrizer</h1>
      <div className="d-flex align-items-center gap-2">
        <p>Style: </p>
        <button type="button" className="btn btn-outline-success">
          Standard
        </button>
        <button type="button" className="btn btn-outline-success">
          Formal
        </button>
        <button type="button" className="btn btn-outline-success">
          Fluency
        </button>
        <button type="button" className="btn btn-outline-success">
          Detailed
        </button>
        <button type="button" className="btn btn-outline-success">
          Academic
        </button>
      </div>
      <div className="d-flex mb-3 mt-2 vh-100">
        <div className="w-50 me-2 d-flex position-relative">
          <div data-mdb-input-init className="form-outline flex-grow-1">
            <textarea
              className="form-control h-100"
              id="input"
              placeholder="To rewrite text, enter or paste it here and press Paraphraze"
              style={{ resize: "none" }}
              value={text} // Bind the value to the state
              onChange={(e) => setText(e.target.value)} // Update state on change
            />

            <div
              className="position-absolute top-0 end-0 mt-2 me-2 bg-light p-1"
              style={{ cursor: "pointer", fontSize: "1em" }}
              onClick={handleClear} // Add click handler
            >
              <i className="bi bi-x-circle"></i>
            </div>
          </div>
        </div>
        <div className="w-50 ms-2 d-flex">
          <div data-mdb-input-init className="form-outline flex-grow-1">
            <textarea
              className="form-control h-100"
              id="output"
              readOnly
              style={{ resize: "none" }}
            />
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center gap-2">
        <button type="button" className="btn btn-outline-secondary">
          Upload Image
        </button>
        <button type="button" className="btn btn-outline-secondary">
          Upload Audio
        </button>
        <button type="button" className="btn btn-success">
          Paraphraze
        </button>
      </div>

      <Footer />
    </div>
  );
}

export default Paraphrizer;
