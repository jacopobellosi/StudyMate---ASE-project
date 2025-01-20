from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from jose import JWTError, jwt

from database import Base, engine, get_db
import crud, schemas
from typing import List, Optional

# Secret key to encode and decode JWT tokens
SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

Base.metadata.create_all(bind=engine)

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Adjust this to the specific origins you want to allow
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = crud.get_user_by_username(db, username=username)
    if user is None:
        raise credentials_exception
    return user

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/users/")
def create_user(email: str, username: str, password: str, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    user = schemas.UserCreate(email=email, username=username, password=password)
    return crud.create_user(db=db, user=user)

@app.post("/token", response_model=schemas.Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud.authenticate_user(db, email=form_data.username, password=form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/users/me/", response_model=schemas.UserRead)
def read_users_me(current_user: schemas.UserRead = Depends(get_current_user)):
    return current_user

@app.get("/users/{user_id}", response_model=schemas.UserRead)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_id(db, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@app.get("/users/", response_model=List[schemas.UserRead])
def read_users(db: Session = Depends(get_db)):
    return crud.list_users(db)

@app.put("/users/{user_id}", response_model=schemas.UserRead)
def update_user(user_id: int, user_update: schemas.UserBase, db: Session = Depends(get_db)):
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
def add_message(session_id: int, message: schemas.MessageCreate, db: Session = Depends(get_db)):
    db_session = crud.get_chat_session(db, session_id)
    if not db_session:
        raise HTTPException(status_code=404, detail="Chat session not found")
    return crud.create_message(db, session_id, message)

@app.get("/users/{user_id}/chat_sessions/", response_model=List[schemas.ChatSessionRead])
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
def create_user_summary(user_id: int, summary_data: schemas.SummaryCreate, db: Session = Depends(get_db)):
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
