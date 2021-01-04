import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { News, NewsService } from '../services/news.service';


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

  news: News[] = [];
  page: number = 1;

  loadData(event) {
    this.newsService.loadData(this.page).subscribe((allnews) => {
      console.log(allnews);
      if (event != undefined && allnews == []) {
        event.target.disabled = true;
        return;
      }
      this.page += 1;
      for (let newData of allnews) {
        this.newsService.loadNew(newData.news_id).subscribe((onenew) => {
          this.news.push(onenew);
        })
      }
      if (event != undefined) {
        event.target.complete();
      } else {
        this.infiniteScroll.disabled = false;
      }
    })
  }

}
