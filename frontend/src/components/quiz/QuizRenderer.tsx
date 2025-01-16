import SectionRenderer from "./SectionRenderer";
import { AssessmentTest } from "../../clients/paraphrasing_tool";

interface QuizRendererProps {
  test: AssessmentTest;
  responses: { [key: string]: string[] };
  onResponseChange: (questionId: string, response: string[]) => void;
  submitted: boolean;
  displaySectionTitle?: boolean;
}

const QuizRenderer = ({ test, responses, onResponseChange, submitted, displaySectionTitle = false }: QuizRendererProps) => {
  return (
    <div style={{ backgroundColor: "#f5f5f5", padding: "20px" }}>
      {test.sections.map((section) => (
        <SectionRenderer
          key={section.identifier}
          section={section}
          responses={responses}
          onResponseChange={onResponseChange}
          submitted={submitted}
          displaySectionTitle={displaySectionTitle}
        />
      ))}
    </div>
  );
};

export default QuizRenderer;
