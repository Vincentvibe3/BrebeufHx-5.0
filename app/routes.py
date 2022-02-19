import json

from argon2.exceptions import VerifyMismatchError
from argon2 import PasswordHasher
from flask import Blueprint, request, g, render_template
from werkzeug.utils import redirect

bp = Blueprint('index', __name__, url_prefix='/')
hasher = PasswordHasher()

@bp.route("/auth/", methods=["POST", "GET"])
def auth():
    if request.method == "POST":
        try:
            form_user = request.form["user"]
            form_pass = request.form["pass"]
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
            return "RightPassword" # Redirect to initial location?
    else:
        return "<h1>AUTHPAGE</h1>"


@bp.route("/register/", methods=["POST", "GET"])
def register():
    if request.method == "POST":
        try:
            form_User = request.form["user"]
            form_Pass = hasher.hash(request.form["pass"])
        except KeyError:
            return "MissingField"
        if form_User == "" or form_Pass == "":
            return "MissingField"
        with open("app/static/passwords.json", "r") as file:
            DB = json.load(file)
            if form_User not in DB:
                DB[form_User] = form_Pass
            else:
                return "ExistingUser"
        with open("app/static/passwords.json", "w") as file:
            json.dump(DB, file, indent=4)
        return redirect("/") # Redirect to initial location + No errors
    else:
        return "<h1>REGISTER PAGE</h1>"


@bp.route("", methods=["GET"])
def index():
    return "<h1>MAIN PAGE<h1>"
