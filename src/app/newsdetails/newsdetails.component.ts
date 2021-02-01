import "@capacitor-community/text-to-speech";

import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ToastController } from "@ionic/angular";
import { News, NewsService } from '../services/news.service';
import { TTSService } from "../services/tts.service";
import { UserService } from "../services/user.service";

import { Plugins } from "@capacitor/core";
const { Browser, Share } = Plugins;

@Component({
  selector: 'app-newsdetails',
  templateUrl: './newsdetails.component.html',
  styleUrls: ['./newsdetails.component.scss'],
})
export class NewsdetailsComponent implements OnInit {
  
  constructor(private router: Router, private ttsService: TTSService, private newService: NewsService, public userService: UserService, private toastController: ToastController) { }
  
  data: News;
  comments: Comment[];
  newComment: string;

  ngOnInit() {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd){
        if (val.url == "/newsdetails") {
          this.data = history.state.news;
          if (!this.data || !this.data.news_id) {
            this.router.navigateByUrl('/home');
            return;
          }
          this.ttsService.startTTS(this.data);
          this.initComments();
        } else {
          this.ttsService.stopTTS();
        }
      }
    });
  }

  initComments() {
    this.newService.loadComments(this.data.news_id).subscribe((data: Comment[]) => {
      this.comments = data;
    });
  }

  leaveComment() {
    if (!this.userService.connected) return;
    this.userService.leaveComment(this.data.news_id, this.newComment).subscribe(() => {
      this.initComments();
      this.newComment = undefined;
      this.toastController.create({
        message: "Comment sent !",
        duration: 2000
      }).then((toast) => toast.present());
    });
  }

  click() {
    Browser.open({ url: this.data.url });
  }

  share() {
    Share.share({
      title: "I've seen this super article on the HubbleNews App! Check it out!",
      text: "I've seen this super article on the HubbleNews App! Check it out!",
      url: this.data.url,
      dialogTitle: 'Explorate space with others'
    }).catch(() => {
      this.toastController.create({
        message: "The share option is not available in your browser, use the mobil app!",
        duration: 2000
      }).then((toast) => toast.present());
    });
  }
}
