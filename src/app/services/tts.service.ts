import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { News } from './news.service';

import { Plugins } from "@capacitor/core";
import { SpeechSynthesisVoice } from '@capacitor-community/text-to-speech';
const { TextToSpeech } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class TTSService {

  constructor(private platform: Platform) {
    this.loadTTS();
  }
  
  speakerVolume: number = 0.75;
  voices: SpeechSynthesisVoice[] = [];
  voice: number = 2;

  playing: string[] = [];
  
  loadTTS() {
    if (!this.platform.is("desktop")) {
      TextToSpeech.openInstall().then(() => this.getVoices());
    } else {
      this.getVoices();
    }
  }

  private getVoices() {
    TextToSpeech.getSupportedVoices().then((data) => {
      this.voices = data.voices;
    });
  }

  getVoice(): SpeechSynthesisVoice {
    if (this.voices.length <= 0) {
      return undefined;
    }
    return this.voices[this.voice];
  }

  stopTTS() {
    this.playing = [];
    TextToSpeech.stop();
  }

  startTTS(data: News) {
    TextToSpeech.getSupportedVoices().then((voices) => console.log(voices));
    this.playing = data.abstract.split(".");
    this.playTTS(0);
  }
  
  private playTTS(i: number) {
    TextToSpeech.stop().finally(() => {
      TextToSpeech.speak({
        text: this.playing[i],
        locale: "en_US",
        speechRate: 0.7,
        pitchRate: 1,
        volume: this.speakerVolume,
        voice: this.voice,
        category: "ambient",
      }).finally(() => {
        i++;
        if (i < this.playing.length) {
          this.playTTS(i);
        }
      });
    });
  }

  changeSpeakerVolume(newValue: number) {
    newValue = newValue / 100;
    this.speakerVolume = newValue;
  }
}