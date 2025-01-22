import QuestionRenderer from "./QuestionRenderer";
import { AssessmentSection, Item } from "../../clients/paraphrasing_tool";

interface SectionRendererProps {
  section: AssessmentSection;
  responses: { [key: string]: string[] };
  onResponseChange: (questionId: string, response: string[]) => void;
  submitted: boolean;
  displaySectionTitle?: boolean;
}

const SectionRenderer = ({ section, responses, onResponseChange, submitted, displaySectionTitle = false }: SectionRendererProps) => {
  return (
    <div style={{ padding: "20px" }}>
      {displaySectionTitle && <h2>{section.title}</h2>}
      {section.items.map((item: Item, index: number) => (
        <div key={item.identifier} style={{ backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", marginBottom: "20px", padding: "20px" }}>
          <h4 style={{ color: "grey" }}>Question {index + 1}</h4>
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
