export interface Message {
  id: string;
  author: string;
  message: string;
  date: string;
}

export interface MessageWithoutId {
  author: string;
  message: string;
}
