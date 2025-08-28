import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ClubMember } from '../models/club-member.model';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private apiUrl = 'http://localhost:8080/api/members';     // backend api

  constructor(private http: HttpClient) { }

  getMembers(): Observable<ClubMember[]> {
    return this.http.get<ClubMember[]>(this.apiUrl);
  }

  deleteMember(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + '/findById/' + id)
  }

  saveMember(member: ClubMember): Observable<ClubMember> {
    return this.http.post<ClubMember>(this.apiUrl, member)
  }

}

