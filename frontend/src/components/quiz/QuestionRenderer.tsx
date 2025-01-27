import { SimpleChoice, Item } from "../../clients/paraphrasing_tool";

interface QuestionRendererProps {
  question: Item;
  response: string[];
  onResponseChange: (response: string[]) => void;
  submitted: boolean;
}

function QuestionRenderer({ question, response = [], onResponseChange, submitted }: QuestionRendererProps) {
  const isMultiple = question.response_declaration.cardinality === "multiple";
  const choices = question.item_body.choices || [];

  const handleChange = (value: string) => {
    console.log(`User chose option ${value} for question ${question.identifier}`);
    if (isMultiple) {
      const updatedResponse = response.includes(value)
        ? response.filter((v: string) => v !== value)
        : [...response, value];
      console.log(`Updated response ${updatedResponse} for question ${question.identifier}`);
      onResponseChange(updatedResponse);
    } else {
      onResponseChange([value]);
    }
  };

  const renderFeedback = () => {
    const userAnswer = new Set(response);
    const correctAnswers = new Set(question.response_declaration.correct_response);
    const isCorrect = userAnswer.size === correctAnswers.size && [...userAnswer].every(answer => correctAnswers.has(answer));
    if (isCorrect) {
      return <div style={{ color: "green" }}>✅ Correct!</div>;
    }
    return <div style={{ color: "red" }}>❌ Correct Answer: {question.response_declaration.correct_response.join(", ")}</div>;
  };

  return (
    <div style={{ paddingBottom: "20px" }}>
      <h4>{question.item_body.prompt}</h4>
      {choices.map((choice: SimpleChoice) => (
        <label key={choice.identifier} style={{ display: "block", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", padding: "10px", marginBottom: "10px", position: "relative", paddingLeft: "35px" }}>
          <input
            type={isMultiple ? "checkbox" : "radio"}
            name={question.identifier}
            value={choice.identifier}
            checked={response.includes(choice.identifier)}
            onChange={() => handleChange(choice.identifier)}
            disabled={submitted}
            style={{ marginRight: "10px", position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }}
          />
          {choice.text}
        </label>
      ))}
      {submitted && renderFeedback()}
    </div>
  );
}

export default QuestionRenderer;
