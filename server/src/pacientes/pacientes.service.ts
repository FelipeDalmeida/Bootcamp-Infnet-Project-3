import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { Paciente } from './entities/paciente.entity';
import { EntityRepository } from '@mikro-orm/mysql';
import { Reference, wrap } from '@mikro-orm/core';
import { Compcorp } from './entities/compcorp.entity';
import { CreateCompcorpDto } from './dto/create-compcorp.dto';


@Injectable()
export class PacientesService {

  constructor(
    @InjectRepository(Paciente)
    private readonly pacienteRepository: EntityRepository<Paciente>,
    @InjectRepository(Compcorp)
    private readonly compcorpRepository: EntityRepository<Compcorp>,
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
    return this.pacienteRepository.findOneOrFail(id);
  }

  async update(id: number, updatePacienteDto: UpdatePacienteDto) {
    const paciente=await this.pacienteRepository.findOneOrFail(id);
    wrap(paciente).assign(updatePacienteDto);
    this.pacienteRepository.flush();
    return paciente;
  }

  async remove(id: number) {
    const paciente=await this.pacienteRepository.findOneOrFail(id);
    this.pacienteRepository.remove(paciente);
    await this.pacienteRepository.flush();
    return paciente;
  }

  //compcorp

  async findAllCompcorp(id:number){
    const paciente=await this.pacienteRepository.findOneOrFail(id);
    await paciente.compcorp.init()
    const compcorp=await paciente.compcorp.getItems();
    return compcorp;
  }

  async findOneCompcorp(id_exam:number){

    return this.compcorpRepository.findOneOrFail(id_exam)
  }

  async createExam(id_paciente:number,data:CreateCompcorpDto){

    const paciente=await this.pacienteRepository.findOneOrFail(id_paciente);
    await paciente.compcorp.init()
    const exame=new Compcorp()
    exame.paciente=paciente;
    wrap(exame).assign(data)
    await this.compcorpRepository.persistAndFlush(exame)

    return exame
  }

  async deleteExam(id_exam:number){
    const exam=await this.compcorpRepository.findOneOrFail(id_exam)
    this.compcorpRepository.remove(exam)
    await this.compcorpRepository.flush()
    return exam
  }
}


