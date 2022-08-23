a1 = "513 Elizabeth St, Melbourne VIC 3000, Australia"
a2 = "100 Bourke St, Melbourne VIC 3000, Australia"
a3 = "101 Flinders Ln, Melbourne VIC 3000, Australia"
a4 = "113 Exhibition St, Melbourne VIC 3000, Australia"
a5 = "20 Symonds Street, Auckland CBD, Auckland 1010, New Zealand"

#Notes
#Space = %20
#Commas = %2C%20 , comma followed by space

def parser(addr):
    fields  = addr.split(",")
    result = ["%20".join(field.split()) for field in fields]
    fresult = "%2C%20".join(result)
    print(fresult)

parser(a1)
parser(a2)
parser(a3)
parser(a4)
parser(a5)

a1geo = {
    "lon": 144.9595173,
    "lat": -37.8068913}

a2geo = {
    "lon": 144.9700053377551,
    "lat": -37.812090643877546}

a3geo = {
    "lon": 144.971045,
    "lat": -37.8153755
}

a4geo = {
    "lon": 144.969951,
    "lat": -37.812481
}

a5geo = {
    "lon": 174.7696682,
    "lat": -36.8528623
}

#POST dummy structures
user1 = {
            "username": "peanuts",
            "password": "password123"
        }

testaddr = {
            "title": "peanuts",
            "address": "100 Bourke St, Melbourne VIC 3000, Australia"
            }