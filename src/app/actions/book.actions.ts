import {Action} from '@ngrx/store';
import {Book} from '../models/book.model';

export const UPDATE = '[Put] UPDATE_BOOK';
export const UPDATE_SUCCESS = '[Put] UPDATE_BOOK_SUCCESS';
export const UPDATE_FAIL = '[Put] UPDATE_BOOK_FAIL';
export const GET = '[Get] GET_BOOK';
export const GET_SUCCESS = '[Get] GET_BOOK_SUSSES';
export const GET_FAIL = '[Get] GET_BOOK_FAIL';

export class UpdateBook implements Action {

  readonly type = UPDATE;

  constructor(public payload: any) {
  }

}

export class UpdateBookSuccess implements Action {
  readonly type = UPDATE_SUCCESS;

  constructor(public payload: Book) {
  }
}


export class UpdateBookFail implements Action {
  readonly type = UPDATE_FAIL;

  constructor(public payload: any) {
  }
}

export class GetBooks implements Action {
  readonly type = GET;
}

export class GetBookSuccess implements Action {
  readonly type = GET_SUCCESS;

  constructor(public payload: Book[]) {

  }
}

export class GetBooksFail implements Action {
  readonly type = GET_FAIL;

  constructor(public payload: any) {
  }
}

export type All
  = UpdateBook
  | UpdateBookSuccess
  | GetBooksFail
  | GetBookSuccess;
