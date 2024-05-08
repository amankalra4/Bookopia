export type OperationType = "lend" | "borrow";

export interface IBooksList {
  id: number;
  title: string;
  author: string;
  condition: string;
  genre: string[];
  availability: boolean;
  operationType: OperationType;
  provider: Provider;
}

export interface Provider {
  name: string | null;
  email: string | null;
}
