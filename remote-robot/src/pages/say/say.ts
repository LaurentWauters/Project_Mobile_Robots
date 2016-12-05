import { Component } from '@angular/core';
import { NavController, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
import { Toast, Camera, File, Transfer} from 'ionic-native';

import { RobotService } from '../../providers/robot-service';
import { ShareService } from '../services/ShareService';

@Component({
  selector: 'page-say',
  templateUrl: 'say.html'
})
export class SayPage {

  robotService: RobotService;
  shareService: ShareService;

  responses: String[];

  public base64Image: string;

  constructor(public navCtrl: NavController, private myShareService: ShareService, private myRobotService: RobotService, public toastCtrl: ToastController) {
    this.robotService = myRobotService;
    this.shareService = myShareService;
    this.responses = new Array();
  }

  ionViewDidLoad() {
    console.log('Hello Say Page');
  }

  doSpeak(form) {
    this.robotService.doSpeak(form.value.text).subscribe(response => {
      console.log(response)
      if (response.status == 200) {
        console.log("performing say success");
        this.responses.push(response);
      }
      else {
        console.log("performing say failed")
      }
    })
  }

  takePicture(){
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 1000,
        targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.base64Image = "data:image/jpeg;base64," + imageData;
        let toast = this.toastCtrl.create({
          message: 'You look like you just lost 3.2K...',
          duration: 3000
        });
        toast.present();
    }, (err) => {
        console.log(err);
    });
  }  
}