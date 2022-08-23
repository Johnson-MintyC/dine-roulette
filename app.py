from flask import (
    Flask,
    jsonify, 
    request,
    g,
    session)

from .db import get_db, close_db

import requests, json
from requests.structures import CaseInsensitiveDict

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


@app.route("/locations/new", methods=['POST'])
def new_location():
    title = request.json['title']
    address = request.json['address']

    #parse the formatted address to querable form
    addrnocomma = address.replace(", ", "%2C%20")
    queryAddr = addrnocomma.replace(" ", "%20")
    headers = CaseInsensitiveDict()
    headers["Accept"] = "application/json"
    resp = requests.get(f"https://api.geoapify.com/v1/geocode/search?text={queryAddr}&apiKey={os.environ.get('GEO_KEY')}", headers=headers)
    data = resp.json()
    long = data['features'][0]['properties']['lon']
    lati = data['features'][0]['properties']['lat']

    #Grab the current user from sessions
    user = session.get('user', None)

    query = """
        INSERT INTO locations
        (title, address, long, lati, user_id)
        VALUES (%s, %s, %s, %s, %s)
        RETURNING *
    """
    g.db['cursor'].execute(query, (title, address, long, lati, user['id']))
    g.db['connection'].commit()

    location = g.db['cursor'].fetchone()

    return jsonify(location)

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
    #SQL db query, Returning user data to be used for session later
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

    session['user'] = user
    
    return jsonify(success=True, user=user)

#Login
@app.route('/login', methods=['POST'])
def login():
    username = request.json['username']
    password = request.json['password']

    query = """
        SELECT * FROM users
        WHERE username = %s
    """

    cur = g.db['cursor']
    #cursor class to execute psql, trailing comma for tuple
    cur.execute(query, (username,))
    user = cur.fetchone()

    #User no match
    if user is None:
        return jsonify(success=False, msg="Username or password is incorrect")

    #Bool return, if user valid, compares its hashed pass against what user entered
    password_matches = check_password_hash(user['password_hash'], password)

    if not password_matches:
        return jsonify(success=False, msg="Username or password is incorrect")
    
    #Query returns everything, removing pass in backend before returning to front
    user.pop('password_hash')

    session['user'] = user

    return jsonify(success=True, user=user)

#Logout
@app.route('/logout', methods=['POST'])
def logout():
    print(session['user'])
    session.pop('user', None)
    return jsonify(success=True)

#Authentication and session details, for authorised state
@app.route('/is-authenticated')
def is_authenticated():
    user = session.get('user', None)
    if user:
        return jsonify(success=True, user=user)

    else:
        return jsonify(success=False, msg='User is not logged in')

#login check - purely for testing
@app.route('/am-i-logged-in')
def test():
    print(session['user'])
    return jsonify(session['user'])








