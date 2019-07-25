import {Injectable} from '@angular/core';
import {Effect, Actions, ofType} from '@ngrx/effects';
import * as bookActions from '../actions/book.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {ApiService} from '../services/api.service';
import {of} from 'rxjs';
import {Book, BookReadChange, BookStatusChange} from '../models/book.model';


@Injectable()
export class BookEffect {

  constructor(private actions$: Actions, private api: ApiService) {
  }

  @Effect()
  loadBooks$ = this.actions$.pipe(
    ofType(bookActions.GET),
    switchMap(() => {
        return this.api.getBooks$().pipe(
          map(books => new bookActions.GetBookSuccess(books)),
          catchError(error => of(new bookActions.GetBooksFail(error))));
      }
    )
  );

  @Effect()
  updateBookStatus$ = this.actions$.pipe(
    ofType(bookActions.UPDATE_STATUS),
    switchMap((action: BookStatusChange) => {
        return this.api.updateBook$(action.payload.id, action.payload).pipe(
          map((book: Book) => new bookActions.UpdateBookStatusSuccess(book, action.status)),
          catchError(err => of(new bookActions.UpdateBookStatusFail(err))));
      }
    )
  );

  @Effect()
  updateBookRead$ = this.actions$.pipe(
    ofType(bookActions.UPDATE_READ),
    switchMap((action: BookReadChange) => {
        return this.api.updateBook$(action.payload.id, action.payload).pipe(
          map((book: Book) => new bookActions.UpdateBookReadSuccess(book, action.isRead)),
          catchError(err => of(new bookActions.UpdateBookReadFail(err))));
      }
    )
  );

}
