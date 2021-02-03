import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { NetworkStatus, Plugins } from '@capacitor/core';

const { Network } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
})

export class HomeComponent implements OnInit {

  networkStatus: boolean;

  constructor(public userService: UserService, private toastController: ToastController) {}

  ngOnInit(): void {
    Network.addListener('networkStatusChange', (status: NetworkStatus) => {//isn't called on app launch
      this.networkStatus = status.connected;
      if (!this.networkStatus) {
          this.setNetworkToast();
      } else if (this.networkToast) {
        this.networkToast.dismiss();
      }
    });
  }

  networkToast: HTMLIonToastElement;

  private async setNetworkToast() {
    if (this.networkToast) this.networkToast.dismiss();
    this.networkToast = await this.toastController.create({
      header: 'Network issue',
      message: 'HubbleNews needs to be connected to Internet to work properly.',
      position: 'bottom',
      buttons: [
        {
          side: 'end',
          icon: 'close-outline',
          text: 'Close',
          role: 'cancel'
        }
      ]
    });
    this.networkToast.present();
  }

}
