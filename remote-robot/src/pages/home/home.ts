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
			console.log(response);
			if(response.status == 200) {
				this.loginSuccess = true;
			}
			else {
				this.loginSuccess = false;
			}	
		});

		robotService.getRobot().subscribe(response => {
			console.log("GET_ROBOT RESPONSE: " + response.toString());
		});
	}
}