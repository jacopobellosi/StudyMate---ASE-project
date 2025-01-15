import { useState } from "react";
import QuizRenderer from "./QuizRenderer";
import { AssessmentTest } from "../../clients/paraphrasing_tool";

const Quiz = ({ quizData }: { quizData: AssessmentTest }) => {
  const [responses, setResponses] = useState<{ [key: string]: string[] }>({});
  const [submitted, setSubmitted] = useState(false);

  const handleResponseChange = (questionId: string, response: string[]) => {
    console.log(`User chose option ${response} for question ${questionId}`);
    setResponses((prev) => ({
      ...prev,
      [questionId]: response,
    }));
  };

  const handleSubmit = () => {
    console.log("User Responses:", responses);
    setSubmitted(true); // Set submitted to true when the quiz is submitted

    const correctAnswers = quizData.sections.reduce((acc, section) => {
      return acc + section.items.reduce((sectionAcc, question) => {
        const userAnswer = new Set(responses[question.identifier] || []);
        const correctAnswers = new Set(question.response_declaration.correct_response);
        const isCorrect = userAnswer.size === correctAnswers.size && [...userAnswer].every(answer => correctAnswers.has(answer));
        return sectionAcc + (isCorrect ? 1 : 0);
      }, 0);
    }, 0);

    const totalQuestions = quizData.sections.reduce((acc, section) => acc + section.items.length, 0);
    alert(`You got ${correctAnswers} out of ${totalQuestions} correct!`);
  };

  return (
    <div>
      <h1>{quizData.title}</h1>
      <QuizRenderer
        test={quizData}
        responses={responses}
        onResponseChange={handleResponseChange}
        submitted={submitted}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Quiz;

