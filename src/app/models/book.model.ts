export interface Book {
  title: string;
  status: StatusType;
  id: number;
}

export interface StatusType {
  id: number;
  name: string;
}
