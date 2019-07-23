import {createSelector} from '@ngrx/store';
import {Book, StatusType} from '../models/book.model';
import {AppState} from '../store/app.store';


export const selectBooks = (state: AppState) => state.books;

export const selectBook = (statusBook: StatusType, isReadBook: boolean | null) => createSelector(
  selectBooks,
  (allBooks: Book[]) => {
    const filter = {
      status: statusBook,
      read: isReadBook
    };
    if (allBooks) {
      return allBooks.filter((item: Book) => {
        for (const key in filter) {
          if (item[key] === undefined || item[key] !== filter[key]) {
            return false;
          }
        }
        return true;
      });
    } else {
      return allBooks;
    }
  });
