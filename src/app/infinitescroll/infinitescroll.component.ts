import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { BrowserTab } from '@ionic-native/browser-tab/ngx';
import { News, NewsService } from '../services/news.service';


@Component({
  selector: 'app-infinitescroll',
  templateUrl: './infinitescroll.component.html',
  styleUrls: ['./infinitescroll.component.scss'],
})
export class InfinitescrollComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  
  constructor(private newsService: NewsService, private browserTab: BrowserTab) { }

  ngOnInit() {
    this.loadData(undefined);
  }

  news: News[] = [];
  page: number = 1;

  loadData(event) {
    this.newsService.loadData(this.page).subscribe((allnews: News[]) => {
      console.log(allnews);
      if (event != undefined && allnews == []) {
        event.target.disabled = true;
        return;
      }
      this.page += 1;
      let dataLen: number = this.news.length;
      for (let newData of allnews) {
        this.newsService.loadNew(newData.news_id).subscribe((onenew) => {
          this.news.push(onenew);
          if (this.news.length == dataLen + allnews.length) {
            this.news.sort(function (a, b) {
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

  swipe(event, data: News) {
    console.log(event);
    this.browserTab.isAvailable().then(isAvailable => {
      if (isAvailable) {
        this.browserTab.openUrl(data.url);
      } else {
        window.open(data.url, "_blank");
      }
    }).catch((err) => {
      window.open(data.url, "_blank");
    });
  }

}
