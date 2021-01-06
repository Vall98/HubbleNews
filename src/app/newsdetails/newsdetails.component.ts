import "@capacitor-community/text-to-speech";

import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { News } from '../services/news.service';

import { Plugins } from "@capacitor/core";
const { TextToSpeech } = Plugins;

@Component({
  selector: 'app-newsdetails',
  templateUrl: './newsdetails.component.html',
  styleUrls: ['./newsdetails.component.scss'],
})
export class NewsdetailsComponent implements OnInit {

  constructor(private router: Router, public platform: Platform) { }

  data: News;

  ngOnInit() {
    if (!this.platform.is("desktop")) {
      TextToSpeech.openInstall();
    }
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd){
        if (val.url == "/newsdetails") {
         this.data = history.state.news;
         this.startTTS();
         if (this.data.news_id == undefined) {
           this.router.navigateByUrl('/home');
         }
        } else {
          this.stopTTS();
        }
      }
    });
  }

  stopTTS() {
    TextToSpeech.stop();
  }

  startTTS() {
    //this.stopTTS()
    TextToSpeech.speak({
      text: "This is a sample text.",
      locale: "en_US",
      speechRate: 1.0,
      pitchRate: 1,
      volume: 1.0,
      voice: 10,
      category: "ambient",
    });
  }
}
