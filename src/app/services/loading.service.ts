import { Injectable } from '@angular/core';
import { MusicService } from './music.service';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(private musicService: MusicService) { }

  public touched: boolean = false;

  onTouch() : void {
    this.touched = true;
    this.musicService.loadMusic();
  }
}