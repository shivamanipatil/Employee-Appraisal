import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  
  private _profileUrl = "http://localhost:3000/profile"
  constructor(private http: HttpClient) { }
  
  getProfile() {
    return this.http.get<any>(this._profileUrl)
  }
}
