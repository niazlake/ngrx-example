import {createSelector} from '@ngrx/store';
import {Book, StatusType} from '../models/book.model';
import {AppState} from '../store/app.store';

export const selectBooks = (state: AppState) => state.books;

export const selectBook = (statusBook: StatusType | null, isReadBook: boolean | null) => createSelector(
  selectBooks,
  (allBooks: Book[]) => {
    const filter = {
      status: statusBook,
      read: isReadBook
    };
    console.log(filter);
    if (allBooks) {
      return allBooks.filter((item: Book) => {
        for (const key in filter) {
          if (filter[key] === null) {
            delete filter[key];
          } else if (filter[key] !== item[key] || item[key] === undefined) {
            return false;
          }
        }
        return true;
      });
    } else {
      return allBooks;
    }
  });
