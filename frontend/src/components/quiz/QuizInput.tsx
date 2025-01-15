import { useState } from "react";
import axios from "axios";
import Quiz from "./QuizInteractor";
import { AssessmentTest } from "../../clients/paraphrasing_tool";

const QuizInput = () => {
  const [inputText, setInputText] = useState("");
  const [quizData, setQuizData] = useState<AssessmentTest | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateTest = async () => {
    setLoading(true);
    try {
      const response = await axios.post<AssessmentTest>("http://localhost:5002/generate_test", {
        text: inputText,
      });
      
      setQuizData(response.data);
    } catch (error) {
      console.error("Error generating test:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {!quizData ? (
        <div>
          <h1>Generate Your Quiz</h1>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text to generate quiz"
            rows={10}
            cols={50}
          />
          <button onClick={handleGenerateTest} disabled={loading}>
            {loading ? "Generating..." : "Generate Quiz"}
          </button>
          {loading && <p>Please wait while your quiz is being prepared...</p>}
        </div>
      ) : (
        <Quiz quizData={quizData} />
      )}
    </div>
  );
};

export default QuizInput;
