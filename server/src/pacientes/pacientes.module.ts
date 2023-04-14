import { MikroOrmModule} from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { PacientesService } from './pacientes.service';
import { PacientesController } from './pacientes.controller';
import { Paciente } from './entities/paciente.entity';

@Module({
  imports:[MikroOrmModule.forFeature([Paciente])],
  controllers: [PacientesController],
  providers: [PacientesService]
})
export class PacientesModule {}
