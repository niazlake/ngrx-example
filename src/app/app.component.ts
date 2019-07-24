import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {Book, BookFilter, StatusType} from './models/book.model';
import * as PostActions from './actions/book.actions';
import {AppState} from './store/app.store';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private store: Store<AppState>) {

  }

  BooksFilter$ = new BehaviorSubject<BookFilter>({status: null, read: null});
  BooksView$: Observable<Book[]> = this.store.select('books');
  Proposals: BookFilter;

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
    this.BooksFilter$.pipe().subscribe(
      data => {
        return {...data, status: StatusType.ARCHIVE};
      }
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

  updateFilter(statusChange: StatusType | null, isRead: boolean | null) {

  }

  ngOnInit() {
    this.store.dispatch(new PostActions.GetBooks());
  }

}
