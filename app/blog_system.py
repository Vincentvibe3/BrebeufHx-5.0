
from flask import (
    Blueprint, current_app, redirect, render_template, request, send_from_directory, url_for, g
)
import time
import json
import markdown
from .session_cache import sessions

bp = Blueprint('blog', __name__, url_prefix='/blog')

@bp.route("/<blog>", methods=["GET"])
def blog(blog):
    print("hello")
    with open(f"app/content/{blog}.md", "r") as blogtext:
        g.blogHtml = markdown.markdown(blogtext.read())
    return render_template("blog.html")

@bp.route("/", methods=["GET"])
def index():
    with open(f"app/content/index.json", "r") as blogtext:
        g.posts = json.loads(blogtext.read())
    return render_template("blog_list.html")

@bp.route("/submit", methods=["GET", "POST"])
def submit():
    if request.cookies.get("userID") not in sessions:
        return redirect("/auth/login")
    if request.method == "GET":
        return render_template("blog_add.html")
    elif request.method == "POST":
        print(request.form)
        timestamp = int(time.time())
        title = request.form["titleinput"]
        description = request.form["descriptioninput"]
        with open(f"app/content/{timestamp}.md", "w") as f:
            f.write(f"# {title}\n## {description}\n{request.form['textinput']}")
        with open(f"app/content/index.json", "r") as f:
            index = json.loads(f.read())
        with open(f"app/content/index.json", "w") as f:
            index.append({"title":title, "id":str(timestamp), "description":description})
            f.write(json.dumps(index, indent=4))
        return render_template("blog_success.html")

@bp.route("/unicef", methods=["GET"])
def unicef():
    return render_template("unicef.html")