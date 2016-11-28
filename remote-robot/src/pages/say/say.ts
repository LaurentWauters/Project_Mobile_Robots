import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { RobotService } from '../../providers/robot-service';
import { ShareService } from '../services/ShareService';

@Component({
  selector: 'page-say',
  templateUrl: 'say.html'
})
export class SayPage {

  robotService: RobotService;
  shareService: ShareService;

  responses: String[];

  constructor(public navCtrl: NavController, private myShareService: ShareService, private myRobotService: RobotService) {
    this.robotService = myRobotService;
    this.shareService = myShareService;
    this.responses = new Array();
  }

  ionViewDidLoad() {
    console.log('Hello Say Page');
  }

  doSpeak(form) {
    this.robotService.doSpeak(form.value.text).subscribe(response => {
      console.log(response)
      if (response.status == 200) {
        console.log("performing say success");
        this.responses.push(response);
      }
      else {
        console.log("performing say failed")
      }
    })
  }
}