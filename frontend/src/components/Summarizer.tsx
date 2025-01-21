import TextProcessor from "./TextProcessor";
import React, { useState } from "react";

const SummarizeProcessor: React.FC = (): JSX.Element => {
  const [loading, setLoading] = useState(false);

  //get the value of the textarea id=input in the TextProcessor component
  const getInputValue = (): string => {
    const inputElement = document.getElementById('input') as HTMLTextAreaElement;
    return inputElement ? inputElement.value : '';
  };

  const handleAction = async (): Promise<string> => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/summarize?request=${getInputValue()}&percentage=70`);
      if (!response.ok) {
        throw new Error('Failed to summarize text');
      }
      const summarizedText = await response.json();
      const outputElement = document.getElementById('output') as HTMLTextAreaElement;
      if (outputElement) {
        outputElement.value = summarizedText;
      }
      return summarizedText;
    } catch (error) {
      console.error('Error fetching summary:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
      <div style={{ textAlign: 'center', position: 'relative' }}>
        <TextProcessor
          title="Summarizer"
          actionButtonText="Summarize"
          handleAction={handleAction}
        />
        {loading && <img src='/src/assets/loading.gif' alt="Loading..." style={{ width: '20px', height: '20px', position: 'absolute', right: '-30px', top: '50%', transform: 'translateY(-50%)' }} />}
      </div>
    </div>
  );
};

export default SummarizeProcessor;
