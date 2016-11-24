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

	//ONLY GETTERS, SETTERS CAN BE IMPLEMENTED, BUT OBSOLETE AS OF THIS TIME
	getIP() { return this.ip; }
	getType() { return this.type; }
	getName() { return this.name; }
	getBatteryLevel() { return this.batteryLevel; }
	getChargeStatus() { return this.chargeStatus; }
	getPosture() { return this.posture; }
	getActions() { return this.actions; }
	getIcon() { return this.icon; }
	getSplashImg() { return this.splashImg; }

	//Custom methods
	toString() {
		return "IP:" + this.getIP() + ", Type:" + this.getType() + ", Name:" + this.getName + ", BatteryLevel:" + this.getBatteryLevel 
		+ ", ChargeStatus:" + this.getChargeStatus + ", Posture:" + this.getPosture() + ", Actions:" + this.getActions;
	}
}