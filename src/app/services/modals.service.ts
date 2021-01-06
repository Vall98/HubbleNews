import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SigninComponent } from '../signin/signin.component';
import { SignupComponent } from '../signup/signup.component';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {
  
  signinModal: HTMLIonModalElement;
  signupModal: HTMLIonModalElement;

  constructor(private modalController: ModalController) {
  }

  signin() {
    if (this.signupModal != undefined) {
      this.signupModal.dismiss();
    }
    this.modalController.create({component: SigninComponent}).then((modal) => {
      this.signinModal = modal;
      modal.present();
    });
  }

  signup() {
    if (this.signinModal != undefined) {
      this.signinModal.dismiss();
    }
    this.modalController.create({component: SignupComponent}).then((modal) => {
      this.signupModal = modal;
      modal.present();
    });
  }
}