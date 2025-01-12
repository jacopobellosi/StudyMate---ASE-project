import QuestionRenderer from "./QuestionRenderer";
import { AssessmentSection, Item } from "../../../generated/api"; // Correct import path

interface SectionRendererProps {
  section: AssessmentSection;
  responses: { [key: string]: string[] };
  onResponseChange: (questionId: string, response: string[]) => void;
  submitted: boolean;
  displaySectionTitle?: boolean;
}

const SectionRenderer = ({ section, responses, onResponseChange, submitted, displaySectionTitle = false }: SectionRendererProps) => {
  return (
    <div>
      {displaySectionTitle && <h2>{section.title}</h2>}
      {section.items.map((item: Item, index: number) => (
        <div key={item.identifier}>
          <h3>Question {index + 1}</h3>
          <QuestionRenderer
            question={item}
            response={responses[item.identifier]}
            onResponseChange={(response) =>
              onResponseChange(item.identifier, response)
            }
            submitted={submitted}
          />
        </div>
      ))}
    </div>
  );
};

export default SectionRenderer;
