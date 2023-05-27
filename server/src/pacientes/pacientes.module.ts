import { MikroOrmModule} from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { PacientesService } from './pacientes.service';
import { PacientesController } from './pacientes.controller';
import { Paciente } from './paciente.entity';
import { Compcorp } from '../exames/compcorp/compcorp.entity';
import { Avantropometrica } from 'src/exames/avantropometrica/avantropometrica.entity';
import { User } from 'src/user/user.entity';

@Module({
  imports:[MikroOrmModule.forFeature([Paciente,Compcorp,Avantropometrica,User])],
  controllers: [PacientesController],
  providers: [PacientesService]
})
export class PacientesModule {}
