import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Sim } from 'ionic-native';
import { HomePage } from '../pages/home/home';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = HomePage;
  simname: string;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      Sim.getSimInfo().then((data) => {
          console.log("data set=>",data),
          console.log("data set2=>",data.cards)
      });
     
    Sim.hasReadPermission().then(
  (info) => console.log('Has permission: ', info)
    );

    Sim.requestReadPermission().then(
    () => console.log('Permission granted'),
    () => console.log('Permission denied')
    );


      Splashscreen.hide();
      StatusBar.styleDefault();
      
    });
  }
}
