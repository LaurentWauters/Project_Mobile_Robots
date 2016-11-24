##!flask/bin/python
import sys
sys.path.append("/usr/lib/pynaoqi")
from datetime import timedelta
from flask import Flask, abort, jsonify, request, make_response, current_app
import naoqi
from random import randint
import json 
from functools import update_wrapper
from naoqi import ALProxy

app = Flask(__name__)

nao_host = "127.0.0.1"
webserverIp = "0.0.0.0"
nao_port = 9559
battery = 100
chargeStatus = True
randNum = 0    

#logger = logger.Logger(4) # Initialize logger with level "debug"

#CROSSDOMAIN SHIZZLE

def crossdomain(origin=None, methods=None, headers=None, max_age=21600, attach_to_all=True, automatic_options=True):  
    if methods is not None:
        methods = ', '.join(sorted(x.upper() for x in methods))
    if headers is not None and not isinstance(headers, basestring):
        headers = ', '.join(x.upper() for x in headers)
    if not isinstance(origin, basestring):
        origin = ', '.join(origin)
    if isinstance(max_age, timedelta):
        max_age = max_age.total_seconds()

    def get_methods():
        if methods is not None:
            return methods

        options_resp = current_app.make_default_options_response()
        return options_resp.headers['allow']

    def decorator(f):
        def wrapped_function(*args, **kwargs):
            if automatic_options and request.method == 'OPTIONS':
                resp = current_app.make_default_options_response()
            else:
                resp = make_response(f(*args, **kwargs))
            if not attach_to_all and request.method != 'OPTIONS':
                return resp

            h = resp.headers

            h['Access-Control-Allow-Origin'] = origin
            h['Access-Control-Allow-Methods'] = get_methods()
            h['Access-Control-Max-Age'] = str(max_age)
            if headers is not None:
                h['Access-Control-Allow-Headers'] = headers
            return resp

        f.provide_automatic_options = False
        return update_wrapper(wrapped_function, f)
    return decorator

#INDEX
@app.route('/')
@crossdomain(origin='*')
def index():
    return "Hello Robotic World!"

#IP
def getIP():
    return nao_host

@app.route('/getIP', methods=['GET'])
@crossdomain(origin='*')
def getIP_HTTP():
    return jsonify({'IP': getIP()}), 200

#TYPE
def getType():
    if randNum == 0:
        return "PEPPER"
    elif randNum == 1:
        return "NAO"
    elif randNum == 2:
        return "BUDDY"
    else:
        return "JIBO"

@app.route('/getType', methods=['GET'])
@crossdomain(origin='*')
def getType_HTTP():
    return jsonify({'type':getType()}), 200

#NAME
def getName():
    if randNum == 0:
        return "Mister Pepperoni"
    elif randNum == 1:
        return "Mister I_want_it_Nao"
    elif randNum == 2:
        return "Mister Buttbuddy"
    else:
        return "Mister Hibo_jibo"

@app.route('/getName', methods=['GET'])
@crossdomain(origin='*')
def getName_HTTP():
    return jsonify({'name':getName()}), 200

#CHARGE
def charging():
    chargeStatus = True
    return "charging"

@app.route('/charge', methods=['GET'])
@crossdomain(origin='*')
def charging_HTTP():
    return jsonify({'chargeStatus':charging()}), 200

#UNPLUG
def unplug():
    chargeStatus = False
    return "unplugged"

@app.route('/unplug', methods=['GET'])
@crossdomain(origin='*')
def unplug_HTTP():
    return jsonify({'chargeStatus':unplug()}), 200

#BATTERY LEVEL
def getBatteryLevel():
    batt_json = json.dumps(battery)
    return batt_json

@app.route('/getBatteryLevel', methods=['GET'])
@crossdomain(origin='*')
def getBatteryLevel_HTTP():
    return jsonify({'batteryLevel':getBatteryLevel()}), 200

#GET ACTIONS
def getActions():
    return ["StandInit","SitRelax","StandZero","LyingBelly","LyingBack","Stand","Crouch","Sit"]

@app.route('/getActions', methods=['GET'])
@crossdomain(origin='*')
def getActions_HTTP():
    return jsonify({'actions':getActions()}), 200

#DO ACTION
def doAction(actionName):
    postureProxy = ALProxy("ALRobotPosture", nao_host, nao_port)
    postureProxy.goToPosture(str(actionName), 1.0)
    return postureProxy.getPostureFamily()

@app.route('/actions/<string:actionName>', methods=['GET'])
@crossdomain(origin='*')
def doAction_HTTP(actionName):
    return jsonify({'posture':doAction(actionName)}), 200

#ASK
def ask(text):
    tts = ALProxy("ALTextToSpeech", nao_host, nao_port)
    tts.say(str(text))
    return text

@app.route('/ask/<string:text>', methods=['GET'])
@crossdomain(origin='*')
def ask_HTTP(text):
    return jsonify({'text': ask(text)}), 200

@app.route('/fart', methods=['GET'])
@crossdomain(origin='*')
def fart():
    return ask_HTTP("pfffffrrrttrtrfrtrfrtrttrffrfrtttrfrt")

#MOVE
#http://doc.aldebaran.com/2-1/_downloads/almotion_moveTo1.py
def move(x,y,d):
    motionProxy = ALProxy("ALMotion", nao_host, nao_port)
    motionProxy.wakeUp()
    xCoo = float(x)
    yCoo = float(y)
    theta = float(d)
    motionProxy.moveTo(xCoo, yCoo, theta)
    return jsonify([x,y,d])

@app.route('/move/<int:x>/<int:y>/<int:d>', methods=['GET'])
@crossdomain(origin='*')
def move_HTTP(x,y,d):
    return jsonify({'coordinates': move(x,y,d)}), 200

#GET ALL FROM ROBOT
def getRobot():
    return jsonify({'ip':getIP(), 'type':getType(), 'name':getName(), 'batteryLevel':getBatteryLevel(), 'chargeStatus':chargeStatus, 'posture':doAction("StandInit"), 'actions':getActions()})

@app.route('/getRobot', methods=['GET'])
@crossdomain(origin='*')
def getRobot_HTTP():
    return getRobot(), 200

if __name__ == '__main__':
    app.run(debug=True,host=webserverIp)
    randNum = randint(0,2)