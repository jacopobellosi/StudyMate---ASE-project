import { useState } from "react";

// Import the test JSON data
const testData = {
  "assessmentTest": {
    "identifier": "GAIfO_Test",
    "title": "GAIfO Exam Test",
    "language": "en",
    "sections": [
      {
        "identifier": "SECTION1",
        "title": "Test on GAIfO",
        "questions": [
          {
            "identifier": "Q1",
            "title": "Goal of Imitation from Observation",
            "type": "multipleChoice",
            "prompt": "What is the goal of imitation from observation?",
            "choices": [
              {
                "identifier": "A",
                "text": "To perfectly mimic the actions of the expert."
              },
              {
                "identifier": "B",
                "text": "To perform tasks with the same effect as the expert's actions."
              },
              {
                "identifier": "C",
                "text": "To replicate the state transitions of the expert without considering the task."
              },
              {
                "identifier": "D",
                "text": "To learn how to create random actions for exploration."
              }
            ],
            "correctAnswer": "B"
          },
          {
            "identifier": "Q2",
            "title": "Role of the Discriminator",
            "type": "multipleChoice",
            "prompt": "What does the discriminator in the GAIfO algorithm do?",
            "choices": [
              {
                "identifier": "A",
                "text": "Generates new actions for the policy to execute."
              },
              {
                "identifier": "B",
                "text": "Takes state transitions as input and outputs a value between 0 and 1."
              },
              {
                "identifier": "C",
                "text": "Executes the task based on the expert's parameters."
              },
              {
                "identifier": "D",
                "text": "Minimizes the policy's loss function."
              }
            ],
            "correctAnswer": "B"
          }
        ]
      }
    ]
  }
};

function TextInputForm() {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const handleAnswerChange = (questionId: string, choiceId: string) => {
    setAnswers({ ...answers, [questionId]: choiceId });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const renderFeedback = (question: { identifier: string; correctAnswer: string }) => {
    const userAnswer = answers[question.identifier];
    const correct = question.correctAnswer;
    if (userAnswer === correct) {
      return <span style={{ color: "green" }}>Correct!</span>;
    }
    return <span style={{ color: "red" }}>Wrong. Correct answer: {correct}</span>;
  };

  return (
    <div>
      <h1>{testData.assessmentTest.title}</h1>
      {testData.assessmentTest.sections.map((section) => (
        <div key={section.identifier}>
          <h2>{section.title}</h2>
          {section.questions.map((question) => (
            <div key={question.identifier} style={{ marginBottom: "20px" }}>
              <h3>{question.prompt}</h3>
              {question.choices.map((choice) => (
                <div key={choice.identifier}>
                  <label>
                    <input
                      type="radio"
                      name={question.identifier}
                      value={choice.identifier}
                      checked={answers[question.identifier] === choice.identifier}
                      onChange={() =>
                        handleAnswerChange(question.identifier, choice.identifier)
                      }
                      disabled={submitted}
                    />
                    {choice.text}
                  </label>
                </div>
              ))}
              {submitted && renderFeedback(question)}
            </div>
          ))}
        </div>
      ))}
      {!submitted && (
        <button onClick={handleSubmit} style={{ marginTop: "20px" }}>
          Submit Test
        </button>
      )}
    </div>
  );
}

export default TextInputForm;
