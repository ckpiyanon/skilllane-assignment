export type BookResponse = {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publicationYear: number;
  coverImage?: string; // base64
  quantity: number;
};
