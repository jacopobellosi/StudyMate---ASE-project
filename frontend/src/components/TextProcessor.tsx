import React, { useState } from "react";
import Textareas from "./Textareas";
import Footer from "./Footer";
import Header from "./Header";
import axios from "axios";

interface TextProcessorProps {
  title: string;
  actionButtonText: string;
  handleAction: (text: string) => Promise<string>;
}

const TextProcessor: React.FC<TextProcessorProps> = ({ title, actionButtonText, handleAction }) => {
  const [text, setText] = useState("");
  const [resultText, setResultText] = useState("");

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post("http://localhost:5001/extract-text", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setText((prevText) => prevText + ' ' + response.data.extracted_text);
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleAudioUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post("http://localhost:5003/transcribe", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setText((prevText) => prevText + ' ' +response.data.text);
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  const onActionClick = async () => {
    const result = await handleAction(text); // Fetch result from API
    setResultText(result); // Update resultText
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
        <button type="button" className="btn btn-success" onClick={onActionClick}>
          {actionButtonText}
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default TextProcessor;
