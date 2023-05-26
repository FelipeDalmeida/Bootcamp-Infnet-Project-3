import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from 'src/user/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { authConstants } from './auth.constants';
import { EmailService } from 'src/email/email.service';
import { Email } from 'src/email/email.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
  providers: [
    AuthService,
    UserService,
    EmailService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [AuthController],
  imports: [
    MikroOrmModule.forFeature([User, Email]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1y' },
    }),],
  exports: [AuthService],
})
export class AuthModule { }
