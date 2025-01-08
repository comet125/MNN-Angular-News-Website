import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Listing } from '../models/Listing';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = 'http://mnnetworkipia.42web.io/database/fetch-news.php';

  constructor(private http: HttpClient) { }

  getNews(): Observable<Listing[]> {
    return this.http.get<Listing[]>(this.apiUrl);
  }

  getNewsByDate(date: string) {
    return this.http.get<any[]>(`http://mnnetworkipia.42web.io/database/get-news-dates.php?date=${date}`);
  }
}
