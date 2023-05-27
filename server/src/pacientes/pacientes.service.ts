import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { Paciente } from './paciente.entity';
import { EntityRepository, MikroORM } from '@mikro-orm/mysql';
import { Reference, wrap } from '@mikro-orm/core';
import { Compcorp } from '../exames/compcorp/compcorp.entity';
import { CreateCompcorpDto } from '../exames/compcorp/dto/create-compcorp.dto';
import { UpdateCompcorpDto } from '../exames/compcorp/dto/update-compcorp.dto';
import { ListPacientesDto } from './dto/list-pacientes.dto';
import { CreateAvantropometricaDto } from 'src/exames/avantropometrica/dto/create-avantropometrica.dto';
import { Avantropometrica } from 'src/exames/avantropometrica/avantropometrica.entity';
import { User } from 'src/user/user.entity';


@Injectable()
export class PacientesService {

  constructor(
    @InjectRepository(Paciente)
    private readonly pacienteRepository: EntityRepository<Paciente>,
    @InjectRepository(Compcorp)
    private readonly compcorpRepository: EntityRepository<Compcorp>,
    @InjectRepository(Avantropometrica)
    private readonly avantropometricaRepository: EntityRepository<Avantropometrica>,
    @InjectRepository(User)
    private readonly userRepository:EntityRepository<User>
  ) { }

  async create(createPacienteDto: CreatePacienteDto) {
    const paciente = this.pacienteRepository.create(createPacienteDto);
    await this.pacienteRepository.flush();
    return paciente;
  }

  async findAll({
    limit = 20,
    offset = 0,
    order_by = "id",
    direction = "asc",
    search = undefined
  }: ListPacientesDto = {}) {

    const [pacientes, count] = await this.pacienteRepository.findAndCount(
      search && {
        $or: [
          {
            nome: {
              $like: `%${search}%`
            },
          },
            {
            nome: {
              $like: `%${search}`
            },
          },
          {
            nome: {
              $like: `${search}%`
            },
          },
          {
            cpf: {
              $like: `${search}`
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

    return {
      pacientes,
      count
    };

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



  async createCompcorp(id_paciente: number, data: CreateCompcorpDto,userId:number) {

    const paciente = await this.pacienteRepository.findOneOrFail(id_paciente);
    const user = await this.userRepository.findOneOrFail(userId)
    await paciente.compcorp.init()
    const exame = new Compcorp()
    exame.paciente = paciente;
    exame.user=user
    wrap(exame).assign(data)
    await this.compcorpRepository.persistAndFlush(exame)

    return exame
  }

  async createAvantropometrica(id_paciente: number, data: CreateAvantropometricaDto,userId:number) {

    const paciente = await this.pacienteRepository.findOneOrFail(id_paciente);
    const user = await this.userRepository.findOneOrFail(userId)
    await paciente.avantropometrica.init()
    const exame = new Avantropometrica()
    exame.paciente = paciente;
    exame.user=user
    wrap(exame).assign(data)
    await this.avantropometricaRepository.persistAndFlush(exame)

    return exame
  }

}


