import {Component} from '@angular/core';
import { ShareService } from '../../services/ShareService';

@Component({
	selector: 'header-component',
  	templateUrl: './header.html'
})

export class HeaderComponent {

	icon: string;
	name: string;
	ip: string;
	battery: number;
	charging: boolean;

	constructor(private shareService: ShareService) {}

	ngOnInit() { 
		var misterRobot = this.shareService.getRobot();
		this.icon = misterRobot.getIcon();
		this.name = misterRobot.getName();
		this.ip = misterRobot.getIP();
		this.battery = misterRobot.getBatteryLevel();
		this.charging = misterRobot.getChargeStatus();
	}
}