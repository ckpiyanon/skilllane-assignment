import { CreateBookRequest } from '../dtos/requests/create-book.request';
import { Book } from '../entities/book.entity';
import { User } from '../entities/user.entity';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { writeFileSync } from 'fs';
import { nanoid } from 'nanoid';
import path from 'path';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  private async getAndValidateBook(bookId: number): Promise<Book> {
    const book = await this.bookRepository.findOne({ where: { id: bookId } });
    if (!book) {
      throw new NotFoundException(`book with id ${bookId} not found`);
    }
    return book;
  }

  async createBook(bookDetails: CreateBookRequest): Promise<Book> {
    const coverBase64 = bookDetails.coverImage;
    const fileName = `${nanoid()}.${bookDetails.coverImageFileType}`;
    writeFileSync(
      path.join('book-covers', fileName),
      Buffer.from(coverBase64, 'base64'),
    );
    return this.bookRepository.save(
      this.bookRepository.create({
        ...bookDetails,
        coverImageFileName: fileName,
      }),
    );
  }

  async updateBook(bookId: number, bookDetails: Partial<Book>): Promise<Book> {
    const book = await this.getAndValidateBook(bookId);
    return this.bookRepository.save({
      ...book,
      ...bookDetails,
      updatedAt: new Date(),
    });
  }

  async getBook(bookId: number): Promise<Book> {
    return this.getAndValidateBook(bookId);
  }

  async findBook(keyword?: string): Promise<Book[]> {
    return keyword
      ? this.bookRepository.find({
          where: {
            title: ILike(`%${keyword}%`),
          },
        })
      : this.bookRepository.find();
  }

  async borrowBook(bookId: number, userId: number): Promise<Book> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`user with id ${userId} not found`);
    }
    const book = await this.getAndValidateBook(bookId);
    if (book.quantity < 1) {
      throw new ConflictException('no book left for borrowing');
    }
    return this.bookRepository.save({ ...book, quantity: book.quantity - 1 });
  }

  async returnBook(bookId: number, userId: number): Promise<Book> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`user with id ${userId} not found`);
    }
    const book = await this.getAndValidateBook(bookId);
    return this.bookRepository.save({ ...book, quantity: book.quantity + 1 });
  }
}
