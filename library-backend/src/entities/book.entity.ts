import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'books' })
export class Book {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'book_pk' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  author: string;

  @Column({ type: 'varchar', length: 50 })
  @Index('book_idx_isbn')
  isbn: string;

  @Column({ type: 'int' })
  publicationYear: number;

  @Column({ type: 'varchar', length: 50 })
  coverImageFileName: string;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'timestamptz', default: new Date() })
  createdAt: Date;

  @Column({ type: 'timestamptz', default: new Date() })
  updatedAt: Date;

  @Column({ type: 'timestamptz', nullable: true })
  deletedAt?: Date;
}
