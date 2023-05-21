import { Controller, Get, Req, UseGuards, Post, UseInterceptors, UploadedFile, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from 'src/user/user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UploadAvatarDto } from './dto/upload-avatar.dto';

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
            id: user.id,
            nome: user.nome,
            email: user.email,
            userPicture:user.userPicture
        };
    }

    @UseGuards(AuthGuard)
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() avatar: Express.Multer.File, @Req() req: Request,) {
        const payload = await req['user'];
        const userId =payload.id;
        return this.userService.uploadProfileAvatar(userId,avatar.buffer)
    }
}
