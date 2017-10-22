from flask import render_template, make_response, jsonify

from backOffice import app

from backOffice.models.role import *
from backOffice.models.user import *
from backOffice.models.user_details import *


@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({"error": "Not found"}), 404)


@app.route("/")
@app.route("/index")
def index():
    return render_template("index.html")
