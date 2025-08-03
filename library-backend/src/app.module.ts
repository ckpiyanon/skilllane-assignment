import { AppController } from './app.controller';
import { AuthController } from './controllers/auth.controller';
import { BookController } from './controllers/book.controller';
import { Book } from './entities/book.entity';
import { User } from './entities/user.entity';
import { AuthGuard } from './guards/auth.guard';
import { BookMapper } from './mapper/book.mapper';
import { AuthService } from './services/auth.service';
import { BookService } from './services/book.service';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: parseInt(configService.get<string>('DATABASE_PORT') ?? '5432'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_DBNAME'),
        entities: [Book, User],
        namingStrategy: new SnakeNamingStrategy(),
      }),
    }),
    TypeOrmModule.forFeature([Book, User]),
  ],
  controllers: [AppController, AuthController, BookController],
  providers: [
    AuthService,
    BookService,
    BookMapper,
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
})
export class AppModule {}
