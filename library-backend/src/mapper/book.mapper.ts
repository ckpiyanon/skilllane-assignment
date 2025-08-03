import { Book } from '../entities/book.entity';
import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { BookResponse } from 'src/dtos/responses/book.response';

@Injectable()
export class BookMapper {
  private getFileBase64Content(fileName: string): string {
    const base64 = readFileSync('book-covers/fileName', { encoding: 'base64' });
    return `data:image/${fileName.split('.')[1]};base64,${base64}`;
  }

  toBookResponse(book: Book, includeCoverImage = true): BookResponse {
    return {
      id: book.id,
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      publicationYear: book.publicationYear,
      quantity: book.quantity,
      ...(includeCoverImage && {
        coverImage: this.getFileBase64Content(book.coverImageFileName),
      }),
    };
  }
}
