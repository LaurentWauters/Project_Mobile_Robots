import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { RobotService } from '../../providers/robot-service';
import {ShareService} from '../services/ShareService';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	loginSuccess: Boolean;
	robotService: RobotService;
	shareService: ShareService;
	ip = {
		adress: ''
	};

  constructor(public navCtrl: NavController, private myShareService: ShareService, private myRobotService: RobotService) {
		this.robotService = myRobotService;
		this.shareService = myShareService;
	}

	loginForm(form) {
    console.log(form.value.adress);
		// this.robotService.login(form.value.adress);

		this.robotService.login(form.value.adress).subscribe(response => {
			console.log(response)
			if(response.status == 200) {
				this.robotService.getRobot().subscribe(response => {
					this.shareService.setRobot(response);
				});
				this.loginSuccess = true;				
			}
			else {
				this.loginSuccess = false;
			}	
		})
	};

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