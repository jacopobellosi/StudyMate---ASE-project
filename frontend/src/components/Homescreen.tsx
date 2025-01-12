import Footer from "./Footer";
import Header from "./Header";
import Textareas from "./Textareas";
import React, { useState, useRef } from "react";
import axios from "axios";

const Homescreen: React.FC = () => {
  let title = "Study Companion";
  const [text, setText] = useState("");
  const [resultText, setResultText] = useState("");
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Function to trigger the file input dialog
  const triggerImageUpload = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          "http://character-recognition:5001/extract-text",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setText((prevText) => prevText + "\n\n" + response.data.extracted_text);
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex flex-column">
      <Header title={title} />
      <hr className="border border-1 opacity-50"></hr>
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
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default navigation behavior
                    triggerImageUpload(); // Trigger the file input dialog
                  }}
                >
                  Image
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Audio
                </a>
              </li>
            </ul>
            <input
              id="upload-image"
              ref={imageInputRef} // Assign the ref to the input
              style={{ display: "none" }}
              type="file"
              onChange={handleImageUpload} // Handle the file selection
            />
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
