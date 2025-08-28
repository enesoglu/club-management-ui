import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/members';     // backend api

  constructor(private http: HttpClient) { }

  login(credentials: any){
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(credentials.email + ':' + credentials.password)
    });
    return this.http.get(`${this.apiUrl}/findByEmail/${credentials.email}`, {headers: headers})
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

}
