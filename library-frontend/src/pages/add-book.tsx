import { bookService } from '../services/book.service';
import { useForm } from '@tanstack/react-form';
import type React from 'react';
import { useState } from 'react';

const toBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result!.toString().split(',')[1]);
    reader.onerror = reject;
  });

export const AddBookPage: React.FC = () => {
  const [file, setFile] = useState<File>();

  const { handleSubmit, Field } = useForm({
    defaultValues: {
      title: '',
      author: '',
      isbn: '',
      publicationYear: '',
      quantity: '',
    },
    onSubmit: async ({ value }) => {
      bookService
        .createBook({
          title: value.title,
          author: value.author,
          isbn: value.isbn,
          publicationYear: parseInt(value.publicationYear),
          quantity: parseInt(value.quantity),
          coverImage: await toBase64(file!),
          coverImageFileType: file!.name.split('.')[1],
        })
        .then(() => {
          window.alert('Book added successfully');
          window.location.href = '/books';
        })
        .catch(() => {
          window.alert('Cannot add book');
        });
    },
  });

  return (
    <div>
      <h1>Add a book</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleSubmit();
        }}
      >
        <Field name='title'>
          {(field) => (
            <>
              <label htmlFor={field.name}>Title: </label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </>
          )}
        </Field>
        <p />
        <Field name='author'>
          {(field) => (
            <>
              <label htmlFor={field.name}>Author: </label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </>
          )}
        </Field>
        <p />
        <Field name='publicationYear'>
          {(field) => (
            <>
              <label htmlFor={field.name}>Publication Year: </label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </>
          )}
        </Field>
        <p />
        <Field name='isbn'>
          {(field) => (
            <>
              <label htmlFor={field.name}>ISBN: </label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </>
          )}
        </Field>
        <p />
        <Field name='quantity'>
          {(field) => (
            <>
              <label htmlFor={field.name}>Quantity: </label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </>
          )}
        </Field>
        <p />
        <input type='file' onChange={(e) => setFile(e.target!.files![0])} />
        <p />
        <button type='submit'>Add Book</button>
      </form>
    </div>
  );
};
