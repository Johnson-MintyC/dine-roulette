from crypt import methods
from flask import (
    Flask,
    jsonify, 
    request,
    g,
    render_template,
    session)

from db import get_db, close_db

import requests, json
from requests.structures import CaseInsensitiveDict

#For Hashing
from werkzeug.security import generate_password_hash, check_password_hash

#For 'cursor', allows python to run PSQL
import psycopg2

import os

import time

#Instantiations, env variables
app = Flask(
    __name__,
    static_folder='client/build/static',
    template_folder='client/build'
)
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
#Index Route, Generate List to randomize
@app.route("/api", methods=['POST'])
def home():
    location = request.json['location']
    criteria = request.json['criteria']
    queryRadius = str(int(request.json['nearby-range'])*1000)
    
    user = session.get('user', None)
    query = """
        SELECT locations.long, locations.lati 
        FROM locations
        WHERE locations.id = %s
        AND locations.user_id = %s
    """
    cur = g.db['cursor']
    cur.execute(query, (location, user['id']))
    location = g.db['cursor'].fetchone()
    # print(location['long'], location['lati'])

    ##GEO places
    # url = f"https://api.geoapify.com/v2/places?categories={criteria}&filter=circle:{location['long']},{location['lati']},{queryRadius}&bias=proximity:{location['long']},{location['lati']}&limit=50&apiKey={os.environ.get('GEO_KEY')}"
    # headers = CaseInsensitiveDict()
    # headers["Accept"] = "application/json"
    # resp = requests.get(url, headers=headers)
    # data = resp.json()

    ##Google Nearby
    queryList = []
    url1 = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={location['lati']}%2C{location['long']}&radius={queryRadius}&type={criteria}&key={os.environ.get('GOOGLE_KEY')}"
    payload={}
    headers = {}

    print(url1)

    response1 = requests.request("GET", url1, headers=headers, data=payload)
    data1 = response1.json()
    queryList.extend(data1['results'])
    try:
        pagetoken1 = data1['next_page_token']

        #Pause to wait for result for page token
        time.sleep(2)

        url2 = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={location['lati']}%2C{location['long']}&radius={queryRadius}&type={criteria}&key={os.environ.get('GOOGLE_KEY')}&pagetoken={pagetoken1}"
        response2 = requests.request("GET", url2, headers=headers, data=payload)
        data2 = response2.json()
        queryList.extend(data2['results'])

        return queryList
    except KeyError:
        return queryList

################################
#   Locations
################################
#Locations Index
@app.route("/locations")
def locations():
    user = session.get('user', None)
    query = """
        SELECT locations.title, locations.address, locations.id, locations.long, locations.lati, locations.user_id FROM locations
        JOIN users ON locations.user_id = users.id
        WHERE locations.user_id = %s
    """
    cur = g.db['cursor']
    cur.execute(query, (user['id'],))
    allLocations = g.db['cursor'].fetchall()
    return jsonify(allLocations)

#New Location 
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

#Updating Location
@app.route("/locations/<location_id>", methods=['PUT'])
def updlocation(location_id):
    title = request.json['title']
    address = request.json['address']
    noCall= request.json['noCall']

    user = session.get('user', None)
    cur = g.db['cursor']
    if noCall:
        updateTitleQuery = """
            UPDATE locations
            SET title = %s
            WHERE locations.id = %s
            AND locations.user_id = %s
            RETURNING *
        """
        cur.execute(updateTitleQuery, (title, location_id, user['id']))
        g.db['connection'].commit()
        updatedLocation = g.db['cursor'].fetchone()
        return jsonify(updatedLocation)
    else:
        query = """
            UPDATE locations
            SET title = %s, address = %s, long = %s, lati = %s
            WHERE locations.id = %s
            AND locations.user_id = %s
            RETURNING *
        """
        #parse the formatted address to querable form
        addrnocomma = address.replace(", ", "%2C%20")
        queryAddr = addrnocomma.replace(" ", "%20")
        headers = CaseInsensitiveDict()
        headers["Accept"] = "application/json"
        resp = requests.get(f"https://api.geoapify.com/v1/geocode/search?text={queryAddr}&apiKey={os.environ.get('GEO_KEY')}", headers=headers)
        data = resp.json()
        long = data['features'][0]['properties']['lon']
        lati = data['features'][0]['properties']['lat']
        cur.execute(query, (title, address, long, lati, location_id, user['id']))
        g.db['connection'].commit()
        updatedLocation = g.db['cursor'].fetchone()
        return jsonify(updatedLocation)

#Delete Location
@app.route("/locations/<location_id>", methods=['DELETE'])
def delete_location(location_id):
    user = session.get('user', None)
    query = """
        DELETE FROM locations
        WHERE id = %s
        AND locations.user_id = %s
        RETURNING *
        """
    cur = g.db['cursor']
    cur.execute(query, (location_id, user['id']))
    g.db['connection'].commit()
    deleted_location = cur.fetchone()
    return jsonify(deleted_location)
    

    
################################
#   Categories
################################
#Categories Index
@app.route('/categories')
def categories():
    query = """
        SELECT * FROM categories
    """
    cur = g.db['cursor']
    cur.execute(query)
    allCategories = g.db['cursor'].fetchall()
    return jsonify(allCategories)

################################
#   Queries
################################
#User Queries fetch
@app.route('/queries')
def queries():
    user = session.get('user', None)
    query = """
    SELECT categories.id, categories.title, categories.text 
    FROM categories
    JOIN queries 
    ON queries.cata_id = categories.id
    WHERE queries.user_id = %s
    """
    cur = g.db['cursor']
    cur.execute(query, (user['id'],))
    g.db['connection'].commit()
    storedQueries = cur.fetchall()
    return jsonify(storedQueries)

#New Query
@app.route('/queries/new', methods=['POST'])
def newQueries():
    cataids = request.json['cataids']
    user = session.get('user', None)
    query = """
        INSERT INTO queries
        (user_id, cata_id)
        VALUES (%s, %s)
        RETURNING *
    """
    cur = g.db['cursor']
    for cata in cataids:
        cur.execute(query, (user['id'], cata))
        g.db['connection'].commit()

    return "done"

#Clear Query
@app.route('/queries/<query_id>', methods=['DELETE'])
def deleteQueries(query_id):
    user = session.get('user', None)
    query = """
        DELETE FROM queries
            WHERE id = %s
            AND queries.user_id = %s
            RETURNING *
        """
    cur = g.db['cursor']
    cur.execute(query, (query_id, user['id']))
    g.db['connection'].commit()
    deleted_query = cur.fetchone()
    return jsonify(deleted_query)


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

#catch all route
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react_app(path):
    return render_template('index.html')







