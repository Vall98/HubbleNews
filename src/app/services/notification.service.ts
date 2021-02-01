import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private toastController: ToastController) {
  }

  toast(message: string) { //click => see more + close button
    this.toastController.create({
      message: message,
      duration: 4000
    }).then((toast) => toast.present());
  }
}