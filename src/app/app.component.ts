import {Component, OnInit} from '@angular/core';
import {combineLatest, Observable, Subject} from 'rxjs';
import {Store, select} from '@ngrx/store';
import {Book, StatusType} from './models/book.model';
import * as PostActions from './actions/book.actions';
import {switchMap} from 'rxjs/operators';
import {BookState} from './store/app.store';
import {selectBook} from './selectors/status.selector';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private store: Store<BookState>) {

  }

  BookRead$ = new Subject<boolean | null>();
  BookStatus$ = new Subject<StatusType | null>();
  Books$: Observable<Book[]> = this.store.select('books');

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
  }

}
