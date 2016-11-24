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
  constructor(public http: Http) {
  }

  //-------------------------------------------------
  //Darm-deel
  //-------------------------------------------------

/*
  //Gets IP of current bot
  getIP(): any {
    return this.http.get(`${this.robotUrl}/getBatteryLevel`).map(res => res.json());
  }
*/

  //-------------------------------------------------
  //Skagoo-deel
  //-------------------------------------------------

  // Login Robot - Basicly pings the root url of the RAL API. If response is http successcode 200, robot is online.
  login(ip): any {
    var url = encodeURI("http://" + ip + ":5000/");
    console.log(url);
    return this.http.get(`${url}`)
      .map(res => res);
  }
}