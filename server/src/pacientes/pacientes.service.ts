import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { Paciente } from './entities/paciente.entity';
import { EntityRepository } from '@mikro-orm/mysql';


@Injectable()
export class PacientesService {

  constructor(
    @InjectRepository(Paciente)
    private readonly pacienteRepository: EntityRepository<Paciente>,
  ) {}

  create(createPacienteDto: CreatePacienteDto) {
    return 'This action adds a new paciente';
  }

  findAll() {
    return this.pacienteRepository.findAll();
  }

  findOne(id: number) {
    return this.pacienteRepository.findOne(+id);
  }

  update(id: number, updatePacienteDto: UpdatePacienteDto) {
    return `This action updates a #${id} paciente`;
  }

  remove(id: number) {
    return `This action removes a #${id} paciente`;
  }
}
