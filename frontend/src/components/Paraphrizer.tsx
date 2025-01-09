import TextProcessor from "./TextProcessor";

function Paraphrizer() {
  return (
    <TextProcessor
      title="Paraphrizer"
      actionButtonText="Paraphrase"
      apiEndpoint="http://localhost:5002/paraphrase"
    />
  );
}

export default Paraphrizer;
