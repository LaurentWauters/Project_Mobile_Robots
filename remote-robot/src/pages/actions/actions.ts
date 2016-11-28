import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { RobotService } from '../../providers/robot-service';
import { ShareService } from '../services/ShareService';

@Component({
  selector: 'page-actions',
  templateUrl: 'actions.html'
})
export class ActionsPage {

  robotService: RobotService;
  shareService: ShareService;

  constructor(public navCtrl: NavController, private myShareService: ShareService, private myRobotService: RobotService) {
    this.robotService = myRobotService;
    this.shareService = myShareService;
  }

  ionViewDidLoad() {
    console.log('Hello Actions Page');
  }

  doAction(actionName: String) {
    this.robotService.doAction(actionName).subscribe(response => {
      console.log(response)
      if (response.status == 200) {
        console.log("performing action success")
      }
      else {
        console.log("performing action failed")
      }
    })
  }

  doActionStandInit() {
    this.doAction("StandInit");
  }

  doActionSitRelax() {
    this.doAction("SitRelax");
  }

  doActionStandZero() {
    this.doAction("StandZero");
  }

  doActionLyingBelly() {
    this.doAction("LyingBelly");
  }

  doActionLyingBack() {
    this.doAction("LyingBack");
  }

  doActionStand() {
    this.doAction("Stand");
  }

  doActionCrouch() {
    this.doAction("Crouch");
  }

  doActionSit() {
    this.doAction("Sit");
  }
}