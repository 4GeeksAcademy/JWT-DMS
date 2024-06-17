"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
from datetime import datetime, timedelta
import hashlib

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods = ['POST', 'GET'])
@jwt_required()
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    current_user = get_jwt_identity()

    return jsonify(logged_in_as = current_user), 200

@api.route('/token', methods=['POST'])
def create_token():
    email = request.json.get('email', None)
    access_token = create_access_token(identity = email)
    return jsonify(access_token = access_token)

@api.route('user/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get(id)
    if user is None:
        raise APIException('user not found', status_code = 404)
    return jsonify(user.serialize()), 200

@api.route('/user', methods=['GET'])
def get_all_users():
    users = User.query.all()
    all_users = list(map(lambda x:x.serialize(), users))
    return jsonify(all_users), 200


@api.route('/signup', methods = ['POST'])
def create_user():
    body = request.get_json()
    user = User()
    if "email" not in body:
        raise APIException('You need to specify the email', 400)
    if "password" not in body:
        raise APIException('You need to specify the password', 400)
    email = body['email']
    password = hashlib.sha256(body['password'].encode('utf-8')).hexdigest()
    new_user = User(email = email, password = password, is_active=True)
    db.session.add(new_user)
    db.session.commit()
    return jsonify('signup_successful'), 200

