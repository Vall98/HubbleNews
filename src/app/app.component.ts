import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LoadingService } from './services/loading.service';
import { DeviceService } from './services/device.service';
import { Router } from '@angular/router';

import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from '@capacitor/core';

const { PushNotifications } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public loadingService: LoadingService,
    public deviceService: DeviceService,
    private router: Router
  ) {
    this.initializeApp();
    this.initializeNotifications();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.router.navigateByUrl('/home');
    });
  }
  
  initializeNotifications() {
    PushNotifications.requestPermission().then( result => {
      if (result.granted) {
        PushNotifications.register();
      }
    });
    PushNotifications.addListener('registration', (token: PushNotificationToken) => {
      //Send the token to the database
      this.deviceService.registerToken(token.value);
    });
    PushNotifications.addListener('registrationError', (error: any) => {
      alert('Error on registration: ' + JSON.stringify(error));
    });
    PushNotifications.addListener('pushNotificationReceived', (notification: PushNotification) => {
      alert('Push received: ' + JSON.stringify(notification));
    });
    PushNotifications.addListener('pushNotificationActionPerformed', (notification: PushNotificationActionPerformed) => {
      alert('Push action performed: ' + JSON.stringify(notification));
    });
  }
}
