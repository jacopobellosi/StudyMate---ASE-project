import TextProcessor from "./TextProcessor";
import React from "react";

const SummarizeProcessor: React.FC = () => {
  const handleAction = async (text: string): Promise<string> => {
    return 'TODO Summarized text: ' + text;
  };

  return (
    <TextProcessor
      title="Summarizer"
      actionButtonText="Summarize"
      handleAction={handleAction}
    />
  );
};


export default SummarizeProcessor;
