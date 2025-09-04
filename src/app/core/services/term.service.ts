import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Term} from '../models/term.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TermService {

  private apiUrl = 'http://localhost:8080/api/terms';

  constructor(private http: HttpClient) {}

  getTerms(): Observable<Term[]> {
    return this.http.get<Term[]>(this.apiUrl);
  }

}
