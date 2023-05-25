import { Controller, Post, Body, HttpCode, HttpStatus, Get, Req } from '@nestjs/common';
import { loginCredentialsDto } from './dto/login-credentials.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Public } from './decorator/public-endpoints';


@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) { }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() loginCredentialsDto: loginCredentialsDto) {
        return this.authService.login(loginCredentialsDto);
    }

    @Public()
    @Post('register')
    createAccount(@Body() createUserDto:CreateUserDto){
        return this.authService.createAcount(createUserDto)
    }


    @Post('email-verification-code')
    async reqEmailVerificationCode(@Req() req: Request){
        const payload = await req['user'];
        const userId =payload.id;
        return await this.authService.reqEmailVerificationCode(userId);

    }


    @Post('verify-email')
    verifyEmail(@Body() VerifyEmailDto){
        return this.authService.verifyEmail(VerifyEmailDto);
    }

}
