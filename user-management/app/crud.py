import bcrypt
from sqlalchemy.orm import Session
import models, schemas

def get_user_by_id(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate):
    #user.password = get_password_hash(user.password)
    db_user = models.User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def list_users(db: Session):
    return db.query(models.User).all()

def update_user(db: Session, user_id: int, user_update: schemas.UserBase):
    db_user = get_user_by_id(db, user_id)
    if not db_user:
        return None
    for field, value in user_update.dict(exclude_unset=True).items():
        setattr(db_user, field, value)
    db.commit()
    db.refresh(db_user)
    return db_user

def create_chat_session(db: Session, user_id: int):
    session = models.ChatSession(user_id=user_id)
    db.add(session)
    db.commit()
    db.refresh(session)
    return session

def create_message(db: Session, session_id: int, message: schemas.MessageCreate):
    db_msg = models.Message(session_id=session_id, **message.dict())
    db.add(db_msg)
    db.commit()
    db.refresh(db_msg)
    return db_msg

def get_chat_session(db: Session, session_id: int):
    return (
        db.query(models.ChatSession).filter(models.ChatSession.id == session_id).first()
    )

def list_chat_sessions_for_user(db: Session, user_id: int):
    return (
        db.query(models.ChatSession).filter(models.ChatSession.user_id == user_id).all()
    )

def create_summary(db: Session, user_id: int, summary_data: schemas.SummaryCreate):
    db_summary = models.SummaryHistory(user_id=user_id, **summary_data.dict())
    db.add(db_summary)
    db.commit()
    db.refresh(db_summary)
    return db_summary

def list_summaries_for_user(db: Session, user_id: int):
    return (
        db.query(models.SummaryHistory)
        .filter(models.SummaryHistory.user_id == user_id)
        .all()
    )

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

def authenticate_user(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)
    #if not user or not verify_password(password, user.password):
    #    return False
    if user.password != password:
        return False
    return user

def get_password_hash(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')