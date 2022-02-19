from flask import (
    Blueprint
)

bp = Blueprint('auth', __name__, url_prefix='/')

@bp.route("/", methods=["GET"])
def index():
    return "hello"
