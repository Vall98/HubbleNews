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
import { NotificationService } from './services/notification.service';

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
    private router: Router,
    private notificationService: NotificationService
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
      alert('Error, please check your internet connection. Contact the team if it does not solve the issue.');
    });
    PushNotifications.addListener('pushNotificationReceived', (notification: PushNotification) => {
      this.notificationService.toast(notification.title, notification.data);
    });
    PushNotifications.addListener('pushNotificationActionPerformed', (notification: PushNotificationActionPerformed) => {
      this.notificationService.tap(notification.notification.title, notification.notification.data);
    });
  }
}
