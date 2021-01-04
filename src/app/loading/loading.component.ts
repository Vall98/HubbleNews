import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {

  constructor(public plt: Platform, private loadingService: LoadingService) {}

  ready: boolean = false;

  ngOnInit() {
    this.plt.ready().then((readySource) => {
      this.ready = true;
      console.log('Platform ready from', readySource);
    });
  }

  onTouch() {
    //add animation
    if (this.ready)
      this.loadingService.onTouch();
  }
}
