import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Listing } from '../models/Listing';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = 'http://localhost/database/fetch-news.php';

  constructor(private http: HttpClient) { }

  getNews(): Observable<Listing[]> {
    return this.http.get<Listing[]>(this.apiUrl);
  }
}
