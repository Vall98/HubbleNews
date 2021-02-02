import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { NewsService } from './news.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private toastController: ToastController, private router: Router, private newsService: NewsService) {
  }

  toast(message: string, data: any) { //click => see more + close button
    let handler;
    if (data.page == "/newsdetails") {
      console.log(this.newsService.getNewsById(data.article).news_id);
      handler = () => {
        this.router.navigate([data.page], { fragment: data.anchor, state: { news: this.newsService.getNewsById(data.article) } });
      };
    } else {
      handler = () => {
        console.log(data.page);
      };
    }
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
}