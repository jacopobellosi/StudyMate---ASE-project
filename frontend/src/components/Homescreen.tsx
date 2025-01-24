import Footer from "./Footer";
import Header from "./Header";
import Textareas from "./Textareas";
import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AssessmentTest } from "../clients/paraphrasing_tool";
import TurndownService from 'turndown';
import bongoCat from '../assets/bongo_cat.gif';

const Homescreen: React.FC = () => {
  let title = "🐱 StudyMate";
  const [text, setText] = useState("");
  const [resultText, setResultText] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState<number | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
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
    setIsLoading(false);
  };

  const handleAudioUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsLoading(true);
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
    setIsLoading(false);
  };

  const onSummariseClick = async () => {
    setIsLoading(true);
    const turndownService = new TurndownService();
    const markdownText = turndownService.turndown(text);
    console.log(markdownText);
    const result = await summarise(markdownText);
    setResultText(result);
    setIsPopupVisible(true);
    setIsLoading(false);
  };

  const onParaphraseClick = async () => {
    setIsLoading(true);
    const turndownService = new TurndownService();
    const markdownText = turndownService.turndown(text);
    console.log(markdownText);
    const result = await paraphrase(markdownText);
    setResultText(result);
    setIsPopupVisible(true);
    setIsLoading(false);
  };

  const onGenerateQuizClick = async () => {
    setIsLoading(true);
    const turndownService = new TurndownService();
    const markdownText = turndownService.turndown(text);
    console.log(markdownText);
    const result = await generateTest(text);
    if (result) {
      navigate("/quiz", { state: { quizData: result } });
    } else {
      alert("Test generation failed. Please try again.");
    }
    setIsLoading(false);
  };

  const summarise = async (text: string): Promise<string> => {

    try {
      // console.log(`http://localhost:8001/summarize?request=${text}&percentage=70`)
      const response = await fetch(`http://localhost:8001/summarize?request=${text}&percentage=70`);
      if (!response.ok) {
        throw new Error('Failed to summarize text');
      }
      const summarizedText = await response.json();

      // console.log('Summarized text:', summarizedText);
      
      return summarizedText["response"];
    } catch (error) {
      console.error('Error fetching summary:', error);
      throw error;
    } 
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

  const saveCurrentNote = async () => {
    if (currentNoteId === null) {
      console.error('No note selected to save');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const payload = {
        note_content: text
      };
      const response = await fetch(`http://localhost:5000/notes/${currentNoteId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        console.log('Note saved successfully');
        // fetchNotes(); // Refresh the notes list after saving a new note
      } else {
        console.error('Failed to save note', response.statusText);
      }
    } catch (error) {
      console.error('Error saving note', error);
    }
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
        setCurrentNoteId={setCurrentNoteId}
      />
      <div className="d-flex mb-3 mt-2">
        <div
          style={{ flex: "1.3" }}
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
        <div style={{ flex: "3" }} className="ms-2 d-flex justify-content-end align-items-center">
          {isLoading && <img src={bongoCat} alt="Loading..." style={{ width: '50px', height: '50px', marginRight: '10px' }} />}
          <button type="button" className="btn btn-secondary" onClick={saveCurrentNote}>
            Save
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Homescreen;
