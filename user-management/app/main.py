from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

from .database import Base, engine, get_db
from . import crud, schemas
from typing import List

Base.metadata.create_all(bind=engine)

app = FastAPI()


@app.post("/users/", response_model=schemas.UserRead)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    return crud.create_user(db=db, user=user)


@app.get("/users/{user_id}", response_model=schemas.UserRead)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_id(db, user_id=user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@app.get("/users/", response_model=List[schemas.UserRead])
def read_users(db: Session = Depends(get_db)):
    return crud.list_users(db)


@app.put("/users/{user_id}", response_model=schemas.UserRead)
def update_user(
    user_id: int, user_update: schemas.UserBase, db: Session = Depends(get_db)
):
    db_user = crud.update_user(db, user_id, user_update)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@app.post("/users/{user_id}/chat_sessions/", response_model=schemas.ChatSessionRead)
def create_chat_session(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_id(db, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return crud.create_chat_session(db, user_id)


@app.post("/chat_sessions/{session_id}/messages/", response_model=schemas.MessageRead)
def add_message(
    session_id: int, message: schemas.MessageCreate, db: Session = Depends(get_db)
):
    db_session = crud.get_chat_session(db, session_id)
    if not db_session:
        raise HTTPException(status_code=404, detail="Chat session not found")
    return crud.create_message(db, session_id, message)


@app.get(
    "/users/{user_id}/chat_sessions/", response_model=List[schemas.ChatSessionRead]
)
def list_user_chat_sessions(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_id(db, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return crud.list_chat_sessions_for_user(db, user_id)


@app.get("/chat_sessions/{session_id}", response_model=schemas.ChatSessionRead)
def read_chat_session(session_id: int, db: Session = Depends(get_db)):
    db_session = crud.get_chat_session(db, session_id)
    if not db_session:
        raise HTTPException(status_code=404, detail="Chat session not found")
    return db_session


@app.post("/users/{user_id}/summaries/", response_model=schemas.SummaryRead)
def create_user_summary(
    user_id: int, summary_data: schemas.SummaryCreate, db: Session = Depends(get_db)
):
    db_user = crud.get_user_by_id(db, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return crud.create_summary(db, user_id, summary_data)


@app.get("/users/{user_id}/summaries/", response_model=List[schemas.SummaryRead])
def list_user_summaries(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_id(db, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return crud.list_summaries_for_user(db, user_id)
