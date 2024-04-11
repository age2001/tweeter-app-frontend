import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private BASE_URL = 'http://localhost:9000/api/v1.0/tweets';

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get(`${this.BASE_URL}/all`);
  }

  getUsers() {
    return this.http.get(`${this.BASE_URL}/users/all`);
  }
  
  getPostsByUsername(username: any) {
    return this.http.get(`${this.BASE_URL}/${username}`);
  }

}
