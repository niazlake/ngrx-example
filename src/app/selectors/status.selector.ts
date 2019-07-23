import {createSelector} from '@ngrx/store';
import {Book, StatusType} from '../models/book.model';
import {AppState} from '../app.component';


export const selectBooks = (state: AppState) => state.books;

export const selectBook = (statusType1: StatusType) => createSelector(
  selectBooks,
  (allBooks: Book[]) => {
    if (allBooks) {
      return allBooks.filter((book: Book) => {
        console.log(book, 'HERE', statusType1);
      });
    } else {
      return allBooks;
    }
  });
