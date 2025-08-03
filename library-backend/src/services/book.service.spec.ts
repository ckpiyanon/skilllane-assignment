import { Book } from '../entities/book.entity';
import { User } from '../entities/user.entity';
import { BookService } from './book.service';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('BookService Test', () => {
  const mockBookRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
  };
  const mockUserRepository = {
    findOne: jest.fn(),
  };

  let bookRepository: Repository<Book>;
  let userRepository: Repository<User>;

  let bookService: BookService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: getRepositoryToken(Book),
          useValue: mockBookRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();
    bookRepository = module.get(getRepositoryToken(Book));
    userRepository = module.get(getRepositoryToken(User));

    bookService = new BookService(bookRepository, userRepository);
  });

  describe('borrowBook', () => {
    it('SHOULD throw a NotFoundException WHEN the user is not found', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      await expect(bookService.borrowBook(1, 2)).rejects.toEqual(
        new NotFoundException('user with id 2 not found'),
      );

      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { id: 2 },
      });
      expect(mockBookRepository.findOne).not.toHaveBeenCalled();
      expect(mockBookRepository.save).not.toHaveBeenCalled();
    });

    it('SHOULD throw a NotFoundException WHEN the book is not found', async () => {
      mockUserRepository.findOne.mockResolvedValue('user');
      mockBookRepository.findOne.mockResolvedValue(null);

      await expect(bookService.borrowBook(1, 2)).rejects.toEqual(
        new NotFoundException('book with id 1 not found'),
      );

      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { id: 2 },
      });
      expect(mockBookRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(mockBookRepository.save).not.toHaveBeenCalled();
    });

    it('SHOULD throw a ConflictException WHEN the book quantity is less than 1', async () => {
      mockUserRepository.findOne.mockResolvedValue('user');
      mockBookRepository.findOne.mockResolvedValue({
        id: 1,
        quantity: 0,
      });

      await expect(bookService.borrowBook(1, 2)).rejects.toEqual(
        new ConflictException('no book left for borrowing'),
      );

      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { id: 2 },
      });
      expect(mockBookRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(mockBookRepository.save).not.toHaveBeenCalled();
    });

    it('SHOULD update the book quantity WHEN the book quantity is more than 0', async () => {
      mockUserRepository.findOne.mockResolvedValue('user');
      mockBookRepository.findOne.mockResolvedValue({
        id: 1,
        quantity: 1,
      });
      mockBookRepository.save.mockResolvedValue('book');

      await expect(bookService.borrowBook(1, 2)).resolves.toEqual('book');

      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { id: 2 },
      });
      expect(mockBookRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(mockBookRepository.save).toHaveBeenCalledWith({
        id: 1,
        quantity: 0,
      });
    });
  });

  describe('returnBook', () => {
    it('SHOULD throw a NotFoundException WHEN the user is not found', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      await expect(bookService.returnBook(1, 2)).rejects.toEqual(
        new NotFoundException('user with id 2 not found'),
      );

      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { id: 2 },
      });
      expect(mockBookRepository.findOne).not.toHaveBeenCalled();
      expect(mockBookRepository.save).not.toHaveBeenCalled();
    });

    it('SHOULD throw a NotFoundException WHEN the book is not found', async () => {
      mockUserRepository.findOne.mockResolvedValue('user');
      mockBookRepository.findOne.mockResolvedValue(null);

      await expect(bookService.returnBook(1, 2)).rejects.toEqual(
        new NotFoundException('book with id 1 not found'),
      );

      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { id: 2 },
      });
      expect(mockBookRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(mockBookRepository.save).not.toHaveBeenCalled();
    });

    it('SHOULD update the book quantity', async () => {
      mockUserRepository.findOne.mockResolvedValue('user');
      mockBookRepository.findOne.mockResolvedValue({
        id: 1,
        quantity: 1,
      });
      mockBookRepository.save.mockResolvedValue('book');

      await expect(bookService.returnBook(1, 2)).resolves.toEqual('book');

      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { id: 2 },
      });
      expect(mockBookRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(mockBookRepository.save).toHaveBeenCalledWith({
        id: 1,
        quantity: 2,
      });
    });
  });
});
