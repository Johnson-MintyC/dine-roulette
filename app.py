from enum import unique
from turtle import title
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from .db import get_db, close_db

#Instantiate
app = Flask(__name__)
app.config['SECRET_KEY'] = 'afkjku234b5ri234b5'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///dine-roulette.db'

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




