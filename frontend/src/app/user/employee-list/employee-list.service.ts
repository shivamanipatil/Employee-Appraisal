import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeListService {

  private _subordinateUrl = "http://localhost:3000/api/subordinates"
  constructor(private http: HttpClient) { }
  
  getSubordinates() {
    return this.http.get<any>(this._subordinateUrl)
  }
}
