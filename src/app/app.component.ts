import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Store, select} from '@ngrx/store';
import {Book, BookFilter, StatusType} from './models/book.model';
import * as PostActions from './actions/book.actions';
import {BookState} from './store/app.store';
import {selectBook} from './selectors/status.selector';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(private store: Store<BookState>) {

  }

  BooksFilter$ = new BehaviorSubject<BookFilter>({status: null, read: null});
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
    this.BooksFilter$.next({...this.BooksFilter$.value, status: StatusType.ARCHIVE});
  }

  onlyRead() {
    this.BooksFilter$.next({...this.BooksFilter$.value, read: true});
  }

  onlyUnRead() {
    this.BooksFilter$.next({...this.BooksFilter$.value, read: false});
  }

  onlyFavorite() {
    this.BooksFilter$.next({...this.BooksFilter$.value, status: StatusType.FAVORITE});
  }

  getAll() {
    this.BooksFilter$.next({status: null, read: null});
  }

  ngOnInit() {
    this.store.dispatch(new PostActions.GetBooks());
    this.BooksFilter$.subscribe(data => {
      this.BooksView$ = this.store.pipe(select(selectBook(data.status, data.read)));
    });
  }

  ngOnDestroy() {
    this.BooksFilter$.unsubscribe();
  }

}
