export type UpdateBookRequest = {
  title: string;
  author: string;
  isbn: string;
  publicationYear: number;
  quantity: number;
  coverImage: string; // base64 string
  coverImageFileType: string;
};
