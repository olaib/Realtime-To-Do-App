import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt.guard';
import { JWT_EXPIRATION_TIME } from 'src/utils/constants';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: JWT_EXPIRATION_TIME },
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  exports: [AuthService],
})
export class AuthModule {}
