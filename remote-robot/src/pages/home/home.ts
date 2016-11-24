import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { RobotService } from '../../providers/robot-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	loginSuccess: Boolean

  constructor(public navCtrl: NavController, private robotService: RobotService) {
		robotService.login().subscribe(response => {
			console.log(response)
			if(response.status == 200) {
				this.loginSuccess = true;
			}
			else {
				this.loginSuccess = false;
			}	
		})
	};

	drawCircle() {
		var c = <HTMLCanvasElement>document.getElementById("canvas");
		var ctx = c.getContext("2d");
		ctx.beginPath();
		ctx.arc(150,150,500,0,2*Math.PI);
		ctx.stroke();	
	}	
}