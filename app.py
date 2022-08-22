from flask import (
    Flask,
    jsonify, 
    request,
    g,
    session)

from .db import get_db, close_db

#For Hashing
from werkzeug.security import generate_password_hash, check_password_hash

#For 'cursor', allows python to run PSQL
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

################################
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


# @app.route("/locations/new", methods=['POST'])
# def new_location():


#Locations One
@app.route("/locations/<location_id>")
def indlocation():
    return "one location"


################################
#   Categories
################################
#Categories Index


################################
#   User/Registration
################################
#New User
@app.route('/register', methods=['POST'])
def register():
    username = request.json['username']
    password = request.json['password']
    #Salting the pass
    password_hash = generate_password_hash(password)
    #SQL db query
    query = """
        INSERT INTO users
        (username, password_hash)
        VALUES (%s,%s)
        RETURNING id, username
    """
    #cur instant, to execute the psql query
    cur = g.db['cursor']
    #attempt insertion, replacing the placeholder values
    try:
        cur.execute(query, (username, password_hash))
    except psycopg2.IntegrityError:
        return jsonify(success=False, msg='Username already taken')

    #Commits the pending transaction to the db
    g.db['connection'].commit()
    #reponse data of the user created
    user = cur.fetchone()
    
    return jsonify(success=True, user=user)



