from flask import jsonify, url_for, abort, request, make_response
from datetime import date

from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from jwt import DecodeError, ExpiredSignature
from datetime import datetime, timedelta
from functools import wraps
from flask import g

from backOffice import app, db
from backOffice.models.role import Role
from backOffice.models.user import User
from backOffice.models.user_details import UserDetails

from backOffice.config import Config


# JWT AUTh process start
def create_token(user):
    payload = {
        'sub': user.id,
        'iat': datetime.utcnow(),
        'exp': datetime.utcnow() + timedelta(minutes=60)
    }
    token = jwt.encode(payload, Config.SECRET_KEY, algorithm='HS256')
    return token.decode('unicode_escape')


def parse_token(req):
    token = req.headers.get('Authorization').split()[1]
    return jwt.decode(token, Config.SECRET_KEY, algorithms='HS256')


# Login decorator function
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not request.headers.get('Authorization'):
            response = jsonify(message='Missing authorization header')
            response.status_code = 401
            return response

        try:
            payload = parse_token(request)
        except DecodeError:
            response = jsonify(message='Token is invalid')
            response.status_code = 401
            return response
        except ExpiredSignature:
            response = jsonify(message='Token has expired')
            response.status_code = 401
            return response

        g.user_id = payload['sub']

        return f(*args, **kwargs)

    return decorated_function


def make_public_user(user):
    new_user = {}
    user_fields = UserDetails.__dict__
    for field in user_fields:
        if field.startswith("_"):
            continue
        if field == "id":
            new_user["uri"] = url_for("get_user", user_id=user.id, _external=True)
        if field == "role":
            new_user["role"] = user.role.name
        elif field == "date_of_birth":
            dob = getattr(user, field, "")
            if dob:
                new_user["date_of_birth"] = dict(
                    day=dob.day, month=dob.month, year=dob.year
                )
        else:
            new_user[field] = getattr(user, field, "")
    return new_user


@app.route("/backoffice/api/v1.0/login", methods=["POST"])
def login():
    data = request.get_json(force=True)
    print(data)
    email = data['email']
    password = data['password']

    user = db.session.query(UserDetails).filter(UserDetails.email == email).first()
    if not user:
        response = make_response(jsonify({"message": "invalid username/password"}))
        response.status_code = 401
        return response

    if check_password_hash(user.password, password):
        token = create_token(user)
        return jsonify({"token": token, "user": make_public_user(user)})
    else:
        response = make_response(
            jsonify({"message": "invalid username/password"})
        )
        response.status_code = 401
        return response


@app.route("/backoffice/api/v1.0/users", methods=["GET"])
@login_required
def get_users():
    users = db.session.query(User).all()
    return jsonify([make_public_user(user) for user in users])


@app.route("/backoffice/api/v1.0/users/<int:user_id>", methods=["GET"])
@login_required
def get_user(user_id):
    user = db.session.query(UserDetails).filter(UserDetails.user_id == user_id).first()
    if not user:
        abort(404)
    return jsonify(make_public_user(user))


@app.route("/backoffice/api/v1.0/users", methods=["POST"])
def create_user():
    requested_fields = {'first_name', 'last_name', 'email', 'password', 'role'}
    if not request.json or requested_fields - set(request.json.keys()):
        abort(400)
    role = db.session.query(Role).filter(Role.name == request.json.pop("role")).first()
    if not role:
        abort(400)
    request.json["role_id"] = role.id
    request.json["date_of_birth"] = date(
        year=request.json["date_of_birth"]["year"],
        month=request.json["date_of_birth"]["month"],
        day=request.json["date_of_birth"]["day"]
    )
    request.json["password"] = generate_password_hash(request.json["password"], "sha256", 4)
    new_user = UserDetails(**request.json)
    db.session.add(new_user)
    db.session.commit()
    return jsonify(make_public_user(new_user)), 201


@app.route("/backoffice/api/v1.0/users/<int:user_id>", methods=["PUT"])
@login_required
def update_user(user_id):
    user = db.session.query(UserDetails).filter(UserDetails.user_id == user_id).first()
    if not user:
        abort(404)
    if not request.json:
        abort(400)
    for param in request.json:
        if param in UserDetails.__dict__:
            if request.json[param] is None or param in ("id", "user_id", "role_id"):
                continue
            if param == "active":
                if type(request.json[param]) != bool:
                    abort(400)
            elif param == "date_of_birth":
                if type(request.json[param]) != dict:
                    abort(400)
            elif type(request.json[param]) != str:
                abort(400)
            if param == "date_of_birth":
                dob = date(
                    year=request.json[param]["year"],
                    month=request.json[param]["month"],
                    day=request.json[param]["day"]
                )
                setattr(user, param, dob)
            elif param == "role":
                role = db.session.query(Role).filter(Role.name == request.json[param]).first()
                if role:
                    setattr(user, "role_id", role.id)
                    user.role = role
            else:
                setattr(user, param, request.json[param])
    db.session.add(user)
    db.session.commit()

    return jsonify(make_public_user(user))


@app.route("/backoffice/api/v1.0/users/<int:user_id>", methods=["DELETE"])
@login_required
def delete_user(user_id):
    user = db.session.query(UserDetails).filter(UserDetails.user_id == user_id).first()
    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({"result": True})
    else:
        abort(404)
