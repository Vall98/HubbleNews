import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = "https://ts3.wondercube.fr/api/";
  credentials = {};
  meObsrv: Observable<any>;
  tokenObsrv: Promise<string> = this.storage.get('hubble_token');
  
  constructor(private http: HttpClient, private router: Router, private storage: Storage) {
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
    return this.http.post(this.url + "signin", {username: login, password: password}, this.credentials);
  }

  signup(login: string, email:string, password: string): Observable<any> {
    return this.http.post(this.url + "signup", {username: login, password: password, email: email});
  }

  signout(): void {
    this.http.get(this.url + "logout", this.credentials).subscribe((data) => {
      this.connected = false;
      this.user = null;
      this.router.navigate(['/']);
    }, (err) => this.router.navigate(['/']));
  }

  updateUser(password: string, newPass: string, email: string): Observable<any> {
    return this.http.post(this.url + "user/update", { oldPass: password, newPass: newPass, email: email }, this.credentials);
  }
}

export class User {
  username: string;
  email: string;
  img: string;
}