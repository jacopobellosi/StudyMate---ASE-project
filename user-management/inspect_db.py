from sqlalchemy.orm import Session
from app.database import engine
from app import crud

def inspect_db():
    with Session(engine) as session:
        users = crud.list_users(session)
        for user in users:
            print(f"ID: {user.id}, Username: {user.username}, Email: {user.email}, Password: {user.password},,Signup Date: {user.signup_date}")
        #show every coloumn in the users table
        print(users[0].__table__.columns.keys())

if __name__ == "__main__":
    inspect_db()
