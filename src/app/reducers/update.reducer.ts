import * as PostActions from '../actions/update.actions';
import {Book} from '../models/post.model';

export type Action = PostActions.All;

const defaultState: Book[] = [
  {
    id: 0,
    status:
      {
        id: 0,
        name: 'Не прочитано'
      },
    title: 'Как перестать храпеть'
  },
  {
    id: 2,
    status:
      {
        id: 0,
        name: 'Не прочитано'
      },
    title: 'херакс'
  },
  {
    id: 3,
    status:
      {
        id: 0,
        name: 'Не прочитано'
      },
    title: 'какая та'
  }];

const newState = (state, newData: Book): Book[] => {
  const listCopy: Book[] = Object.assign([], state);
  return listCopy.filter((item) => {
    if (item.id === newData.id) {
      item.status = newData.status;
    }
    return item;
  });
};

export function updateReducer(state: Book[] = defaultState, action: Action) {

  switch (action.type) {
    case PostActions.UPDATE:
      return newState(state, action.payload);
    default:
      return state;
  }
}
