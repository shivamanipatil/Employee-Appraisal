import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReviewListService {

  private _reviewListUrl = "http://localhost:3000/api/reviews"
  constructor(private http: HttpClient) { }
  
  getReviews() {
    return this.http.get<any>(this._reviewListUrl)
  }
  
  deleteReviews(id) {
    return this.http.delete<any>(this._reviewListUrl +'/' +id)
  }
}
