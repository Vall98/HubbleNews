import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LoadingService } from './loading.service';
import { NewsService } from './news.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private toastController: ToastController, private router: Router, private newsService: NewsService, private loadService: LoadingService) {
  }

  private async getHandler(message: string, data: any) {
    if (data.page == "/newsdetails") {
      let news_data = await this.newsService.loadNew(data.article).toPromise();
      return () => { this.router.navigate([data.page], { fragment: data.anchor, state: { news: news_data } }); };
    } else {
      return () => {console.log(data.page);};
    }
  }

  async toast(message: string, data: any) { //click => see more + close button
    let handler = await this.getHandler(message, data);
    this.toastController.create({
      header: 'Notification',
      message: message,
      position: 'bottom',
      buttons: [
        {
          side: 'end',
          icon: 'arrow-forward-outline',
          text: 'See',
          role: 'action',
          handler: handler
        }, {
          side: 'end',
          icon: 'close-outline',
          text: 'Close',
          role: 'cancel'
        }
      ]
    }).then((toast) => toast.present());
  }

  tap(message: string, data: any) {
    this.loadService.touchedObservable.subscribe(() => {
      this.getHandler(message, data).then((handler) => handler());
    });
  }
}