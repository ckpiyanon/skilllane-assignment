import { Footer } from '../components/footer.component';
import { useAuth } from '../hooks/use-auth.hook';
import { bookQueryClient } from '../query-client';
import { bookService } from '../services/book.service';
import { useQuery } from '@tanstack/react-query';
import type React from 'react';
import { useState } from 'react';

export const ListBooksPage: React.FC = () => {
  useAuth('login');
  const [keyword, setKeyword] = useState<string>();
  const { data } = useQuery(
    {
      queryKey: [keyword],
      queryFn: () => bookService.listBooks(keyword),
    },
    bookQueryClient,
  );

  return (
    <>
      <label htmlFor='keyword'>Search: </label>
      <input
        id='keyword'
        name='keyword'
        onChange={(e) => setKeyword(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <td>Title</td>
            <td>Author</td>
            <td>ISBN</td>
            <td>Year</td>
          </tr>
        </thead>
        <tbody>
          {data?.map((book) => (
            <tr key={book.id}>
              <td>
                <a href={`/books/${book.id}`}>{book.title}</a>
              </td>
              <td>{book.author}</td>
              <td>{book.isbn}</td>
              <td>{book.publicationYear}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p />
      <Footer />
    </>
  );
};
