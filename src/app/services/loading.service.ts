import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() { }

  public touched: boolean = false;

  onTouch() : void {
    this.touched = true;
  }
}
