#!flask/bin/python
import sys
sys.path.append("/usr/lib/pynaoqi")
from flask import Flask, abort, jsonify, request
import naoqi
from random import randint
import json

from naoqi import ALProxy
#import logger

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
def index():
    return "Hello Robotic World!"

#IP
def getIP():
    return jsonify({'IP': nao_host})

@app.route('/getIP', methods=['GET'])
def getIP_HTTP():
    return getIP(), 200

#TYPE
def getType():
    if randNum == 0:
        return jsonify({'type': "PEPPER"})
    elif randNum == 1:
        return jsonify({'type': "NAO"})
    else:
        return jsonify({'type': "BUDDY"})

@app.route('/getType', methods=['GET'])
def getType_HTTP():
    return getType(), 200

#NAME
def getName():
    return jsonify({'name': "Mister NAO"})

@app.route('/getName', methods=['GET'])
def getName_HTTP():
    return getName(), 200

#CHARGE
def charging():
    chargeStatus = True
    return jsonify({'status': "charging"})

@app.route('/charge', methods=['GET'])
def charging_HTTP():
    return charging(), 200

#UNPLUG
def unplug():
    chargeStatus = False
    return jsonify({'status': "unplugged"})

@app.route('/unplug', methods=['GET'])
def unplug_HTTP():
    return unplug(), 200

#BATTERY LEVEL
def getBatteryLevel():
    batt_json = json.dumps(battery)
    return jsonify({'level': batt_json})

@app.route('/getBatteryLevel', methods=['GET'])
def getBatteryLevel_HTTP():
    return getBatteryLevel(), 200

#GET ACTIONS
def getActions():
    return jsonify({'actions': ["StandInit","SitRelax","StandZero","LyingBelly","LyingBack","Stand","Crouch","Sit"]})

@app.route('/getActions', methods=['GET'])
def getActions_HTTP():
    return getActions(), 200

#DO ACTION
def doAction(actionName):
    postureProxy = ALProxy("ALRobotPosture", nao_host, nao_port)
    postureProxy.goToPosture(str(actionName), 1.0)
    return jsonify({'posture': postureProxy.getPostureFamily()})

@app.route('/actions/<string:actionName>', methods=['GET'])
def doAction_HTTP(actionName):
    return doAction(actionName), 200

#ASK
def ask(text):
    tts = ALProxy("ALTextToSpeech", nao_host, nao_port)
    tts.say(str(text))
    return jsonify({'text': text})

@app.route('/ask/<string:text>', methods=['GET'])
def ask_HTTP(text):
    return ask(text), 200

#MOVE
#http://doc.aldebaran.com/2-1/_downloads/almotion_moveTo1.py
def move(x,y,d):
    motionProxy = ALProxy("ALMotion", nao_host, nao_port)
    motionProxy.wakeUp()
    xCoo = float(x)
    yCoo = float(y)
    theta = float(d)
    motionProxy.moveTo(xCoo, yCoo, theta)
    return jsonify({'coordinates': [x,y,d]})

@app.route('/move/<int:x>/<int:y>/<int:d>', methods=['GET'])
def move_HTTP(x,y,d):
    return move(x,y,d), 200

#GET ALL FROM ROBOT
def getRobot():
    return jsonify({'ip':getIP(), 'type':getType(), 'name':getName(), 'batteryLevel':getBatteryLevel(), 'chargeStatus':chargeStatus, 'posture':doAction("StandInit"), 'actions':getActions()}), 200

@app.route('/getRobot', methods=['GET'])
def getRobot_HTTP():
    return getRobot(), 200

if __name__ == '__main__':
    app.run(debug=True,host=webserverIp)
    randNum = randint(0,2)