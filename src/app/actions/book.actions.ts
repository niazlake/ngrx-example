import {Action} from '@ngrx/store';
import {Book} from '../models/book.model';

export const UPDATE = '[Put] UPDATE_BOOK';
export const GET = '[Get] GET_BOOK';
export const GET_SUSSES = '[Get] GET_BOOK_SUSSES';
export const GET_FAIL = '[Get] GET_BOOK_FAIL';

export class UpadteBook implements Action {

  readonly type = UPDATE;

  constructor(public payload: Book) {
  }

}

export class GetBooks implements Action {
  readonly type = GET;
}

export class GetBookSuccess implements Action {
  readonly type = GET_SUSSES;

  constructor(public payload: Book[]) {

  }
}

export class GetBooksFail implements Action {
  readonly type = GET_FAIL;

  constructor(public payload: any) {
  }
}

export type All
  = UpadteBook
  | GetBookSuccess;
