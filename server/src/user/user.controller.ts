import { Controller, Get, Req, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from 'src/user/user.service';

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) { }

    @Get('myself')
    async user(@Req() request: Request) {
        const payload = await request['user'];
        const user = await this.userService.findById(Number(payload.id));
        return {
            id: user.id,
            nome: user.nome,
            email: user.email,
            userPicture:user.userPicture
        };
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() avatar: Express.Multer.File, @Req() req: Request,) {
        const payload = await req['user'];
        const userId =payload.id;
        return this.userService.uploadProfileAvatar(userId,avatar.buffer)
    }
}
