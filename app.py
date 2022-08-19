from flask import Flask

#Instantiate
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///dine-roulette.db'

#Index Route
@app.route("/")
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




