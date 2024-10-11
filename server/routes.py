# МогучийДД (MoguchiyDD)
# 2024.10.10, 04:05 PM
# routes.py


from flask import Blueprint, jsonify, request
from .models import db, User

main = Blueprint("main", __name__, url_prefix="/api")


@main.route("/users", methods=["POST"])
def create_user():
    data = request.get_json()
    new_user = User(name=data["name"], email=data["email"])
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.to_dict()), 201


@main.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])


@main.route("/users/<int:user_id>", methods=["GET"])
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify(user.to_dict())


@main.route("/users/<int:user_id>", methods=["PUT"])
def update_user(user_id):
    user = User.query.get_or_404(user_id)
    data = request.get_json()
    user.name = data["name"]
    user.email = data["email"]
    db.session.commit()
    return jsonify(user.to_dict())


@main.route("/users/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return '', 204
