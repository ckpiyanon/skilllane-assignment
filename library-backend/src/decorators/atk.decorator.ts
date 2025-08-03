/* eslint-disable @typescript-eslint/no-unsafe-return */
import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

export const Atk = createParamDecorator(
  (_data: string, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    return request.cookies?.atk;
  },
);
