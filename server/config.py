# МогучийДД (MoguchiyDD)
# 2024.10.10, 04:06 PM
# config.py


from os import getenv
from dotenv import load_dotenv

load_dotenv()

class Config:
    SQLALCHEMY_DATABASE_URI = getenv("DB_URL")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
