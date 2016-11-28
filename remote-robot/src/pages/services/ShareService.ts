import { Robot } from '../../models/robot';

export class ShareService {

    private robot: Robot;
    private loaded: boolean;
 
    constructor() {
        this.robot = null;
        this.loaded = false;
    }
  
    setRobot(robot : Robot) {
        this.robot = robot;
        this.loaded = true;
        console.log("SHARESERVICE: " + this.robot.getName());
    }
  
    getRobot() {
        return <Robot>this.robot;
    }
}