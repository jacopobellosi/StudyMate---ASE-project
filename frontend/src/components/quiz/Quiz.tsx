import { useState } from "react";
import QuizRenderer from "./QuizRenderer";
import testData from "./testData.json"; // The provided JSON file

const Quiz = () => {
  const [responses, setResponses] = useState<{ [key: string]: string[] }>({}); // Track user responses
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

    const correctAnswers = testData.sections.reduce((acc, section) => {
      return acc + section.items.reduce((sectionAcc, question) => {
        const userAnswer = new Set(responses[question.identifier] || []);
        const correctAnswers = new Set(question.response_declaration.correct_response);
        const isCorrect = userAnswer.size === correctAnswers.size && [...userAnswer].every(answer => correctAnswers.has(answer));
        return sectionAcc + (isCorrect ? 1 : 0);
      }, 0);
    }, 0);

    const totalQuestions = testData.sections.reduce((acc, section) => acc + section.items.length, 0);
    alert(`You got ${correctAnswers} out of ${totalQuestions} correct!`);
  };

  return (
    <div>
      <h1>{testData.title}</h1>
      <QuizRenderer
        test={testData}
        responses={responses}
        onResponseChange={handleResponseChange}
        submitted={submitted}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Quiz;

