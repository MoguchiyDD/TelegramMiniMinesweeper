# МогучийДД (MoguchiyDD)
# 2024.10.10, 04:03 PM
# __init__.py


from flask import Flask, jsonify
from server.routes import main
from server.models import db

from os import getenv
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
# app.config.from_object("server.config.Config")
app.config["SQLALCHEMY_DATABASE_URI"] = getenv("DATABASE_URI")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db.init_app(app)
app.register_blueprint(main)


@app.route('/')
def hello_world():
    return jsonify(hello="world")


# def create_app():
#     app = Flask(__name__)
#     app.config.from_object("server.config.Config")

#     db = SQLAlchemy()
#     db.init_app(app)

#     with app.app_context():
#         from server.routes import main
#         app.register_blueprint(main)
#         db.create_all()

#     return app
