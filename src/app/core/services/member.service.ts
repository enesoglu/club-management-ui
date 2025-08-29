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

  deleteMember(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + '/findById/' + id)
  }

  saveMember(member: ClubMember): Observable<ClubMember> {
    return this.http.post<ClubMember>(this.apiUrl, member)
  }

  findActivePosition(member: ClubMember): Position | undefined {
    if (!member.positions || member.positions.length === 0) {
      return undefined;
    }
    return member.positions.find(p => p.isActive);
  }

  getActivePosition(member: ClubMember): Team | undefined {
    const activePosition = this.findActivePosition(member);

    return activePosition?.team;
  }

  // get member's active position
  getActivePositionString(member: ClubMember): string {
    const activePosition = this.findActivePosition(member);

    if (!activePosition) {
      return "no active position";
    }
    switch (activePosition.team) {

      case Team.EXECUTIVE:
        return `${activePosition.team} (${activePosition.executiveTitle})`;

      case Team.CREW:
        return `${activePosition.team} (${activePosition.crewComittee})`;

      default:
        return activePosition.team;
    }
  }
}

