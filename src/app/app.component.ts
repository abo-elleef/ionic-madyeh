import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AdMobPro} from '@ionic-native/admob-pro';
import {HomePage} from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private admob: AdMobPro) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      let admobid = {banner: 'ca-app-pub-2772630944180636/8784215495'}
      // if (/(android)/i.test(navigator.userAgent)) {
      //   let admobid = { // for Android
      //     banner: '',
      //     interstitial: '',
      //     reward_video: ''
      //   };
      // } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
      //   let admobid = { // for iOS
      //     banner: 'ca-app-pub-2772630944180636/8784215495',
      //     interstitial: '',
      //     reward_video: ''
      //   };
      // } else {
      //   let admobid = { // for Windows Phone
      //     banner: 'ca-app-pub-2772630944180636/8784215495',
      //     interstitial: '',
      //     reward_video: ''
      //   };
      // }
      setTimeout(function () {
        this.admob.createBanner({
          adId: admobid.banner
        }).then((data) => {
          var that = this
          setTimeout(function () {
            that.admob.showBanner(8)
          }, 500)
        });
      }, 1000)
      splashScreen.hide();
    });
  }
}

