#!flask/bin/python
import sys
sys.path.append("/usr/lib/pynaoqi")
from datetime import timedelta
from flask import Flask, make_response, request, current_app, abort, jsonify
from functools import update_wrapper
import naoqi
from naoqi import ALProxy
#import logger

app = Flask(__name__)

nao_host = "127.0.0.1"
webserverIp = "0.0.0.0"
nao_port = 9559
battery = 100
chargeStatus = True

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

def batteryAction():
    time.sleep(5)
    if chargeStatus:
	while battery <= 100:
		battery += 1
    else:
	battery -= 1

#logger = logger.Logger(4) # Initialize logger with level "debug"

@app.route('/')
@crossdomain(origin='*')
def index():
    battery_thread = threading.Thread(target=batteryAction)
    battery_thread.start()
    return "Hello Robotic World!"

@app.route('/getIP', methods=['GET'])
@crossdomain(origin='*')
def getIP():
    return jsonfify({'IP': nao_host}), 200
	
@app.route('/getType', methods=['GET'])
@crossdomain(origin='*')
def getType():
    randNum = randint(0,2)

    if randNum == 0:
    	return jsonify({'type': "PEPPER"}), 200
    elif randNum == 1:
	return jsonify({'type': "NAO"}), 200
    else:
	return jsonify({'type': "BUDDY"}), 200
	
@app.route('/getName', methods=['GET'])
@crossdomain(origin='*')
def getName():
    return jsonify({'name': "Mister NAO"}), 200

@app.route('/charge', methods=['GET'])
@crossdomain(origin='*')
def charging():
    chargeStatus = True
    return jsonify({'status': "charging"}), 200

@app.route('/unplug', methods=['GET'])
@crossdomain(origin='*')
def unplug():
    chargeStatus = False
    return jsonify({'status': "unplugged"}), 200
	
@app.route('/getBatteryLevel', methods=['GET'])
@crossdomain(origin='*')
def getBatteryLevel():
    batt_json = json.dumps(battery)
    return jsonify({'level': batt_json}), 200
	
@app.route('/getActions', methods=['GET'])
@crossdomain(origin='*')
def getActions():
    return jsonify({'actions': ["StandInit","SitRelax","StandZero","LyingBelly","LyingBack","Stand","Crouch","Sit"]}), 200

@app.route('/actions/<string:actionName>', methods=['GET'])
@crossdomain(origin='*')
def doAction(actionName):
    postureProxy = ALProxy("ALRobotPosture", nao_host, nao_port)
    postureProxy.goToPosture(str(actionName), 1.0)
    return jsonify({'posture': postureProxy.getPostureFamily()}), 200

@app.route('/ask/<string:text>', methods=['GET'])
@crossdomain(origin='*')
def ask(text):
    tts = ALProxy("ALTextToSpeech", nao_host, nao_port)
    tts.say(str(text))
    return jsonify({'text': text}), 200

#http://doc.aldebaran.com/2-1/_downloads/almotion_moveTo1.py
@app.route('/move/<int:x>/<int:y>/<int:d>', methods=['GET'])
@crossdomain(origin='*')
def move(x,y,d):
    motionProxy = ALProxy("ALMotion", nao_host, nao_port)
    motionProxy.wakeUp()
    xCoo = float(x)
    yCoo = float(y)
    theta = float(d)
    motionProxy.moveTo(xCoo, yCoo, theta)
    return jsonify({'coordinates': [x,y,d]}), 200

@app.route('/getRobot', methods=['GET'])
@crossdomain(origin='*')
def getRobot():
    return jsonify({'ip':getIP(), 'type':getType(), 'name':getName(), 'batteryLevel':getBatteryLevel(), 'chargeStatus':chargeStatus, 'posture':doAction("StandInit"), 'actions':getActions()}), 200

if __name__ == '__main__':
    app.run(debug=True,host=webserverIp)