
from flask import (
    Blueprint, current_app, redirect, render_template, request, send_from_directory, url_for, g
)
import time
import json
import markdown

bp = Blueprint('blog', __name__, url_prefix='/blog')

@bp.route("/<blog>", methods=["GET"])
def index(blog):
    with open(f"app/content/{blog}.md", "r") as blogtext:
        g.blogHtml = markdown.markdown(blogtext.read())
    return render_template("blog.html")


@bp.route("/submit", methods=["GET", "POST"])
def submit():
    if request.method == "GET":
        return render_template("blog_add.html")
    elif request.method == "POST":
        print(request.form)
        timestamp = int(time.time())
        with open(f"app/content/{timestamp}.md", "w") as f:
            f.write(request.form["textinput"])
        with open(f"app/content/index.json", "r") as f:
            index = json.loads(f.read())
        with open(f"app/content/index.json", "w") as f:
            index.append(timestamp)
            f.write(json.dumps(index, indent=4))
        return render_template("blog_success.html")