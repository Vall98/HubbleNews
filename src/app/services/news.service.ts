import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  url: string = "https://ts3.wondercube.fr/hubblesite/";

  loadData(page: number): Observable<any> {
    return this.http.get(this.url + "news?page=" + page);
  }

  loadNew(id: string): Observable<any> {
    return this.http.get(this.url + "news_release?id=" + id);
  }

}

export class News {
  name: string;
  news_id: string;
  url: string;
  publication: string;
  mission: string;
  abstract: string;
  thumbnail: string;
}