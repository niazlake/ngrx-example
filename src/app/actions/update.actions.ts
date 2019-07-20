import {Action} from '@ngrx/store';
import {Book} from '../models/post.model';

export const UPDATE = '[Put] UPDATE_BOOK';

export class UpadteBook implements Action {

  readonly type = UPDATE;

  constructor(public payload: Book) {
  }

}

export type All
  =
  | UpadteBook;
