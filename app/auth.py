import base64
from flask import (
    Blueprint, current_app, redirect, render_template, send_from_directory, url_for
)
import urllib

bp = Blueprint('auth', __name__, url_prefix='/auth')

from .session_cache import sessions
import json
import secrets
from argon2.exceptions import VerifyMismatchError
from argon2 import PasswordHasher
from flask import Blueprint, request, g, render_template, make_response
from werkzeug.utils import redirect

bp = Blueprint('auth', __name__, url_prefix='/auth')
hasher = PasswordHasher()

def genSessionId():
    tokenbytes = secrets.token_bytes(32)
    b64 = base64.b64encode(tokenbytes)
    token = b64.decode("utf-8")
    return urllib.parse.quote(token)

@bp.route("/login", methods=["POST", "GET"])
def login():
    if request.method == "POST":
        try:
            form_user = request.form["user"]
            form_pass = request.form["pass"]
            if form_user == "" or form_pass == "":
                return "MissingField"
        except KeyError:
            return "MissingField"
        with open("app/static/passwords.json", "r") as DB_pre:
            DB = json.loads(DB_pre.read())
            if form_user not in DB:
                return "NoExistingUser"
        try:
            hasher.verify(DB[form_user], form_pass)
        except VerifyMismatchError:
            return "WrongPassword"
        else:
            sessId = genSessionId()
            sessions.append(sessId)
            resp = make_response(redirect("/blog", 302))
            resp.set_cookie('userID', sessId, httponly=True, secure=True)
            return resp  # Redirect to initial location?

    else:
        return render_template("login.html")


@bp.route("/register", methods=["POST", "GET"])
def register():
    if request.method == "POST":
        try:
            form_user = request.form["user"]
            form_pass = hasher.hash(request.form["pass"])
            if form_user == "" or form_pass == "":
                return "MissingField"
        except KeyError:
            return "MissingField"
        with open("app/static/passwords.json", "r") as file:
            DB = json.load(file)
            if form_user in DB:
                return "ExistingUser"
            DB[form_user] = form_pass
        with open("app/static/passwords.json", "w") as file:
            json.dump(DB, file, indent=4)
        sessId = genSessionId()
        sessions.append(sessId)
        resp = make_response(redirect("/blog", 302))
        resp.set_cookie('userID', sessId, httponly=True, secure=True)
        return resp  # Redirect to initial location + No errors
    else:
        return render_template("login.html")