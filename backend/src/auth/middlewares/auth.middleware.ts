import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { User } from 'src/users/scemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { AuthService } from '../auth.service';

export interface IRequest {
  user: User;
  headers: any;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  async use(req: IRequest, res: Response, next: NextFunction) {
    try {
      const token: string = req.headers['authorization'].split(' ');
      await this.authService
        .verifyJwt(token[1])
        .then(
          async (decodedValidToken) =>
            await this.usersService.findOne(decodedValidToken.user.id),
        )
        .then((user) => {
          if (!user)
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
          req.user = user;
          next();
        });
    } catch (error) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  } 
}
