import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { Paciente } from './entities/paciente.entity';
import { EntityRepository } from '@mikro-orm/mysql';
import { Reference, wrap } from '@mikro-orm/core';
import { Compcorp } from './entities/compcorp.entity';
import { CreateCompcorpDto } from './dto/create-compcorp.dto';
import { UpdateCompcorpDto } from './dto/update-compcorp.dto copy';


@Injectable()
export class PacientesService {

  constructor(
    @InjectRepository(Paciente)
    private readonly pacienteRepository: EntityRepository<Paciente>,
    @InjectRepository(Compcorp)
    private readonly compcorpRepository: EntityRepository<Compcorp>,
  ) { }

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
    const paciente = await this.pacienteRepository.findOneOrFail(id);
    wrap(paciente).assign(updatePacienteDto);
    this.pacienteRepository.flush();
    return paciente;
  }

  async remove(id: number) {
    const paciente = await this.pacienteRepository.findOneOrFail(id);
    this.pacienteRepository.remove(paciente);
    await this.pacienteRepository.flush();
    return paciente;
  }



  //Exames

  async findAllExams(id_paciente: number, exam: string) {
    const paciente = await this.pacienteRepository.findOneOrFail(id_paciente);

    if (exam === "compcorp") {
      await paciente.compcorp.init()
      const compcorp = await paciente.compcorp.getItems();
      return compcorp;
    }

    return null //@TODO: Criar para avantropometrica
  }

  async findOneExam(id_exam: number, exam: string) {
    if (exam === "compcorp") {
      return this.compcorpRepository.findOneOrFail(id_exam)
    }
    return null //@TODO: Criar para avantropometrica
  }

  async createExam(id_paciente: number, exam: string, data: CreateCompcorpDto) {

    const paciente = await this.pacienteRepository.findOneOrFail(id_paciente);

    if (exam === "compcorp") {
      await paciente.compcorp.init()
      const exame = new Compcorp()
      exame.paciente = paciente;
      wrap(exame).assign(data)
      await this.compcorpRepository.persistAndFlush(exame)

      return exame
    }

    return null //@TODO: Criar para avantropometrica

  }

  async deleteExam(id_exam: number, exam: string) {
    if (exam === "compcorp") {
      const exam = await this.compcorpRepository.findOneOrFail(id_exam)
      this.compcorpRepository.remove(exam)
      await this.compcorpRepository.flush()
      return exam
    }

    return null //@TODO: Criar para avantropometrica
  }

  async updateExam(id_exam: number, exam: string, data:UpdateCompcorpDto){
    if (exam === "compcorp") {
      const exam = await this.compcorpRepository.findOneOrFail(id_exam)
      wrap(exam).assign(data);
      await this.compcorpRepository.flush()
      return exam
    }

    return null //@TODO: Criar para avantropometrica
  }
}


