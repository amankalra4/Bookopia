import { OperationType } from "../../Pages/BookListing.tsx/interface";

export interface SearchResponse {
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
  name: null;
  email: string;
  location: null;
}
