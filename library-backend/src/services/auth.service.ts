import { User } from '../entities/user.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import type { Cache } from 'cache-manager';
import { nanoid } from 'nanoid';
import { Repository } from 'typeorm';

const BCRYPT_COST = 10;
const TOKEN_TTL = 15 * 60 * 1000; // 15 minutes

@Injectable()
export class AuthService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async register(username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, BCRYPT_COST);
    await this.userRepository.save(
      this.userRepository.create({ username, password: hashedPassword }),
    );
  }

  async login(username: string, password: string) {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new UnauthorizedException();
    }
    const compareResult = await bcrypt.compare(password, user.password);
    if (!compareResult) {
      throw new UnauthorizedException();
    }
    const token = nanoid();
    await this.cacheManager.set(`atk:${token}`, user.id, TOKEN_TTL);
    return token;
  }

  async logout(token: string) {
    await this.cacheManager.del(`atk:${token}`);
  }

  async getUserId(token: string) {
    return this.cacheManager.get<number>(`atk:${token}`);
  }

  async getUserInfo(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`user with id ${userId} not found`);
    }
    return user;
  }
}
