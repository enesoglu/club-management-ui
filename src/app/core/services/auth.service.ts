import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ClubMember } from '../models/club-member.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/members';     // backend api

  constructor(private http: HttpClient) {
    let user = localStorage.getItem("currentUser")

    if (user){
      this.currentUserSubject.next(JSON.parse(user))
    }
  }

  private currentUserSubject = new BehaviorSubject<ClubMember | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  login(credentials: any){
    const headers = new HttpHeaders({
    'Authorization': 'Basic ' + btoa(credentials.email + ':' + credentials.password)
  });

    // if login is successful interfere with tap, fetch and store currentUser
    return this.http.get<ClubMember>(`${this.apiUrl}/findByEmail/${credentials.email}`, {headers: headers}).pipe(
      tap(user => {
        // send coming data to BehaviorSubject
        this.currentUserSubject.next(user);

        // save the token
        const authToken = 'Basic ' + btoa(credentials.email + ':' + credentials.password);
        this.saveAuthToken(authToken);
        localStorage.setItem('currentUser', JSON.stringify(user));
      })
    );
  }

  public get currentUserValue(): ClubMember | null {
    return this.currentUserSubject.value;
  }

  logout(){
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(){
    return !!localStorage.getItem('authToken');
  }

  saveAuthToken(token: string){
    localStorage.setItem('authToken', token);
  }

  getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }
}
