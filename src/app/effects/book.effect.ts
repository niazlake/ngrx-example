import {Injectable} from '@angular/core';

import {Effect, Actions, ofType} from '@ngrx/effects';

import * as bookActions from '../actions/book.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {ApiService} from '../services/api.service';
import {of} from 'rxjs';
import {Book} from '../models/book.model';

interface ActionBook {
  payload: Book;
  type: string;
}

@Injectable()
export class BookEffect {
  constructor(private actions$: Actions, private api: ApiService) {
  }

  @Effect()
  loadBooks$ = this.actions$.pipe(
    ofType(bookActions.GET),
    switchMap(() => {
        return this.api.getBooks().pipe(
          map(books => new bookActions.GetBookSuccess(books)),
          catchError(error => of(new bookActions.GetBooksFail(error))));
      }
    ));

  @Effect()
  updateBooks$ = this.actions$.pipe(
    ofType(bookActions.UPDATE),
    switchMap((action: ActionBook) => {
        return this.api.updateBook(action.payload.id, action.payload).pipe(
          map((book: Book) => new bookActions.UpdateBookSuccess(book)),
          catchError(err => of(new bookActions.UpdateBookFail(err)))
        );
      }
    )
  );

}
