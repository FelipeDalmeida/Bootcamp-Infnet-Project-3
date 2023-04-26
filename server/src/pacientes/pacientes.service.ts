import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { Paciente } from './paciente.entity';
import { EntityRepository } from '@mikro-orm/mysql';
import { Reference, wrap } from '@mikro-orm/core';
import { Compcorp } from '../exames/compcorp/compcorp.entity';
import { CreateCompcorpDto } from '../exames/compcorp/dto/create-compcorp.dto';
import { UpdateCompcorpDto } from '../exames/compcorp/dto/update-compcorp.dto';
import { ListPacientesDto } from './dto/list-pacientes.dto';
import { ListExamDto } from 'src/exames/list-exames.dto';


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

  findAll({
    limit = 20,
    offset = 0,
    order_by = "id",
    direction = "asc",
    search = undefined
  }: ListPacientesDto = {}) {
    return this.pacienteRepository.findAndCount(
      search && {
        $or: [
          {
            nome: {
              $like: `${search}`
            },
            cpf:{
              $like:`${search}`
            }
          }
        ],
      },

      {
        limit,
        offset,
        orderBy: {
          [order_by]: direction,
        },
      }

    );
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

  // async findAllExams(id_paciente: number, exam: string) {
  //   const paciente = await this.pacienteRepository.findOneOrFail(id_paciente);

  //   if (exam === "compcorp") {
  //     await paciente.compcorp.init()
  //     const compcorp = await paciente.compcorp.getItems();
  //     return compcorp;
  //   }

  //   return null //@TODO: Criar para avantropometrica
  // }

  async findAllExams({
    limit = 20,
    offset = 0,
    order_by = "id",
    direction = "asc",
  }: ListExamDto = {},
  id_paciente,
  exam: string) {

    if (exam === "compcorp") {
      return this.compcorpRepository.findAndCount(
        {
          $or:[
            {
              paciente:{
                $like:id_paciente
              }
            }
          ]
        },
        {
          limit,
          offset,
          orderBy: {
            [order_by]: direction,
          },
        }
      );
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

  async updateExam(id_exam: number, exam: string, data: UpdateCompcorpDto) {
    if (exam === "compcorp") {
      const exam = await this.compcorpRepository.findOneOrFail(id_exam)
      wrap(exam).assign(data);
      await this.compcorpRepository.flush()
      return exam
    }

    return null //@TODO: Criar para avantropometrica
  }
}


