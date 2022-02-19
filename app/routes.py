import json

from argon2.exceptions import VerifyMismatchError
from flask import (
    Blueprint, request, g
)
from json import *
from flask import render_template
from argon2 import PasswordHasher
from werkzeug.utils import redirect

bp = Blueprint('index', __name__, url_prefix='/')
hasher = PasswordHasher()


@bp.route("/auth/", methods=["POST", "GET"])
def auth():
    if request.method == "POST":
        with open("app/static/passwords.json", "r") as DB_pre:
            DB = json.loads(DB_pre.read())
        form_user = request.form["user"]
        form_pass = request.form["pass"]
        if form_user == "" or form_pass == "":
            return "FieldIsNone"
        try:
            hasher.verify(DB[form_user], form_pass)
        except VerifyMismatchError:
            return "WrongPassword"
        else:
            return "RightPassword" # Redirect to initial location?
    else:
        return "<h1>ASDASDASD</h1>"


@bp.route("/register/", methods=["POST", "GET"])
def register():
    if request.method == "POST":
        form_IGN = request.form["user"]
        form_Pass = hasher.hash(request.form["pass"])
        with open("app/static/passwords.json", "r") as file:
            data = json.load(file)
            if form_IGN not in data:
                data[form_IGN] = form_Pass
            else:
                data["ERROR"] = "Errored123"
        with open("app/static/passwords.json", "w") as file:
            json.dump(data, file, indent=4)
        return redirect("/") # Redirect to initial location
    else:
        return "<h1>Resgister form</h1>"


@bp.route("", methods=["GET"])
def index():
    return "OKAY"
