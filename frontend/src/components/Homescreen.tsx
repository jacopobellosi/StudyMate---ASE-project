import Footer from "./Footer";
import Header from "./Header";
import Textareas from "./Textareas";
import React, { useState, useRef } from "react";
import axios from "axios";
import TurndownService from 'turndown';

const Homescreen: React.FC = () => {
  let title = "StudyMate";
  const [text, setText] = useState("");
  const [resultText, setResultText] = useState("");
  const imageInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  // Function to trigger the file input dialog
  const triggerImageUpload = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  const triggerAudioUpload = () => {
    if (audioInputRef.current) {
      audioInputRef.current.click();
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
          "http://127.0.0.1:5001/extract-text",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response.data.extracted_text)
        setText((prevText) => prevText + "\n" + "<p>" + response.data.extracted_text + "</p>");
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleAudioUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/transcribe",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response.data.text)
        setText((prevText) => prevText + "\n" + "<p>" + response.data.text + "</p>");
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  const onSummariseClick = async () => {
    const turndownService = new TurndownService();
    const markdownText = turndownService.turndown(text);
    console.log(markdownText)
    const result = await summarise(markdownText);
    setResultText(result); 
  };

  const onParaphraseClick = async () => {
    const turndownService = new TurndownService();
    const markdownText = turndownService.turndown(text);
    console.log(markdownText)
    const result = await paraphrase(markdownText); 
    setResultText(result);
  };

  const summarise = async (text: string): Promise<string> => {

    return "TODO Summarized text: " + text;
  };

  const paraphrase = async (text: string): Promise<string> => {
    const requestData = { text, style: "standard" };
    try {
      // fix URL
      const response = await axios.post(
        "http://paraphrasing-tool:5000/paraphrase",
        requestData
      );
      return response.data.paraphrased_text;
    } catch (error) {
      console.error("Error communicating with the API:", error);
      return "An unexpected error occurred.";
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
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={onSummariseClick}
                >
                  Summarise
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={onParaphraseClick}
                >
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
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default navigation behavior
                    triggerAudioUpload(); // Trigger the file input dialog
                  }}
                >
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
            <input
              id="upload-audio"
              ref={audioInputRef}
              style={{ display: "none" }}
              type="file"
              onChange={handleAudioUpload}
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
