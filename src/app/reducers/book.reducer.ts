import * as PostActions from '../actions/book.actions';
import {Book, StatusType} from '../models/book.model';

export type Action = PostActions.All;

const defaultState: Book[] = [];

const updateStatus = (state: Book[], changeBook: Book, statusIn: StatusType): Book[] => {
  return state.map((item) => {
    if (item.id === changeBook.id) {
      return {
        ...item,
        status: statusIn
      };
    }
    return item;
  });
};


const updateRead = (state: Book[], changeBook: Book, isRead: boolean): Book[] => {
  return state.map((item) => {
    if (item.id === changeBook.id) {
      return {
        ...item,
        read: isRead
      };
    }
    return item;
  });
};

export function bookReducer(state: Book[] = defaultState, action: Action) {
  switch (action.type) {
    case PostActions.UPDATE_STATUS_SUCCESS:
      return updateStatus(state, action.payload, action.status);
    case PostActions.GET_SUCCESS:
      return [...action.payload];
    case PostActions.UPDATE_READ_SUCCESS:
      return updateRead(state, action.payload, action.isRead);
    default:
      return state;
  }
}

