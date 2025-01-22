import { useState } from "react";
import axios from "axios";

export const useImageUpload = () => {
  const [text, setText] = useState("");

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
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

  return { text, handleImageUpload };
};
