import * as formData from 'form-data';
import Mailgun from 'mailgun.js';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Email } from './email.entity';
import { EntityRepository } from '@mikro-orm/mysql';
import { User } from 'src/user/user.entity';

@Injectable()
export class EmailService {

    constructor(
        @InjectRepository(Email)
        private readonly emailRepository: EntityRepository<Email>
    ) {
        this.mailgun = new Mailgun(formData);
        this.mailgunClient = this.mailgun.client({
            username: 'api',
            key: process.env.MAILGUN_API_KEY
        });
    }

    private readonly mailgun: Mailgun
    private readonly mailgunClient: ReturnType<Mailgun['client']>

    async sendEmail({ to, text, subject }: { to: string, text: string, subject: string }) {
        try {
            const response = await this.mailgunClient.messages.create('sandboxcd620ade0cdd4f8e9797dc695cc2db02.mailgun.org', {
                from: "Sistema de Cadastro de Pacientes <mailgun@sandboxcd620ade0cdd4f8e9797dc695cc2db02.mailgun.org>",
                to: [to],
                subject,
                text
            })

            return true
        } catch (error) {
            return false
        }

    }


    async create(user: User, code: string) {
        const email = new Email();
        email.user = user;
        email.code = code;
        await this.emailRepository.persistAndFlush(email)
        return email;
    }

    async findByUserIdAndCode(userId: number, code: string) {
        return this.emailRepository.findOne({
            code,
            user: userId
        })
    }


}
