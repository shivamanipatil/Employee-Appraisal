import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManagerListService {
  
  private _managersUrl: string = "http://localhost:3000/api/managers"
  private _addManagerUrl: string = "http://localhost:3000/api/addManager"
  
  constructor(private http: HttpClient) { }
  
  getMangers() {
    return this.http.get<any>(this._managersUrl)
  }
  
  addManager(managerId) {
    return this.http.post<any>(this._addManagerUrl, managerId)
  }
}
