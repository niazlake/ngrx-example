import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {Book, StatusType} from './models/book.model';
import * as PostActions from './actions/book.actions';
import {AppState} from './store/app.store';
import {selectBook} from './selectors/status.selector';


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
    this.store.dispatch(new PostActions.UpdateBookRead(book, true));
  }

  markAsFavorite(book: Book) {
    this.store.dispatch(new PostActions.UpdateBookStatus(book, StatusType.FAVORITE));
  }

  markAsUnread(book: Book) {
    this.store.dispatch(new PostActions.UpdateBookRead(book, false));
  }

  onlyArchive() {
    this.BooksView$ = this.store.pipe(select(selectBook(StatusType.ARCHIVE, true)));
  }

  onlyRead() {
    this.BooksView$ = this.store.pipe(select(selectBook(StatusType.FAVORITE, true)));
  }

  onlyNoRead() {
    this.BooksView$ = this.store.pipe(select(selectBook(StatusType.ARCHIVE, false)));
  }

  onlyFavorite() {
    this.BooksView$ = this.store.pipe(select(selectBook(StatusType.FAVORITE, true)));
  }

  getAll() {
    this.BooksView$ = this.store.select('books');
  }

  ngOnInit() {
    this.store.dispatch(new PostActions.GetBooks());
  }

}
