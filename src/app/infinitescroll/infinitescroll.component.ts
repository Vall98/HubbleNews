import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { News, NewsService } from '../services/news.service';

import { Plugins } from '@capacitor/core';
const { Browser } = Plugins;


@Component({
  selector: 'app-infinitescroll',
  templateUrl: './infinitescroll.component.html',
  styleUrls: ['./infinitescroll.component.scss'],
})
export class InfinitescrollComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  
  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.loadData(undefined);
  }

  page: number = 1;
  
  pos: number = 0;
  font: number = 0;

  loadData(event) {
    this.newsService.loadData(this.page).subscribe((allnews: News[]) => {
      if (event != undefined && allnews == []) {
        event.target.disabled = true;
        return;
      }
      this.page += 1;
      let dataLen: number = this.newsService.news.length;
      for (let newData of allnews) {
        this.newsService.loadNew(newData.news_id).subscribe((onenew) => {
          this.newsService.news.push(onenew);
          if (this.newsService.news.length == dataLen + allnews.length) {
            this.newsService.news.sort(function (a, b) {
              return new Date(b.publication).getTime() - new Date(a.publication).getTime();
            });
          }
        })
      }
      if (event != undefined) {
        event.target.complete();
      } else {
        this.infiniteScroll.disabled = false;
      }
    })
  }

  swipe(list, data: News) {
    list.closeSlidingItems();
    Browser.open({ url: data.url });
  }

  drag(event) {
    this.pos = event.detail.amount;
    this.font = (this.pos / 10);
  }
}
