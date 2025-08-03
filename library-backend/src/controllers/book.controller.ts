import { UserId } from '../decorators/user-id.decorator';
import type { CreateBookRequest } from '../dtos/requests/create-book.request';
import type { UpdateBookRequest } from '../dtos/requests/update-book.request';
import { BookMapper } from '../mapper/book.mapper';
import { BookService } from '../services/book.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('books')
export class BookController {
  constructor(
    private readonly bookService: BookService,
    private readonly bookMapper: BookMapper,
  ) {}

  @Post()
  async createBook(@Body() bookDetails: CreateBookRequest) {
    return this.bookService
      .createBook(bookDetails)
      .then((book) => this.bookMapper.toBookResponse(book));
  }

  @Get(':bookId')
  async getBook(@Param('bookId', ParseIntPipe) bookId: number) {
    return this.bookService
      .getBook(bookId)
      .then((book) => this.bookMapper.toBookResponse(book));
  }

  @Patch(':bookId')
  async updateBook(
    @Param('bookId', ParseIntPipe) bookId: number,
    @Body() bookDetails: UpdateBookRequest,
  ) {
    return this.bookService
      .updateBook(bookId, bookDetails)
      .then((book) => this.bookMapper.toBookResponse(book));
  }

  @Get()
  async listBooks(@Query('keyword') keyword?: string) {
    return this.bookService
      .findBook(keyword)
      .then((books) =>
        books.map((book) => this.bookMapper.toBookResponse(book)),
      );
  }

  @HttpCode(HttpStatus.OK)
  @Post(':bookId/borrow')
  async borrowBook(
    @Param('bookId', ParseIntPipe) bookId: number,
    @UserId() userId: number,
  ) {
    return this.bookService
      .borrowBook(bookId, userId)
      .then((book) => this.bookMapper.toBookResponse(book));
  }

  @HttpCode(HttpStatus.OK)
  @Post(':bookId/return')
  async returnBook(
    @Param('bookId', ParseIntPipe) bookId: number,
    @UserId() userId: number,
  ) {
    return this.bookService
      .returnBook(bookId, userId)
      .then((book) => this.bookMapper.toBookResponse(book));
  }
}
