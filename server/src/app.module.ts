import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PacientesModule } from './pacientes/pacientes.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ExamesModule } from './exames/exames.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    MikroOrmModule.forRoot(),
    PacientesModule,
    ExamesModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
