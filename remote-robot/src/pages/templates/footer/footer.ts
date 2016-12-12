import { Component } from '@angular/core';

import { ActionSheetController } from 'ionic-angular';

import { ShareService } from '../../services/ShareService';
import { DBService } from '../../../providers/db-service';

@Component({
	selector: 'footer-component',
  	templateUrl: './footer.html'
})

export class FooterComponent {

	robots: JSON[];
	buttons: JSON[];

	constructor(private actionSheetCtrl: ActionSheetController, private shareService: ShareService, private dbService: DBService) {}

	ngOnInit() { 
		console.log("INIT robots[] FROM DBSERVICE IN FOOTER");
		//var test;
		//this.dbService.getRecentRobots().subscribe(response => {
		//	test = response;
		//	console.log(test);
		//});
		//this.showRobots();
	}

	initButtons() {
		for(var r in this.robots) {
			var temp = JSON.stringify({ name: r["name"], ip: r["ip"] });
			this.buttons.push(JSON.parse(temp));
		}
	}

	showRobots() {

		this.initButtons();

    	let actionSheet = this.actionSheetCtrl.create({
    	  title: 'Switch robot',
    	  buttons: [
    	    {
    	      text: 'Destructive',
    	      role: 'destructive',
    	      handler: () => {
    	        console.log('Destructive clicked');
    	      }
    	    },{
    	      text: 'Archive',
    	      handler: () => {
    	        console.log('Archive clicked');
    	      }
    	    },{
    	      text: 'Cancel',
    	      role: 'cancel',
    	      handler: () => {
    	        console.log('Cancel clicked');
    	      }
    	    }
    	  ]
    	});

    actionSheet.present();
	}
}