import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { News } from './news.service';

import { Plugins } from "@capacitor/core";
const { NativeAudio } = Plugins;

const AUDIO_SRC = "../assets/sounds/Sci-fi_Pulse_Loop.wav";

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  constructor(private platform: Platform) {
    this.loadMusic();
  }

  musicVolume: number = 0.5;
  audio: HTMLAudioElement;

  loadMusic() {
    if (!this.platform.is("desktop")) {
      NativeAudio.preloadComplex({
        assetPath: AUDIO_SRC,
        assetId: "audio",
        volume: this.musicVolume,
        audioChannelNum: 1
      });
      NativeAudio.loop({assetId: "audio"});
    } else {
      this.audio = new Audio();
      this.audio.src = AUDIO_SRC;
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
  }
}