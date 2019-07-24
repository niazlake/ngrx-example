import {createSelector} from '@ngrx/store';
import {Book, BookFilter, StatusType} from '../models/book.model';
import {AppState} from '../store/app.store';

export const selectBooks = (state: AppState) => state.books;

export const selectBook = (statusBook: StatusType | null, isRead: boolean | null) => createSelector(
  selectBooks,
  (allBooks: Book[]) => {
    const filter: BookFilter = {
      status: statusBook,
      read: isRead
    };
    return allBooks.filter((book: Book) => {
      for (const key in filter) {
        if (filter[key] !== book[key] && book[key] !== null) {
          return false;
        }
      }
      return true;
    });
  });
