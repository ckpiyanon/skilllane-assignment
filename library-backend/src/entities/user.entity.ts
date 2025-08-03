import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'user_pk' })
  id: number;

  @Column({ type: 'varchar', length: 50 })
  @Index('user_idx_username')
  username: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'timestamptz', default: () => 'NOW()' })
  createdAt: Date;

  @Column({ type: 'timestamptz', default: () => 'NOW()' })
  updatedAt: Date;

  @Column({ type: 'timestamptz', nullable: true })
  deletedAt?: Date;
}
