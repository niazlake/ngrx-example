import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Book} from '../models/book.model';

export enum Status {
  NOREAD = 0,
  ARCHIVE = 1,
  READ = 2,
  FAVORITE = 3
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl + '/books');
  }

  updateBook(id: number, data: Book) {
    return this.http.put(this.apiUrl + '/books/' + id, data);
  }

}
