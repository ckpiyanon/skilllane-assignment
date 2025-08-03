import { UserResponse } from '../dtos/responses/user.response';
import { User } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserMapper {
  toUserResponse(user: User): UserResponse {
    return {
      username: user.username,
    };
  }
}
