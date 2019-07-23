import {Action} from '@ngrx/store';
import {Book, StatusType} from '../models/book.model';

export const UPDATE_STATUS = '[Put] UPDATE_BOOK';
export const UPDATE_STATUS_SUCCESS = '[Put] UPDATE_BOOK_SUCCESS';
export const UPDATE_STATUS_FAIL = '[Put] UPDATE_BOOK_FAIL';
export const GET = '[Get] GET_BOOK';
export const GET_SUCCESS = '[Get] GET_BOOK_SUSSES';
export const GET_FAIL = '[Get] GET_BOOK_FAIL';

export class UpdateBookStatus implements Action {

  readonly type = UPDATE_STATUS;

  constructor(public payload: Book, public status: StatusType) {
  }
}

export class UpdateBookStatusSuccess implements Action {
  readonly type = UPDATE_STATUS_SUCCESS;

  constructor(public payload: Book, public status: StatusType) {
  }
}


export class UpdateBookStatusFail implements Action {
  readonly type = UPDATE_STATUS_FAIL;

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

export class UpdateBookIsRead implements Action {
  readonly
}

export class GetBooksFail implements Action {
  readonly type = GET_FAIL;

  constructor(public payload: any) {
  }
}

export type All
  = UpdateBookStatus
  | UpdateBookStatusSuccess
  | GetBooksFail
  | GetBookSuccess;
