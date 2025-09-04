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

  getActiveTerm(): Observable<Term> {
    return this.http.get<Term>((`${this.apiUrl}/get-active-term`));
  }

  setActiveTerm(term: Term): Observable<Term> {
    return this.http.put<Term>((`${this.apiUrl}/set-active/${term.id}`), null);
  }

  deleteTerm(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete-term/${id}`);
  }

  saveTerm(term: Term): Observable<Term> {
    if (term.id)
      // if term has an id, it's an update
      return this.http.put<Term>(`${this.apiUrl}/update-term/${term.id}`, term);
    else
      // if not, it's a new term
    return this.http.post<Term>(`${this.apiUrl}/create-term`, term);
  }

}
