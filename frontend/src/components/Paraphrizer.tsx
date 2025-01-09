import TextProcessor from "./TextProcessor";
import axios from "axios";
import React from "react";

const ParaphrizeProcessor: React.FC = () => {
  const handleAction = async (text: string): Promise<string> => {
    const requestData = { text, style: "standard" };
    try {
      const response = await axios.post("http://localhost:5002/paraphrase", requestData);
      return response.data.paraphrased_text;
    } catch (error) {
      console.error("Error communicating with the API:", error);
      return 'An unexpected error occurred.';
    }
  };

  return (
    <TextProcessor
      title="Paraphrizer"
      actionButtonText="Paraphrase"
      handleAction={handleAction}
    />
  );
};


export default ParaphrizeProcessor;
