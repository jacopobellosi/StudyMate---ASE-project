import TextProcessor from "./TextProcessor";
import React from "react";

const SummarizeProcessor: React.FC = (): JSX.Element => {


  //get the value of the textarea id=input in the TextProcessor component
  const getInputValue = (): string => {
    const inputElement = document.getElementById('input') as HTMLTextAreaElement;
    return inputElement ? inputElement.value : '';
  };
const handleAction = async (): Promise<string> => {
     const response = await fetch(`http://localhost:8000/summarize?request=${getInputValue()}&percentage=70`);
      console.log(response);
    if (!response.ok) {
        throw new Error('Failed to summarize text');
    }

    const summarizedText = await response.json();
    const outputElement = document.getElementById('output') as HTMLTextAreaElement;
    if (outputElement) {
      outputElement.value = summarizedText;
    }
    return summarizedText
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
