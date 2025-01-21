export interface ParaphraseRequest {
  text: string;
  style?: string;
}

export interface ParaphraseResponse {
  paraphrasedText: string;
}

export interface SimpleChoice {
  identifier: string;
  text: string;
}

export interface ChoiceInteraction {
  response_identifier: string;
  shuffle: boolean;
  max_choices: number;
  prompt: string;
  choices: SimpleChoice[];
}

export interface ResponseDeclaration {
  identifier: string;
  cardinality: string;
  base_type: string;
  correct_response: string[];
}

export interface Item {
  identifier: string;
  title: string;
  response_declaration: ResponseDeclaration;
  item_body: ChoiceInteraction;
}

export interface AssessmentSection {
  identifier: string;
  title: string;
  items: Item[];
}

export interface AssessmentTest {
  identifier: string;
  title: string;
  tool_name: string;
  tool_version: string;
  sections: AssessmentSection[];
}
