import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../services/user.service';
import { Plugins, CameraResultType } from '@capacitor/core';

const { Camera } = Plugins;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  img: string | ArrayBuffer;
  ext: string;

  err: string = "";

  username: string = this.userService.user.username;
  email: string = this.userService.user.email;
  newPass: string = "";
  confirmPass: string = "";
  oldPass: string = "";

  constructor(private userService: UserService) { }

  ngOnInit() {}

  loadImageFromCamera() {
    Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl
    }).then((image) => {
      const header: String = "data:image/";
      this.img = image.dataUrl;
      this.ext = '.' + image.dataUrl.substring(header.length, image.dataUrl.lastIndexOf(";base64"));
    });
  }

  loadImageFromDevice(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.img = reader.result;
        this.ext = file.name.substring(file.name.lastIndexOf('.'), file.name.length) || "";
      };
    
      reader.onerror = (error) => {
      };
      reader.readAsDataURL(file);
    }
  }

  sendImage() {
    if (this.img && this.ext) {
      this.userService.sendImage(this.img, this.ext).subscribe((data: User) => {
        this.userService.user.img = data.img;
      });
    }
  }

  updateProfile() {
    if (this.newPass != this.confirmPass) this.err = "Passwords are not matching.";
    else if (!this.userService.validateEmail(this.email)) this.err = "Invalid Email.";
    else if (this.email == this.userService.user.email && this.username == this.userService.user.username && !this.newPass) this.err = "No new entries.";
    else {
      this.userService.updateUser(this.oldPass, this.newPass, this.email, this.username).subscribe((data) => {
        this.userService.user = data.user;
      });
      this.err = "";
      this.newPass = "";
      this.confirmPass = "";
      this.oldPass = "";
    }
  }
}
