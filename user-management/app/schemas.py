from datetime import datetime
from pydantic import BaseModel
from typing import List, Optional


class UserBase(BaseModel):
    username: str
    email: str
    profile_pic: Optional[str] = None


class UserCreate(UserBase):
    password: str
    email: str
    username: str

class UserRead(UserBase):
    id: int
    signup_date: datetime

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None


class MessageBase(BaseModel):
    sender: str
    content: str


class MessageCreate(MessageBase):
    pass


class MessageRead(MessageBase):
    id: int
    timestamp: datetime

    class Config:
        from_attributes = True


class ChatSessionBase(BaseModel):
    pass


class ChatSessionCreate(ChatSessionBase):
    pass


class ChatSessionRead(ChatSessionBase):
    id: int
    created_at: datetime
    messages: List[MessageRead] = []

    class Config:
        from_attributes = True


class SummaryBase(BaseModel):
    original_text: str
    summarized_text: str


class SummaryCreate(SummaryBase):
    pass


class SummaryRead(SummaryBase):
    id: int
    timestamp: datetime

    class Config:
        from_attributes = True
