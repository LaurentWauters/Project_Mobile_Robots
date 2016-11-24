import { Robot } from '../models/robot';

export class ShareService {

    private robot: Robot;
 
    constructor() {
        this.robot = null;
    }
  
    setRobot(robot : Robot) {
        this.robot = robot;
    }
  
    getRobot() {
        return this.robot;
    }
}