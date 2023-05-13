import { Controller, Post, Body, HttpCode, HttpStatus, Get, UseGuards, Req } from '@nestjs/common';
import { loginCredentialsDto } from './dto/login-credentials.dto';
import { AuthService } from './auth.service';


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


}
