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

  //compcorp

  async findAllCompcorp(id:number){
    const paciente=await this.pacienteRepository.findOne(id);
    await paciente.compcorp.init()
    const compcorp=await paciente.compcorp.getItems();
    return compcorp;
  }

  async findOneCompcorp(id:number,id_exam:number){
    const paciente=await this.pacienteRepository.findOne(id);
    await paciente.compcorp.init()
    const compcorp=await paciente.compcorp.getItems()
    let findOne={}
    
    compcorp.map(exame=>{
      if(exame.id===id_exam){
        findOne =exame
      }
    })
    return findOne;
  }

  async createExam(id_paciente:number,data:CreateCompcorpDto){

    const paciente=await this.pacienteRepository.findOne(id_paciente,{populate:['compcorp']});
    await paciente.compcorp.init()

    let exame=new Compcorp()
    // console.log("Exame",exame)
    exame={...exame,...data}
    // console.log("Exame",exame)
    // console.log("//////////////")
    // paciente.compcorp.add(exame)
    // await this.pacienteRepository.flush();

    paciente.compcorp=Reference.create(exame)

    // const paciente=await this.pacienteRepository.findOne(id_paciente);
    // await paciente.compcorp.init()
    // const compcorp=await paciente.compcorp.add({...exame,...data})
    ///

    return paciente
  }
}
