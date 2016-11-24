import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Robot } from '../models/robot';

/*
  Generated class for the RobotService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RobotService {
	robotUrl = '';

  constructor(public http: Http) { }

  //-------------------------------------------------
  //Darm-deel
  //-------------------------------------------------

  //Initializes robot
  getRobot(): Observable<Robot> {
    return this.http.get(`${this.robotUrl}/getRobot`)
      .map(res => <Robot>res.json());
  }

  //Gets IP of current bot
  getIP(): any {
    return this.http.get(`${this.robotUrl}/getIP`)
      .map(res => res);
  }

  //Gets TYPE of current bot
  getType(): any {
    return this.http.get(`${this.robotUrl}/getType`)
      .map(res => res);
  }

  //Gets NAME of current bot
  getName(): any {
    return this.http.get(`${this.robotUrl}/getName`)
      .map(res => res);
  }

  //Gets BATTERYLEVEL of current bot
  getBatteryLevel(): any {
    return this.http.get(`${this.robotUrl}/getBatteryLevel`)
      .map(res => res);
  }

  //CHARGES battery of current bot
  charge(): any {
    return this.http.get(`${this.robotUrl}/charge`)
      .map(res => res);
  }

  //UNPLUGS battery of current bot
  unplug(): any {
    return this.http.get(`${this.robotUrl}/unplug`)
      .map(res => res);
  }

  //Gets ACTIONS of current bot
  getActions(): any {
    return this.http.get(`${this.robotUrl}/getActions`)
      .map(res => res);
  }

  //EXECUTES action for current bot
  doAction(actionName): any {
    return this.http.get(`${this.robotUrl}/actions/`+actionName)
      .map(res => res);
  }

  //ASKS string for current bot
  doSpeak(sentence): any {
    return this.http.get(`${this.robotUrl}/ask/`+sentence)
      .map(res => res);
  }

  //MOVES to pos for current bot
  doMove(x,y,d): any {
    return this.http.get(`${this.robotUrl}/move/` + x + `/` + y + `/` + d)
      .map(res => res);
  }

  //-------------------------------------------------
  //Skagoo-deel
  //-------------------------------------------------

  // Login Robot - Basicly pings the root url of the RAL API. If response is http successcode 200, robot is online.
  login(ip): any {
    this.robotUrl = encodeURI("http://" + ip + ":5000");
    console.log(this.robotUrl);
  }
}