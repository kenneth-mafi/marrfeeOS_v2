import os
from dotenv import load_dotenv

load_dotenv()  # reads .env into environment variables

class Config:
    # Read DATABASE_URL from environment
    SQLALCHEMY_DATABASE_URI = os.getenv("MARRFEE_OS_DB_URL")
    SQLALCHEMY_TRACK_MODIFICATIONS = False