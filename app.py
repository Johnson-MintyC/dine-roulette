from enum import unique
from turtle import title
from flask import Flask
from flask_sqlalchemy import SQLAlchemy



#Instantiate
app = Flask(__name__)
app.config['SECRET_KEY'] = 'afkjku234b5ri234b5'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///dine-roulette.db'

db = SQLAlchemy(app)


#model test
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    locations = db.relationship('Location', backref='user', lazy=True)

class Location(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), unique=True, nullable=False)
    location = db.Column(db.String(200), nullable=False)
    geocode = db.Column(db.String(200), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

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




