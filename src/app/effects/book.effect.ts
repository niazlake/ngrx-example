import {Injectable} from '@angular/core';

import {Effect, Actions, ofType} from '@ngrx/effects';

import * as bookActions from '../actions/book.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {ApiService} from '../services/api.service';
import {EMPTY, of} from 'rxjs';

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
}
