import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { News } from '../services/news.service';

@Component({
  selector: 'app-newsdetails',
  templateUrl: './newsdetails.component.html',
  styleUrls: ['./newsdetails.component.scss'],
})
export class NewsdetailsComponent implements OnInit {

  constructor(private router: Router) { }

  data: News;

  ngOnInit() {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd && val.url == "/newsdetails") {
        this.data = history.state.news;
        this.startTTS();
        if (this.data.news_id == undefined) {
          this.router.navigateByUrl('/home');
        }
      }
    });
  }

  startTTS() {
    
  }
}
