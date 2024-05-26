import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/scemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, process.env.SALT_OR_ROUNDS || 12445);
  }

  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<Boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
  
  async generateJwt(user: User): Promise<string> {
    return await this.jwtService.signAsync({ user });
  }

  async verifyJwt(jwt: string): Promise<any> {
    return this.jwtService.verifyAsync(jwt);
  }
}
