import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { DeviceService } from './device.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = "https://ts3.wondercube.fr/api/";
  credentials = {};
  meObsrv: Observable<any>;
  tokenObsrv: Promise<string> = this.storage.get('hubble_token');
  
  constructor(private http: HttpClient, private storage: Storage, private deviceService: DeviceService) {
    this.tokenObsrv.then((token) => {
      if (token) {
        this.credentials = { headers: new HttpHeaders({Authorization: token}) };
      }
      this.meObsrv = this.http.get(this.url + "me", this.credentials).pipe(share());
      this.meObsrv.subscribe((data: User) => {
        this.user = data;
        this.connected = true;
      });
    });
  }

  connected: boolean = false;
  user: User;

  logout() {
    this.connected = false;
    this.user = undefined;
    this.saveToken("");
  }

  saveToken(token: string) {
    this.credentials = (token && token != "" ? { headers: new HttpHeaders({Authorization: token}) } : {});
    this.storage.set('hubble_token', token);
  }

  waitConnectionChecked(): Observable<any> {
    return this.meObsrv;
  }

  signin(login: string, password: string): Observable<any> {
    return this.http.post(this.url + "signin", {username: login, password: password, deviceToken: this.deviceService.uuid});
  }

  signup(login: string, email:string, password: string): Observable<any> {
    return this.http.post(this.url + "signup", {username: login, password: password, email: email, deviceToken: this.deviceService.uuid});
  }

  updateUser(password: string, newPass: string, email: string, username: string): Observable<any> {
    return this.http.post(this.url + "user/update", { oldPass: password, newPass: newPass, email: email, username: username }, this.credentials);
  }

  sendImage(img: string | ArrayBuffer, ext: string) {
    return this.http.post(this.url + "user/image", { img: img, ext: ext }, this.credentials);
  }

  validateEmail(email: string): boolean {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validateUsername(username: string): boolean {
    var re = /^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9_]+(?<![_.])$/;
    return re.test(String(username).toLowerCase());
  }

  leaveComment(id: string, comment: string) {
    return this.http.post(this.url + "news/comment", {id: id, comment: comment}, this.credentials);
  }
}

export class User {
  username: string;
  email: string;
  img: string;
}