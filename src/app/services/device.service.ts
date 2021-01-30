import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
  
  //This function should be called only once when the application is starting.
  //That means that we don't need to check if the uuid/location exist to prevent getting it a second time.
  registerToken(token) {
    Device.getInfo().then((info) => {
      this.uuid = info.model + "-" + info.manufacturer + "-" + info.uuid;
      Geolocation.getCurrentPosition().then((coordinates) => {
        console.log("HEHO");
        this.http.post(this.url + "device/regisertoken", { token: token, uuid: this.uuid, latitude: coordinates.coords.latitude, longitude: coordinates.coords.longitude })
        .subscribe((data) => {
          console.log("DUBATEAU");
          console.log(data);
        }, (err) => {
          console.log(err);
        });
      })
    });
  }
}