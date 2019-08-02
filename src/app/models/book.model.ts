export interface Book {
  title: string;
  read: boolean;
  status: StatusType;
  id: number;
}

export enum StatusType {
  ARCHIVE = 'Archive',
  FAVORITE = 'Favorite'
}

export interface BookStatusChange {
  payload: Book;
  status: StatusType;
  type: string;
}

export interface BookReadChange {
  payload: Book;
  read: boolean;
  type: string;
}

export interface BookCount {
  readCount: number;
  unreadCount: number;
  archiveCount: number;
  favoriteCount: number;
  allCount: number;
}
