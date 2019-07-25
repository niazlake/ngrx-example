import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Book} from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getBooks$(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl + '/books');
  }

  updateBook$(statusId: number, book: Book) {
    return this.http.put(this.apiUrl + '/books/' + statusId, book);
  }

}
