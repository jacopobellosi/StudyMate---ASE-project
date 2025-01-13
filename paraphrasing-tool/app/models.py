from pydantic import BaseModel
from typing import List, Optional

class ParaphraseRequest(BaseModel):
    text: str
    style: Optional[str] = "standard"

class ParaphraseResponse(BaseModel):
    paraphrasedText: str

class GenerateTestRequest(BaseModel):
    text: str

class SimpleChoice(BaseModel):
    identifier: str
    text: str

class ChoiceInteraction(BaseModel):
    response_identifier: str
    shuffle: bool
    max_choices: int
    prompt: str
    choices: List[SimpleChoice]

class ResponseDeclaration(BaseModel):
    identifier: str
    cardinality: str
    base_type: str
    correct_response: List[str]

class Item(BaseModel):
    identifier: str
    title: str
    response_declaration: ResponseDeclaration
    item_body: ChoiceInteraction

class AssessmentSection(BaseModel):
    identifier: str
    title: str
    items: List[Item]

class AssessmentTest(BaseModel):
    identifier: str
    title: str
    tool_name: str
    tool_version: str
    sections: List[AssessmentSection]


