import {createSelector} from '@ngrx/store';
import {Book, StatusType} from '../models/book.model';
import {BookState} from '../store/app.store';

export const selectBooks = (state: BookState) => state.books;

export const selectBook = (statusBook: StatusType | null, isRead: boolean | null) => createSelector(
  selectBooks,
  (allBooks: Book[]) => {
    const filteredRead = (): Book[] => {
      if (isRead === null) {
        return allBooks;
      } else {
        return allBooks.filter(book => {
          return book.read === isRead;
        });
      }
    };
    const filteredStatus = (): Book[] => {
      if (statusBook === null) {
        return allBooks;
      } else {
        return allBooks.filter(book => {
            return book.status === statusBook;
          }
        );
      }
    };
    return filteredStatus().filter(bookStatus => filteredRead().includes(bookStatus));
  });

export const selectCount = () => createSelector(
  selectBooks,
  (allBooks: Book[]) => {
    return {
      archive: allBooks.filter(book => book.status === StatusType.ARCHIVE).length,
      favorite: allBooks.filter(book => book.status === StatusType.FAVORITE).length,
      read: allBooks.filter(book => book.read === true).length,
      unread: allBooks.filter(book => book.read === false).length
    };
  }
);
