import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ModalsService } from '../services/modals.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {

  constructor(private userservice: UserService, private modalsService: ModalsService, private toastController: ToastController) { }

  username: string = "";
  password: string = "";
  err: string = "";

  ngOnInit() {}

  signin() {
    this.userservice.signin(this.username, this.password).subscribe((data) => {
      this.userservice.connected = true;
      this.userservice.user = data.user;
      this.userservice.saveToken(data.token);
      this.username = "";
      this.toastController.create({
        message: "You are connected !",
        duration: 2000
      }).then((toast) => toast.present());
      this.modalsService.signinModal.dismiss();
    }, (err) => {
      this.err = err.error.message;
    });
    this.password = '';
  }

  signup() {
    this.modalsService.signup();
  }

}