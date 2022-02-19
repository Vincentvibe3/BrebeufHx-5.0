import json

from argon2.exceptions import VerifyMismatchError
from flask import (
    Blueprint, request, g
)
from json import *
from flask import render_template
from argon2 import PasswordHasher

bp = Blueprint('index', __name__, url_prefix='/')

@bp.route("/auth/", methods=["POST", "GET"])
def auth():
    if request.method == "POST":
        hasher = PasswordHasher()
        DB_pre = open("app/static/passwords.json", "r")
        DB = json.loads(DB_pre.read())
        try:
            hasher.verify(DB[request.form["user"]], request.form["pass"])
        except VerifyMismatchError:
            g.soemthing = "asd"
            return "WrongPassword"
        else:
            return "RightPassword"
    else:
        return "<h1>ASDASDASD</h1>"


@bp.route("", methods=["GET"])
def index():
    return g.something
