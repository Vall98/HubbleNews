import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Plugins } from "@capacitor/core";

const { NativeAudio } = Plugins;


@Injectable({
  providedIn: 'root'
})
export class MusicService {

  volumeObsrv: Promise<number> = this.storage.get('hubble_music_volume');
  
  constructor(private platform: Platform, private storage: Storage) {
    this.volumeObsrv.then((volume) => {
      if (volume == undefined || volume == null || volume < 0) {
        this.musicVolume = 0.5;
        this.saveVolume();
      } else {
        this.musicVolume = volume;
      }
      if (!this.platform.is("desktop")) {
        NativeAudio.preloadComplex({
          assetPath: this.AUDIO_SRC,
          assetId: "audio",
          volume: this.musicVolume,
          audioChannelNum: 1
        });
      }
    })
  }
  
  AUDIO_SRC = this.platform.is("android") ?  "scifi_pulse_loop" : "../../assets/sounds/Sci-fi_Pulse_Loop.wav";
  musicVolume: number;
  audio: HTMLAudioElement;

  loadMusic() {
    if (!this.platform.is("desktop")) {
      NativeAudio.loop({assetId: "audio"});
    } else {
      this.audio = new Audio();
      this.audio.src = this.AUDIO_SRC;
      this.audio.loop = true;
      this.audio.volume = this.musicVolume;
      this.audio.load();
      this.audio.play();
    }
  }

  changeMusicVolume(newValue: number) {
    newValue = newValue / 100;
    this.musicVolume = newValue;
    if (!this.platform.is("desktop")) {
      NativeAudio.setVolume({
        assetId: "audio",
        volume: this.musicVolume,
      });
    } else {
      this.audio.volume = this.musicVolume;
    }
    this.saveVolume();
  }

  private saveVolume() {
    this.storage.set('hubble_music_volume', this.musicVolume);
  }
}