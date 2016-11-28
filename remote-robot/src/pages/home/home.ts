import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { RobotService } from '../../providers/robot-service';
import { ShareService } from '../services/ShareService';

import { ActionsPage } from '../actions/actions'
import { ManualPage } from '../manual/manual'
import { SayPage } from '../say/say'
import { SettingsPage } from '../settings/settings'

import { Robot } from '../../models/robot'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	loginSuccess: boolean;
	robotService: RobotService;
	ip = {address: ''};
	shareService: ShareService;

  constructor(public navCtrl: NavController, private myShareService: ShareService, private myRobotService: RobotService) {
		this.robotService = myRobotService;
		this.shareService = myShareService;
	}

	loginForm(form) {
    	console.log("LOGIN-ENTRY: " + form.value.address);
    	
		this.robotService.login(form.value.address).subscribe(response => {

			if(response.status == 200) {
				console.log("CORRECT RESPONSE STATUS");
				this.robotService.getRobot().subscribe(
					response => 
						this.shareService.setRobot(
							new Robot(response.ip, response.type, response.name, response.batteryLevel, response.chargeStatus, response.posture, response.actions)
						)
				);
				this.loginSuccess = true;
			} else {
				console.log("FALSE RESPONSE STATUS");
				this.loginSuccess = false;
			}	
		});
	};

	openActions() {
		console.log("Actions page button clicked")
		this.navCtrl.push(ActionsPage);
	}	

	openSay() {
		this.navCtrl.push(SayPage);
	}

	openSettings() {
		this.navCtrl.push(SettingsPage);
	}

	openManual() {
		this.navCtrl.push(ManualPage);
	}
}