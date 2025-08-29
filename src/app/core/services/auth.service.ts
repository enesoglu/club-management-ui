import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/members';     // backend api

  constructor(private http: HttpClient) { }

  login(credentials: any){
    return this.http.get(`${this.apiUrl}/findByEmail/${credentials.email}`)
  }

  saveUser(credentials: any){
    localStorage.setItem('user', JSON.stringify(credentials));
  }

  getUser(){
    return localStorage.getItem('user');
  }

  logout(){
    localStorage.removeItem('user');
  }

  isLoggedIn(){
    return !!localStorage.getItem('user');
  }

  getAuthToken(): string | null {
    const userString = localStorage.getItem('user');
    if (!userString) {
      return null;
    }

    const user = JSON.parse(userString);

    if (user && user.email && user.password) {
      return 'Basic ' + btoa(user.email + ':' + user.password);
    }
    return null;
  }
}
