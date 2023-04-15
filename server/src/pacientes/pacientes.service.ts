import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { Paciente } from './entities/paciente.entity';
import { EntityRepository } from '@mikro-orm/mysql';
import { wrap } from '@mikro-orm/core';


@Injectable()
export class PacientesService {

  constructor(
    @InjectRepository(Paciente)
    private readonly pacienteRepository: EntityRepository<Paciente>,
  ) {}

  async create(createPacienteDto: CreatePacienteDto) {
    const paciente = this.pacienteRepository.create(createPacienteDto);
    await this.pacienteRepository.flush();
    return paciente
  }

  findAll() {
    return this.pacienteRepository.findAll();
  }

  findOne(id: number) {
    return this.pacienteRepository.findOne(id);
  }

  async update(id: number, updatePacienteDto: UpdatePacienteDto) {
    const paciente=await this.pacienteRepository.findOne(id);
    wrap(paciente).assign(updatePacienteDto);
    this.pacienteRepository.flush();
    return paciente;
  }

  async remove(id: number) {
    const paciente=await this.pacienteRepository.findOne(id);
    this.pacienteRepository.remove(paciente);
    await this.pacienteRepository.flush();
    return paciente;
  }
}
