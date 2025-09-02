import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CrewCommittee, ExecutiveTitle, Position, Team} from '../models/position.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  private apiUrl = 'http://localhost:8080/api/members';     // backend api

  constructor(private http: HttpClient) {
  }

  addPositionToMember(memberId: number,  position: { team: Team, executiveTitle?: ExecutiveTitle, crewCommittee?: CrewCommittee }) :Observable<Position> {
    return this.http.post<Position>(`${this.apiUrl}/${memberId}/set-position`, position);
  }

  getPositions(memberId: number){
    return this.http.get<Position[]>(`${this.apiUrl}/${memberId}/get-position`);
  }

  getActivePosition(memberId: number){
    return this.http.get<Position>(`${this.apiUrl}/${memberId}/get-active-position`);
  }

  deletePosition(positionId: number){
    return this.http.delete<Position>(`${this.apiUrl}/delete-position/${positionId}`);
  }
}
