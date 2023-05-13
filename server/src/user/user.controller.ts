import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) { }

    @UseGuards(AuthGuard)
    @Get('myself')
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
