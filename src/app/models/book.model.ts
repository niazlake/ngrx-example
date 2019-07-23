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
