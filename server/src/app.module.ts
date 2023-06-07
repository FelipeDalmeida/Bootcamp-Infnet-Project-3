import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { PacientesModule } from './pacientes/pacientes.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ExamesModule } from './exames/exames.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MessageModule } from './message/message.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import * as path from 'path'


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public'),
    }),
    EventEmitterModule.forRoot(),
    MikroOrmModule.forRoot(),
    ConfigModule.forRoot(),
    PacientesModule,
    ExamesModule,
    UserModule,
    AuthModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
