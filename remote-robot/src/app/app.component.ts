import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar } from 'ionic-native';

import { ShareService } from '../pages/services/ShareService';

import { HomePage } from '../pages/home/home';
import { ActionsPage } from '../pages/actions/actions';
import { SayPage } from '../pages/say/say';
import { ManualPage } from '../pages/manual/manual';
import { SettingsPage } from '../pages/settings/settings';

import { CustExtBrowserXhr } from '../../cust-ext-browser-xhr';

@Component({
  templateUrl: 'app.html',
  providers: [ShareService, CustExtBrowserXhr]
})


export class MyApp {
 @ViewChild(Nav) nav: Nav;

  // make HomePage the root (or first) page
  rootPage: any = HomePage;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,  private shareService: ShareService, public menu: MenuController) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Actions', component: ActionsPage },
      { title: 'Say', component: SayPage },
      { title: 'Manual', component: ManualPage },  
      { title: 'Settings', component: SettingsPage },      
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}