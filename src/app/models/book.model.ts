export interface Book {
  title: string;
  read: boolean;
  status: StatusType | null;
  id: number;
}

export enum StatusType {
  ARCHIVE = 'Archive',
  FAVORITE = 'Favorite'
}

export interface BookFilter {
  status: StatusType | null;
  read: boolean | null;
}

export interface BookStatusChange {
  payload: Book;
  status: StatusType | null;
  type: string;
}

export interface BookReadChange {
  payload: Book;
  isRead: boolean;
  type: string;
}
