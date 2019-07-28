import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {Store, select} from '@ngrx/store';
import {Book, BookCount, StatusType} from './models/book.model';
import * as PostActions from './actions/book.actions';
import {switchMap} from 'rxjs/operators';
import {BookState} from './store/app.store';
import {selectBook, selectCount} from './selectors/status.selector';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private store: Store<BookState>) {

  }

  BookRead$ = new BehaviorSubject<boolean | null>(null);
  BookStatus$ = new BehaviorSubject<StatusType | null>(null);
  Books$: Observable<Book[]>;
  BooksCount$: Observable<BookCount>;

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
    this.BookStatus$.next(StatusType.ARCHIVE);
  }

  onlyRead() {
    this.BookRead$.next(true);
  }

  onlyUnRead() {
    this.BookRead$.next(false);
  }

  onlyFavorite() {
    this.BookStatus$.next(StatusType.FAVORITE);
  }

  getAll() {
    this.BookRead$.next(null);
    this.BookStatus$.next(null);
  }

  ngOnInit() {
    this.store.dispatch(new PostActions.GetBooks());
    this.Books$ = combineLatest(this.BookRead$, this.BookStatus$).pipe(switchMap(([read, status]) => {
      return this.store.pipe(select(selectBook(status, read)));
    }));
    this.BooksCount$ = this.store.pipe(select(selectCount()));
  }


}
