from flask import Flask
from flask_sqlalchemy import SQLAlchemy


def create_app(config_filename):
    app = Flask(__name__, static_folder="templates/static")

    app.config.from_object(config_filename)
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db = SQLAlchemy(app)

    return app, db


app, db = create_app("backOffice.config.Config")

from backOffice.views import views
from backOffice.views import user
