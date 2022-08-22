from flask import (
    Flask,
    jsonify, 
    request,
    g,
    session)

from .db import get_db, close_db

#For Hashing
from werkzeug.security import generate_password_hash, check_password_hash

import psycopg2

import os

#Instantiations, env variables
app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY')

#db call decorator, and close after req
@app.before_request
def connect_to_db():
    get_db()

@app.after_request
def disconnect_from_db(response):
    close_db()
    return response

#Index Route
@app.route("/api")
def home():
    return "Return locations and Cat"

################################
#   Locations
################################
#Locations Index
@app.route("/locations")
def locations():
    return "all locations"

#Locations One
@app.route("/locations/<location_id>")
def indlocation():
    return "one location"

################################
#   Categories
################################
#Categories Index


################################
#   User
################################




