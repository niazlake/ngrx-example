import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {Book, StatusType} from './models/book.model';
import * as PostActions from './actions/book.actions';

export interface AppState {
  books: Book[];
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private store: Store<AppState>) {

  }

  BooksView$: Observable<Book[]> = this.store.select('books');


  markAsArchive(book: Book) {
    this.store.dispatch(new PostActions.UpdateBookStatus(book, StatusType.ARCHIVE));
  }


  markAsRead(book: Book) {
  }

  markAsfavorite(book: Book) {
    this.store.dispatch(new PostActions.UpdateBookStatus(book, StatusType.FAVORITE));
  }

  markAsUnread(book: Book) {
  }

  onlyArchive() {
  }

  onlyRead() {
  }

  onlyNoRead() {
  }

  onlyFavorite() {
  }

  getAll() {
    this.BooksView$ = this.store.select('books');
  }

  ngOnInit() {
    this.store.dispatch(new PostActions.GetBooks());
  }

}
