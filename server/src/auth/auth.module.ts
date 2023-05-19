import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from 'src/user/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { authConstants } from './auth.constants';


@Module({
  providers: [AuthService,UserService],
  controllers: [AuthController],
  imports:[
    MikroOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1y' },
    }),],
    exports:[AuthService],
})
export class AuthModule {}
