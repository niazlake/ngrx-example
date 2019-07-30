import {createSelector} from '@ngrx/store';
import {Book, BookCount, StatusType} from '../models/book.model';
import {BookState} from '../reducers/book.reducer';

export const selectBooks = (state: BookState) => state.books;

export const selectBook = (statusType: StatusType | null, haveRead: boolean | null) => createSelector(
  selectBooks,
  (allBooks: Book[]): Book[] => {
    const filteredRead = (): Book[] => {
      if (haveRead === null) {
        return allBooks;
      } else {
        return allBooks.filter(book => {
          return book.read === haveRead;
        });
      }
    };
    const filteredStatus = (): Book[] => {
      if (statusType === null) {
        return allBooks;
      } else {
        return allBooks.filter(book => {
            return book.status === statusType;
          }
        );
      }
    };
    return filteredStatus().filter(onlyBookStatus => filteredRead().includes(onlyBookStatus));
  });

export const selectCount = () => createSelector(
  selectBooks,
  (allBooks: Book[]): BookCount => {
    return {
      archiveCount: allBooks.filter(book => book.status === StatusType.ARCHIVE).length,
      favoriteCount: allBooks.filter(book => book.status === StatusType.FAVORITE).length,
      readCount: allBooks.filter(book => book.read === true).length,
      unreadCount: allBooks.filter(book => book.read === false).length,
      allCount: allBooks.length
    };
  }
);
