import Footer from "./Footer";
import Header from "./Header";
import Textareas from "./Textareas";
import React, { useState } from "react";

const Homescreen: React.FC = () => {
  let title = "Study Companion";
  const [text, setText] = useState("");
  const [resultText, setResultText] = useState("");

  return (
    <div className="container-fluid vh-100 d-flex flex-column">
      <Header title={title} />
      <Textareas
        text={text}
        setText={setText}
        resultText={resultText}
        setResultText={setResultText}
      />
      <div className="d-flex mb-3 mt-2">
        <div
          style={{ flex: "1" }}
          className="me-2 d-flex position-relative"
        ></div>
        <div style={{ flex: "2" }} className="me-2 d-flex position-relative">
          <div className="btn-group dropend me-2">
            <button
              type="button"
              className="btn btn-warning dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi bi-magic"></i>
            </button>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  Summarise
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Paraphrase
                </a>
              </li>
            </ul>
          </div>

          <div className="btn-group dropend">
            <button
              type="button"
              className="btn btn-warning dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Add text from
            </button>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  Image
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Audio
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div style={{ flex: "2" }} className="ms-2 d-flex justify-content-end">
          <button type="button" className="btn btn-secondary">
            Save as new note
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Homescreen;
