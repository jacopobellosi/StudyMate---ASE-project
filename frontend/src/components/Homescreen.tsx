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

  const handleAudioUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          "http://voice-transcription:8000/transcribe",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setText((prevText) => prevText + "\n\n" + response.data.text);
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  const onSummariseClick = async () => {
    const result = await summarise(text); // Fetch result from API
    setResultText(result); // Update resultText
  };

  const onParaphraseClick = async () => {
    const result = await paraphrase(text); // Fetch result from API
    setResultText(result); // Update resultText
  };

  const summarise = async (text: string): Promise<string> => {
    try {
      const response = await fetch(`http://localhost:8000/summarize?request=${text}&percentage=70`);
      if (!response.ok) {
        throw new Error('Failed to summarize text');
      }
      const summarizedText = await response.json();
      
      return summarizedText;
    } catch (error) {
      console.error('Error fetching summary:', error);
      throw error;
    } 
  };

  const paraphrase = async (text: string): Promise<string> => {
    const requestData = { text, style: "standard" };
    try {
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
          <button type="button" className="btn btn-secondary" data-bs-toggle="modal"
          data-bs-target="#addNote">
            Save as new note
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Homescreen;
