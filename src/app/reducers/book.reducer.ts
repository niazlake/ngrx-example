import * as PostActions from '../actions/book.actions';
import {Book} from '../models/book.model';

export type Action = PostActions.All;

const defaultState: Book[] = [];

const updateStatus = (state, newData: Book): Book[] => {
  const listCopy: Book[] = Object.assign([], state);
  return listCopy.filter((item) => {
    if (item.id === newData.id) {
      item.status = newData.status;
    }
    return item;
  });
};

export function bookReducer(state: Book[] = defaultState, action: Action) {

  switch (action.type) {
    case PostActions.UPDATE_SUCCESS:
      return updateStatus(state, action.payload);
    case PostActions.GET_SUCCESS:
      return [...action.payload];
    default:
      return state;
  }
}

