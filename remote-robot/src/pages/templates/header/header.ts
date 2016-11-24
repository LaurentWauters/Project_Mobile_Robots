import {Component} from '@angular/core';
import { ShareService } from '../../../app/ShareService';

@Component({
	selector: 'header-component',
  	templateUrl: 'build/pages/templates/header/header.html'
})

export class Header {

	icon: string;
	name: string;
	ip: string;
	battery: string;
	charging: boolean;

	constructor(private shareService: ShareService) {}

	ngOnInit() { 
		this.icon = this.shareService
	}
}