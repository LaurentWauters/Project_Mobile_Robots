import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { RobotService } from '../../providers/robot-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	loginSuccess: Boolean
	private robotService: RobotService
	ip = {
		adress: ''
	};

  constructor(public navCtrl: NavController, robotService: RobotService) {
		this.robotService = robotService;

		robotService.getRobot().subscribe(response => {
			console.log("GET_ROBOT RESPONSE: " + response.toString());
		});
	}

	loginForm(form) {
    console.log(form.value.adress)
		this.robotService.login(form.value.adress).subscribe(response => {
			console.log(response)
			if(response.status == 200) {
				this.loginSuccess = true;
			}
			else {
				this.loginSuccess = false;
			}	
		})
  }
}