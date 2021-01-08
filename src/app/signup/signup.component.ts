import { Component, OnInit } from '@angular/core';
import { ModalsService } from '../services/modals.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  constructor(private userservice: UserService, private modalsService: ModalsService) { }

  username: string = "";
  password: string = "";
  passcheck: string = "";
  email: string = "";
  err: string = "";

  ngOnInit() {}

  signin() {
    this.modalsService.signin();
  }

  signup() {
    if (this.passcheck !== this.password) {
      this.err = "Passwords are not matching.";
      return;
    } else if (!this.userservice.validateEmail(this.email)) {
      this.err = "Invalid Email.";
      return;
    }
    this.userservice.signup(this.username, this.email, this.password).subscribe((data) => {
      this.userservice.connected = true;
      this.userservice.user = data.user;
      this.userservice.saveToken(data.token);
      this.username = "";
      this.email = "";
      //this.alertService.set("success", "Votre compte a été créé !", 2000);
      this.modalsService.signupModal.dismiss();
    }, (err) => {
      this.err = err.error.message;
    });
    this.password = '';
    this.passcheck = '';
  }

}
