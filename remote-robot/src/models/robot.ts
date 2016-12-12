export class Robot {

	//images as local-url
	icon: string;
	splashImg: string;

	constructor(public ip: string, public type: string, public name: string, public batteryLevel: number,
				public chargeStatus: boolean, public posture: string, public actions: string[]) {
		switch(type) {
			case 'PEPPER': 
				this.icon = "..."; this.splashImg = "..."; break;
			case 'NAO':
				this.icon = "..."; this.splashImg = "..."; break;
			case 'BUDDY':
				this.icon = "..."; this.splashImg = "..."; break;
			case 'JIBO':
				this.icon = "..."; this.splashImg = "..."; break;
		}
	}

	//GET & SET
	getIP() { return this.ip; }
	setIP(ip) { this.ip = ip; }

	getType() { return this.type; }
	setType(type) { this.type = type; }

	getName() { return this.name; }
	setName(name) { this.name = name; }

	getBatteryLevel() { return this.batteryLevel; }
	setBatteryLevel(battery) { this.batteryLevel = battery; }

	getChargeStatus() { return this.chargeStatus; }
	setChargeStatus(charge) { this.chargeStatus = charge; }
	
	getPosture() { return this.posture; }
	setPosture(posture) { this.posture = posture; }

	getActions() { return this.actions; }
	setActions(actions) { this.actions = actions; }

	getIcon() { return this.icon; }
	setIcon(icon) { this.icon = icon; }

	getSplashImg() { return this.splashImg; }
	setSplashImg(splash) { this.splashImg = splash; }

	//Custom methods
	toStringereeno() {
		return "IP:" + this.getIP() + ", Type:" + this.getType() + ", Name:" + this.getName + ", BatteryLevel:" + this.getBatteryLevel 
		+ ", ChargeStatus:" + this.getChargeStatus + ", Posture:" + this.getPosture() + ", Actions:" + this.getActions;
	}

}
