import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MusicService } from './music.service';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  
  constructor(private musicService: MusicService) { }
  
  public touchedObservable: Subject<void> = new Subject<void>();
  public touched: boolean = false;

  onTouch() : void {
    this.touched = true;
    this.touchedObservable.next();
    this.musicService.loadMusic();
  }
}