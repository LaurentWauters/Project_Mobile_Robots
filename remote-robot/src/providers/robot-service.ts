import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the RobotService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RobotService {

  constructor(public http: Http) {
    console.log('Hello RobotService Provider');
  }

  //-------------------------------------------------
  //Darm-deel
  //-------------------------------------------------

  //-------------------------------------------------
  //Skagoo-deel
  //-------------------------------------------------

}
