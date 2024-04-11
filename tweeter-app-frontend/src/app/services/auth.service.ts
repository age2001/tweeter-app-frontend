import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private AUTH_URL = 'http://localhost:9000/api/v1.0/auth';

  constructor(private http: HttpClient) { }

  register(data: any): Observable<any> {
    return this.http.post(`${this.AUTH_URL}/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.AUTH_URL}/login`, data);
  }

  logout() {
    localStorage.clear();
  }

  getToken(): boolean {
    return localStorage.getItem('token') !== null;
  }
}
