import { Controller, Post, Body, HttpCode, HttpStatus, Get, UseGuards, Req } from '@nestjs/common';
import { loginCredentialsDto } from './dto/login-credentials.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthGuard } from './auth.guard';
import { verify } from 'crypto';
import { VerifyEmailDto } from './dto/verify-email.dto';


@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() loginCredentialsDto: loginCredentialsDto) {
        return this.authService.login(loginCredentialsDto);
    }

    @Post('register')
    createAccount(@Body() createUserDto:CreateUserDto){
        return this.authService.createAcount(createUserDto)
    }

    @UseGuards(AuthGuard)
    @Post('email-verification-code')
    async reqEmailVerificationCode(@Body() id:number){
        console.log("userId",id)
        return await this.authService.reqEmailVerificationCode(id);

    }

    @UseGuards(AuthGuard)
    @Post('verify-email')
    verifyEmail(@Body() VerifyEmailDto){
        return this.authService.verifyEmail(VerifyEmailDto);
    }

}
