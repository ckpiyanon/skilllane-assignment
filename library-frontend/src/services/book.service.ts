import type { BookResponse } from '../types/book.response';
import type { CreateBookRequest } from '../types/create-book.request';
import axios from 'axios';
import qs from 'qs';

const client = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_HOST,
  withCredentials: true,
});

const listBooks = async (keyword?: string) => {
  const query = qs.stringify({ keyword });
  const { data } = await client.get<BookResponse[]>(`/books?${query}`);
  return data;
};

const getBook = async (bookId: number) => {
  const { data } = await client.get<BookResponse>(`/books/${bookId}`);
  return data;
};

const createBook = async (bookDetails: CreateBookRequest) => {
  const { data } = await client.post<BookResponse>('/books', bookDetails);
  return data;
};

export const bookService = {
  listBooks,
  getBook,
  createBook,
};
