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
      this.err = "Les mots de passe ne correspondent pas.";
      return;
    }
    this.userservice.signup(this.username, this.email, this.password).subscribe( (data) => {
      this.username = "";
      this.email = "";
      //this.alertService.set("success", "Votre compte a été créé !", 2000);
      this.modalsService.signupModal.dismiss();
    }, (err) => {
      if (err.error.message === "Missing credentials") err.error.message = "Veuillez remplir le formulaire.";
      this.err = err.error.message;
    });
    this.password = '';
    this.passcheck = '';
  }

}
