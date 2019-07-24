import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {Book, BookFilter, StatusType} from './models/book.model';
import * as PostActions from './actions/book.actions';
import {AppState} from './store/app.store';
import {selectBook} from './selectors/status.selector';
import {map, tap} from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private store: Store<AppState>) {

  }

  BooksFilter$: Observable<BookFilter>;
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
    this.BooksFilter$.pipe(
      map(value => {
          return {...value, status: StatusType.ARCHIVE};
        }
      )
    );
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
