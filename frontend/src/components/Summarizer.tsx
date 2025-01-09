import TextProcessor from "./TextProcessor";

function Summarizer() {
  return (
    <TextProcessor
      title="Summarizer"
      actionButtonText="Summarize"
      apiEndpoint="http://127.0.0.1:8000/summarize/"
    />
  );
}

export default Summarizer;
