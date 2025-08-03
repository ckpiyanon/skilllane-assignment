import { Book } from './entities/book.entity';
import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) {}

  @Get('health-check')
  getHealthCheck() {
    return { status: 'OK' };
  }

  @Get('test')
  getTest() {
    return this.bookRepository.find();
  }
}
