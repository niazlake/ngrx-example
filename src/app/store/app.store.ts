import {Book} from '../models/book.model';
import {bookReducer} from '../reducers/book.reducer';

export interface BookState {
  books: Book[];
}

export const RootBook = {
  books: bookReducer
};
