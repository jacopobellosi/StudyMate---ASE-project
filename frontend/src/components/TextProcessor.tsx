import React, { useState } from "react";
import Textareas from "./Textareas";
import Footer from "./Footer";
import Header from "./Header";
import axios from "axios";

interface TextProcessorProps {
  title: string;
  actionButtonText: string;
  apiEndpoint: string;
}

const TextProcessor: React.FC<TextProcessorProps> = ({ title, actionButtonText, apiEndpoint }) => {
  const [text, setText] = useState("");
  const [resultText, setResultText] = useState("");

  const handleSubmit = async () => {
    const requestData = { text };

    try {
      const response = await axios.post(apiEndpoint, requestData);
      setResultText(response.data);
    } catch (error) {
      console.error("Error communicating with the API:", error);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("http://localhost:5001/extract-text", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        if (response.ok) {
          setText((prevText) => prevText + data.extracted_text);
        } else {
          alert(data.error);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleAudioUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("http://localhost:5003/transcribe", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        if (response.ok) {
          setText((prevText) => prevText + data.text);
        } else {
          alert(data.error || "An error occurred while uploading the file.");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex flex-column">
      <Header title={title} />
      <Textareas text={text} setText={setText} resultText={resultText} setResultText={setResultText} />
      <div className="d-flex align-items-center gap-2">
        <label htmlFor="upload-image" className="btn btn-outline-secondary">
          Upload Image
        </label>
        <label htmlFor="upload-audio" className="btn btn-outline-secondary">
          Upload Audio
        </label>
        <input
          id="upload-image"
          style={{ display: "none" }}
          type="file"
          onChange={handleImageUpload}
        />
        <input
          id="upload-audio"
          style={{ display: "none" }}
          type="file"
          onChange={handleAudioUpload}
        />
        <button type="button" className="btn btn-success" onClick={handleSubmit}>
          {actionButtonText}
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default TextProcessor;
