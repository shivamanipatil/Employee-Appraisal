import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  private _reviewUrl= "http://localhost:3000/api/reviews"
  constructor(private http: HttpClient) { }
  
  postReview(review) {
    return this.http.post<any>(this._reviewUrl, review)
  }
}
