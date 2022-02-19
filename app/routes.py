from flask import (
    Blueprint, current_app, redirect, render_template, send_from_directory, url_for
)

bp = Blueprint('index', __name__, url_prefix='/')

@bp.route("", methods=["GET"])
def index():
    return current_app.send_static_file('index.html')
