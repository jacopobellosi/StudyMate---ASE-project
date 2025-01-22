from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    profile_pic = Column(String, nullable=True)
    signup_date = Column(DateTime, default=datetime.utcnow)
    password = Column(String, nullable=False)

    # Relationships
    chat_sessions = relationship("ChatSession", back_populates="user")
    summaries = relationship("SummaryHistory", back_populates="user")
    notes = relationship("Note", back_populates="user")

class Note(Base):
    __tablename__ = "notes"

    id = Column(Integer, primary_key=True, index=True)  # Primary key
    user_id = Column(Integer, ForeignKey("users.id"))  # Foreign key to User
    notes_title = Column(String, nullable=False)  # Title of the note
    note_content = Column(Text, nullable=False)  # Content of the note
    created_at = Column(DateTime, default=datetime.utcnow)  # Timestamp of creation

    # Relationship to link to the User table
    user = relationship("User", back_populates="notes")

class ChatSession(Base):
    __tablename__ = "chat_sessions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="chat_sessions")
    messages = relationship("Message", back_populates="chat_session")


class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(Integer, ForeignKey("chat_sessions.id"))
    sender = Column(String)  # "user" or "system" or "assistant"
    content = Column(Text)
    timestamp = Column(DateTime, default=datetime.utcnow)

    chat_session = relationship("ChatSession", back_populates="messages")


class SummaryHistory(Base):
    __tablename__ = "summary_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    original_text = Column(Text)
    summarized_text = Column(Text)
    timestamp = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="summaries")
