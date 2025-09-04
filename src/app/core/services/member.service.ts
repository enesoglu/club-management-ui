import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ClubMember } from '../models/club-member.model';
import {Position, Team} from '../models/position.model';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private apiUrl = 'http://localhost:8080/api/members';     // backend api

  constructor(private http: HttpClient) { }

  getMembers(): Observable<ClubMember[]> {
    return this.http.get<ClubMember[]>(this.apiUrl);
  }

  getMemberById(id: number): Observable<ClubMember> {
    return this.http.get<ClubMember>(`${this.apiUrl}/findById/${id}`);
  }

  deleteMember(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteById/${id}`)
  }

  saveMember(member: ClubMember): Observable<ClubMember> {
    if (member.id)
      // if member has an id, it is an update
      return this.http.put<ClubMember>(`${this.apiUrl}/updateById/${member.id}`, member)
    else
      // if not, it is a new member
      return this.http.post<ClubMember>(this.apiUrl, member)
  }


  /*  ----  helper methods ---- */
  findActivePosition(member: ClubMember): Position | undefined {
    if (!member.positions || member.positions.length === 0) {
      return undefined;
    }
    return member.positions.find(p => p.active == true);
  }

  getActivePositionTeam(member: ClubMember): Team | undefined {
    const activePosition = this.findActivePosition(member);

    return activePosition?.team;
  }

  getActivePositionString(member: ClubMember): string {
    const activePosition = this.findActivePosition(member);

    if (!activePosition) {
      return "no active position";
    }
    switch (activePosition.team) {

      case Team.EXECUTIVE:
        return `${activePosition.team} (${activePosition.executiveTitle})`;

      case Team.CREW:
        return `${activePosition.team} (${activePosition.crewCommittee})`;

      default:
        return activePosition.team;
    }
  }
}

