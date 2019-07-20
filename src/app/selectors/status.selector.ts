import {createSelector} from '@ngrx/store';
import {Book} from '../models/post.model';
import {AppState} from '../app.component';


export const selectBooks = (state: AppState) => state.update;

export const selectBook = (id: number) => createSelector(
  selectBooks,
  (allBooks: Book[]) => {
    if (allBooks) {
      return allBooks.filter((book: Book) => book.status.id === id);
    } else {
      return allBooks;
    }
  });
