import { Injectable } from '@angular/core';
import { Robot } from '../models/robot';
import {Http, Headers, RequestOptions} from '@angular/http';

@Injectable()
export class DBService {
	dbUrl = 'http://darm.cloudant.com/roboto';
  doc: string;
  robots: JSON[];

  constructor(public http: Http) {
    this.robots = [];
    this.getFromDB().subscribe(response => this.doc = response);
  }

  //-------------------------------------------------
  //GET DOCS
  //-------------------------------------------------

  getRecentRobots(): any {
    console.log("BEGIN GET RECENT ROBOTS");

    //Make call
    var resp = this.http.get(`${this.dbUrl}/recentRobots`)
      .map(res => res.json());

    //Subscribe to response & assign to doc
    resp.subscribe(response => this.doc = response);

    //Output for debugging
    console.log("DOC: ");
    console.log(this.doc);

    //Temp var to contain only robots
    var temp = JSON.parse(this.doc).robots;
    console.log("ROBOTS FROM DOC: " + String(temp));

    //Assign robots in temp-var to this.robots array
    for (var k of temp) {
      console.log("VAR K OF TEMP: " + String(k));
      this.robots.push(k);
    }

    return this.robots;
  }

  getFromDB(): any {
    return this.http.get(`${this.dbUrl}/recentRobots`).map(res => res.json());
  }

  //-------------------------------------------------
  //INTERNAL METHODS
  //-------------------------------------------------
  checkExistingIP(ip): Boolean {
    console.log("IN CURRENT DB: " + this.robots);
    return String(this.robots).includes(ip);
  }

  testPost() {
    var test = {
  "_id": "apple",
  "item": "Malus domestica",
  "prices": {
    "Fresh Mart": 1.59,
    "Price Max": 5.99,
    "Apples Express": 0.79
    }
  };
  this.http.post(`${this.dbUrl}`, test)
        .subscribe(response => console.log(response));
  }
  //-------------------------------------------------
  //UPDATE DOCS
  //-------------------------------------------------
  addRobot(robot: Robot) {

    console.log(robot);
    var ip = robot.getIP();
    var name = robot.getName();

    if(!this.checkExistingIP(ip)) {
      console.log("entered correct if");
      
      var jsonStructure = JSON.stringify({
        'ip': ip,
        'name': name
      });

      console.log("THIS.ROBOTS: ");
      console.log(this.robots);

      if(this.robots.length <= 0)
        this.robots[0] = JSON.parse(jsonStructure);
      else
        this.robots.push(JSON.parse(jsonStructure));

      console.log("EXISTING IP, NEW ROBOTS: " + this.robots.toString());

      console.log(this.doc);
      var tempDoc = this.doc;
      tempDoc["robots"] = JSON.parse(JSON.stringify(this.robots));

      console.log(tempDoc);



    var headers = new Headers({ 'Content-Type': 'application/json' });
    var options = new RequestOptions({headers: headers});


      this.http.put(`${this.dbUrl}/recentRobots`, tempDoc, options)
        .subscribe(response => console.log(response));
    
      console.log("SUCC 6");
    }
    else
      console.log("IP ALREADY PRESENT IN DOC");
  }


}