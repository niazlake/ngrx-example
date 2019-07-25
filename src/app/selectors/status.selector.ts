import {createSelector} from '@ngrx/store';
import {Book, StatusType} from '../models/book.model';
import {AppState} from '../store/app.store';

export const selectBooks = (state: AppState) => state.books;

export const selectBook = (statusBook: StatusType | null, isRead: boolean | null) => createSelector(
  selectBooks,
  (allBooks: Book[]) => {
    const filteredRead = (): Book[] => {
      if (isRead === null) {
        return allBooks;
      } else {
        return allBooks.filter(data => {
          return data.read === isRead;
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
    return filteredStatus().concat(filteredRead()).reduce(
      (resultBooks, book, indexOfBook, bookCollection) => {
        if (bookCollection.indexOf(book) !== indexOfBook) {
          resultBooks.push(book);
        }
        return resultBooks;
      }, []);
  })
;
