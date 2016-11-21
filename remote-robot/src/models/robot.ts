export interface Robot {
	ip: string;
	type: string;
	name: string;
	batteryLevel: number;
	chargeStatus: boolean;
	posture: string;

	icon: string;
	splashIcon: string;

	actions: string[];
}