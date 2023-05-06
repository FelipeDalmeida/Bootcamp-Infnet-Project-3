import { Controller, Post, Body, HttpCode, HttpStatus, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { loginCredentialsDto } from './dto/login-credentials.dto';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';


@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() loginCredentialsDto: loginCredentialsDto) {
        return this.authService.login(loginCredentialsDto);
    }

    @UseGuards(AuthGuard)
    @Get('user')
    async user(@Req() request: Request) {
        const payload = await request['user'];
        const user = await this.userService.findById(Number(payload.id));
        return {
            id:user.id,
            nome:user.nome,
            email:user.email
        };
    }

}
