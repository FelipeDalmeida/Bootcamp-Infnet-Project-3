import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { loginCredentialsDto } from './dto/login-credentials.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { EmailService } from 'src/email/email.service';
import { User } from 'src/user/user.entity';
import { VerifyEmailDto } from './dto/verify-email.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly emailService: EmailService
    ) { }
    async login(loginCredentialsDto: loginCredentialsDto) {

        const user = await this.userService.findByEmail(loginCredentialsDto.email)

        if (user?.id === undefined) {
            throw new UnauthorizedException();
        }

        if (await user?.comparePassword(loginCredentialsDto.password)) {
            const payload = { id: user.id, email: user.email };
            const accessToken = await this.jwtService.signAsync(payload)
            return {
                accessToken,
                user: {
                    id: user.id,
                    email: user.email,
                    nome: user.nome,
                    isEmailVerified:user.isEmailVerified
                }
            }

        } else {
            throw new UnauthorizedException();
        }

    }

    async createAcount(createuserDto: CreateUserDto) {
        const verificaEmail = await this.userService.findByEmail(createuserDto.email)
        if (verificaEmail) {
            throw new BadRequestException({
                errors: {
                    email: "Email já cadastrado."
                },
                success: false
            })
        }

        const user = await this.userService.create(createuserDto);
        const { accessToken } = await this.login({
            email: createuserDto.email,
            password: createuserDto.password,
        })


        await this.reqEmailVerificationCode(user.id);

        return {
            user,
            accessToken,
            success: true
        }
    }

    async reqEmailVerificationCode(userId: number) {
        const user = await this.userService.findById(userId)
        const code = this.generateCode()
        const email = this.emailService.create(user, code)
        const emailStatus = await this.emailService.sendEmail({
            to: user.email,
            subject: `${user.nome} vamos verificar seu e-mail`,
            text: `Seu código de verificação é ${code}`
        })

        return {
            success: emailStatus
        }
    }

    async verifyEmail(verifyEmailDto: VerifyEmailDto) {
        const result = await this.emailService.findByUserIdAndCode(verifyEmailDto.id, verifyEmailDto.code)
        if(result){
            await this.userService.setEmailVerified(verifyEmailDto.id)
            return{
                success:true
            }
        } else {
            return{
                success:false
            } 
        }
    }

    private generateCode() {
        return (Math.floor(Math.random() * 900000) + 100000).toString()
    }
}
