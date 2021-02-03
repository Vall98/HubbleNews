import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  
  constructor(private http: HttpClient) { }
  
  news: News[] = [];
  
  url: string = "https://ts3.wondercube.fr/api/";
  
  loadData(page: number): Observable<any> {
    return this.http.get(this.url + "hubblesite/news?page=" + page);
  }
  
  loadNew(id: string): Observable<any> {
    return this.http.get(this.url + "hubblesite/news_release?id=" + id);
  }
  
  loadComments(id: string): Observable<any> {
    return this.http.get(this.url + "news/comments?id=" + id);
  }
}

export class News {
  name: string;
  news_id: string;
  url: string;
  publication: string;
  mission: string;
  abstract: string;
  thumbnail_2x: string;
  keystone_image_2x: string;
}

export class Comment {
  id: number;
  article_id: string;
  comment: string;
  updatedAt: string;
  user: {
    username: string,
    img: string
  };
}