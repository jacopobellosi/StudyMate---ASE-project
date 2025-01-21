import Footer from "./Footer";
import Header from "./Header";
import Textareas from "./Textareas"; // Import Textareas
import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AssessmentTest } from "../clients/paraphrasing_tool";

const Homescreen: React.FC = () => {
  let title = "Study Companion";
  const [text, setText] = useState("");
  const [resultText, setResultText] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

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
    const result = await summarise(text);
    setResultText(result);
    setIsPopupVisible(true);
  };

  const onParaphraseClick = async () => {
    const result = await paraphrase(text);
    setResultText(result);
    setIsPopupVisible(true);
  };

  const onGenerateQuizClick = async () => {
    const result = await generateTest(text);
    if (result) {
      navigate("/quiz", { state: { quizData: result } });
    } else {
      alert("Test generation failed. Please try again.");
    }
  };

  const summarise = async (text: string): Promise<string> => {
    return "TODO Summarized text: " + text;
  };

  const paraphrase = async (text: string): Promise<string> => {
    const requestData = { text, style: "standard" };
    try {
      const response = await axios.post(
        "http://localhost:5002/paraphrase",
        requestData,
        { headers: { "Content-Type": "application/json" }, responseType: "text" }
      );
      return response.data;
    } catch (error) {
      console.error("Error communicating with the API:", error);
      return "An unexpected error occurred.";
    }
  };

  const generateTest = async (text: string): Promise<AssessmentTest | undefined> => {
    try {
      const response = await axios.post<AssessmentTest>("http://localhost:5002/generate_test", {
        text: text,
      });
      return response.data;
    } catch (error) {
      console.error("Error generating test:", error);
      return undefined;
    }
  }

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <div className="container-fluid vh-100 d-flex flex-column">
      <Header title={title} />
      <hr className="border border-1 opacity-50" />
      <Textareas
        text={text}
        setText={setText}
        resultText={resultText}
        isPopupVisible={isPopupVisible}
        closePopup={closePopup}
      />
      <div className="d-flex mb-3 mt-2">
        <div
          style={{ flex: "2.5" }}
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
                  onClick={(e) => {
                    e.preventDefault();
                    onSummariseClick();
                  }}
                >
                  Summarise
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onParaphraseClick();
                  }}
                >
                  Paraphrase
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={onGenerateQuizClick}
                >
                  Generate quiz
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
                    e.preventDefault();
                    triggerImageUpload();
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
                    e.preventDefault();
                    triggerAudioUpload();
                  }}
                >
                  Audio
                </a>
              </li>
            </ul>
            <input
              id="upload-image"
              ref={imageInputRef}
              style={{ display: "none" }}
              type="file"
              onChange={handleImageUpload}
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
        <div style={{ flex: "3" }} className="ms-2 d-flex justify-content-end">
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
