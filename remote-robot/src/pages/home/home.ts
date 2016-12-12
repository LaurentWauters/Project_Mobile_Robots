import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { RobotService } from '../../providers/robot-service';
import { DBService } from '../../providers/db-service';
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
	dbService: DBService;
	ip = {address: ''};
	shareService: ShareService;
	splashImg: string;

  constructor(public navCtrl: NavController, private myShareService: ShareService, private myRobotService: RobotService, private myDBService: DBService) {
		this.robotService = myRobotService;
		this.dbService = myDBService;
		this.shareService = myShareService;
	}

	loginForm(form) {
		//IP input
		var input = form.value.address;

    	console.log("LOGIN-ENTRY: " + input);
		this.robotService.login(input).subscribe(response => {

			if(response.status == 200) {
				console.log("CORRECT RESPONSE STATUS");
				this.robotService.getRobot().subscribe(
					response => {
						this.shareService.setRobot(
							new Robot(response.ip, response.type, response.name, response.batteryLevel, response.chargeStatus, response.posture, response.actions)
						);
						this.splashImg = this.shareService.getRobot().getSplashImg();
							//Write IP to database
						console.log("IP: ");
						this.dbService.addRobot(this.shareService.getRobot());
						// this.dbService.testPost();
					}

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


		/*drawCircle() {
		var c = <HTMLCanvasElement>document.getElementById("canvas");
		var ctx = c.getContext("2d");
		ctx.beginPath();
		ctx.arc(150, 150, 300, 0, 0.5 * Math.PI);
		ctx.moveTo(150, 150);
		ctx.lineTo(300, 150);
		ctx.moveTo(150, 150);
		ctx.lineTo(150, 300);
		ctx.lineTo(300, 150);
		ctx.stroke();
		ctx.fillStyle = 'rgb(0, 78, 104, 0.5)';
		ctx.fill();
	};	*/
}