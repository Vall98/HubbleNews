import "@capacitor-community/text-to-speech";

import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { News } from '../services/news.service';
import { TTSService } from "../services/tts.service";

import { Plugins } from "@capacitor/core";
const { Browser } = Plugins;

@Component({
  selector: 'app-newsdetails',
  templateUrl: './newsdetails.component.html',
  styleUrls: ['./newsdetails.component.scss'],
})
export class NewsdetailsComponent implements OnInit {

  constructor(private router: Router, private ttsService: TTSService) { }

  data: News;

  ngOnInit() {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd){
        if (val.url == "/newsdetails") {
         this.data = history.state.news;
         this.ttsService.startTTS(this.data);
         if (this.data.news_id == undefined) {
           this.router.navigateByUrl('/home');
         }
        } else {
          this.ttsService.stopTTS();
        }
      }
    });
  }

  click() {
    Browser.open({ url: this.data.url });
  }
}
