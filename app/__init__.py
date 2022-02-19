import os

from flask import Flask, g


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)

    # if test_config is None:
    #     app.config.from_pyfile('config.py', silent=True)
    # else:
    #     app.config.from_mapping(test_config)

    # ensure the instance folder exists
    
    from . import routes
    app.register_blueprint(routes.bp)
    from . import blog_system
    app.register_blueprint(blog_system.bp)
    from . import auth
    app.register_blueprint(auth.bp)

    app.debug = True
    return app