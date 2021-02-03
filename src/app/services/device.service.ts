import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Plugins } from '@capacitor/core';

const { Device, Geolocation } = Plugins;


@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  
  uuid: string = undefined;
  url: string = "https://ts3.wondercube.fr/api/";
  
  constructor(private http: HttpClient) {
  }

  private sendToken(token: string, latitude: number, longitude: number) {
    this.http.post(this.url + "device/regisertoken", { token: token, uuid: this.uuid, latitude: latitude, longitude: longitude })
    .subscribe((data) => {
      console.log(data);
    }, (err) => {
      console.log(err);
    });
  }
  
  //This function should be called only once when the application is starting.
  //That means that we don't need to check if the uuid/location exist to prevent getting it a second time.
  registerToken(token: string) {
    Device.getInfo().then((info) => {
      this.uuid = info.model + "-" + info.manufacturer + "-" + info.uuid;
      Geolocation.getCurrentPosition().then((coordinates) => {
        this.sendToken(token, coordinates.coords.latitude, coordinates.coords.longitude);
      }).catch((err) => {
        this.sendToken(token, undefined, undefined);
        alert('Autorize and enable GPS to update your position! Your position is stored and used only to give you notifications on what satellites are crossing your sky.');
      });
    });
  }
}