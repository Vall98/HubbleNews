import { Component, OnInit } from '@angular/core';
import { ModalsService } from '../services/modals.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {

  constructor(private userservice: UserService, private modalsService: ModalsService) { }

  username: string = "";
  password: string = "";
  err: string = "";

  ngOnInit() {}

  signin() {
    this.userservice.signin(this.username, this.password).subscribe((data) => {
      this.userservice.connected = true;
      this.userservice.user = data;
      //this.alertService.set("success", "Vous êtes connecté !", 2000);
      this.username = "";
    }, (err) => {
      if (err.error.message === "Missing credentials") err.error.message = "Veuillez remplir le formulaire.";
      this.err = err.error.message;
    });
    this.password = '';
  }

  signup() {
    this.modalsService.signup();
  }

}
