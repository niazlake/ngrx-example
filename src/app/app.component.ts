import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {Book} from './models/book.model';
import * as PostActions from './actions/book.actions';
import {selectBook} from './selectors/status.selector';
import {Status} from './services/api.service';

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
  ReadCount$: Observable<Book[]> = this.store.pipe(select(selectBook(Status.READ)));
  ArchiveCount$: Observable<Book[]> = this.store.pipe(select(selectBook(Status.ARCHIVE)));
  FavoriteCount$: Observable<Book[]> = this.store.pipe(select(selectBook(Status.FAVORITE)));
  NoReadCount$: Observable<Book[]> = this.store.pipe(select(selectBook(Status.NOREAD)));
  all$: Observable<Book[]> = this.store.select('books');

  static changeStatus(book: Book, id: number): Book {
    const newBook = Object.assign({}, book);
    switch (id) {
      case 0:
        newBook.status = {
          id: 0,
          name: 'Не прочитнное'
        };
        return newBook;
      case 1:
        newBook.status = {
          id: 1,
          name: 'В архиве'
        };
        return newBook;
      case 2:
        newBook.status = {
          id: 2,
          name: 'Прочитанные'
        };
        return newBook;
      case 3:
        newBook.status = {
          id: 3,
          name: 'Избранное'
        };
        return newBook;
      default:
        return newBook;
    }
  }


  archiveBook(value: Book) {
    this.store.dispatch(new PostActions.UpadteBook(
      AppComponent.changeStatus(value, Status.ARCHIVE)));
  }


  readBook(value: Book) {
    this.store.dispatch(new PostActions.UpadteBook(
      AppComponent.changeStatus(value, Status.READ)
    ));
  }

  favoriteBook(value: Book) {
    this.store.dispatch(new PostActions.UpadteBook(
      AppComponent.changeStatus(value, Status.FAVORITE)));
  }

  noReadBook(value: Book) {
    this.store.dispatch(new PostActions.UpadteBook(
      AppComponent.changeStatus(value, Status.NOREAD)));
  }

  onlyArchive() {
    this.BooksView$ = this.store.pipe(select(selectBook(Status.ARCHIVE)));
  }

  onlyRead() {
    this.BooksView$ = this.store.pipe(select(selectBook(Status.READ)));
  }

  onlyNoRead() {
    this.BooksView$ = this.store.pipe(select(selectBook(Status.NOREAD)));
  }

  onlyFavorite() {
    this.BooksView$ = this.store.pipe(select(selectBook(Status.FAVORITE)));
  }

  getAll() {
    this.BooksView$ = this.store.select('books');
  }

  ngOnInit() {
    this.store.dispatch(new PostActions.GetBooks());
  }

}
