import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { LoadingService } from '../services/loading.service';
import { UserService } from '../services/user.service';
import { NetworkStatus, PluginListenerHandle, Plugins } from '@capacitor/core';

const { Network } = Plugins;

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  
  constructor(public plt: Platform, private loadingService: LoadingService, private userService: UserService, private toastController: ToastController, private ref: ChangeDetectorRef) {}
  
  ready: boolean = false;
  networkStatus: boolean = false;
  networkToast: HTMLIonToastElement;
  networkHandler: PluginListenerHandle;

  ngOnInit() {
    this.plt.ready().then((readySource) => {
      this.userService.tokenObsrv.then(() => {
        this.userService.waitConnectionChecked().subscribe((data) => this.setReady(readySource), (err) => this.setReady(readySource));
      })
    });
    Network.getStatus().then((status: NetworkStatus) => {
      this.networkStatus = status.connected;
      if (!this.networkStatus) {
        this.setNetworkToast();
      }
    });
    this.networkHandler = Network.addListener('networkStatusChange', (status: NetworkStatus) => {//isn't called on app launch
      this.networkStatus = status.connected;
      if (!this.networkStatus) {
          this.setNetworkToast();
      } else if (this.networkToast) {
        this.networkToast.dismiss();
      }
      this.ref.detectChanges();
    });
  }

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

  setReady(readySource) {
    this.ready = true;
    console.log('Platform ready from', readySource);
  }

  onTouch() {
    //add animation
    if (this.ready && this.networkStatus) {
      this.networkHandler.remove(); //remove network listener
      this.loadingService.onTouch();
    }
  }
}
