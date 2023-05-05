import { Injectable } from '@nestjs/common';
import { Compcorp } from './compcorp/compcorp.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, wrap } from '@mikro-orm/core';
import { ListExamDto } from './list-exames.dto';
import { UpdateCompcorpDto } from './compcorp/dto/update-compcorp.dto';
import { Avantropometrica } from './avantropometrica/avantropometrica.entity';
import { UpdateAvantropometrica } from './avantropometrica/dto/update-avantropometrica.dto';

@Injectable()
export class ExamesService {
  constructor(
    @InjectRepository(Compcorp)
    private readonly compcorpRepository: EntityRepository<Compcorp>,

    @InjectRepository(Avantropometrica)
    private readonly avantropometricaRepository: EntityRepository<Avantropometrica>
  ) {}
  
  async findAllExams({
    limit = 20,
    offset = 0,
    order_by = "id",
    direction = "asc",
  }: ListExamDto = {},
  id_paciente,
  exam: string) {

    if (exam === "compcorp") {
      const [exames,count] = await this.compcorpRepository.findAndCount(
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

      return {
        exames,
        count
      }
    }

    else if (exam === "avantropometrica") {
      const [exames,count] = await this.avantropometricaRepository.findAndCount(
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
      
      return {
        exames,
        count
      }
    }

    return null 
  }

  async findOneExam(id_exam: number, exam: string) {
    if (exam === "compcorp") {
      return this.compcorpRepository.findOneOrFail(id_exam)
    }

    else if (exam === "avantropometrica") {
      return this.avantropometricaRepository.findOneOrFail(id_exam)
    }

    return null 
  }


  async deleteExam(id_exam: number, exam: string) {
    if (exam === "compcorp") {
      const exam = await this.compcorpRepository.findOneOrFail(id_exam)
      this.compcorpRepository.remove(exam)
      await this.compcorpRepository.flush()
      return exam
    }

    else if (exam === "avantropometrica") {
      const exam = await this.avantropometricaRepository.findOneOrFail(id_exam)
      this.avantropometricaRepository.remove(exam)
      await this.avantropometricaRepository.flush()
      return exam
    }

    return null 
  }

  async updateCompcorp(id_exam: number, data: UpdateCompcorpDto) {

      const exam = await this.compcorpRepository.findOneOrFail(id_exam)
      wrap(exam).assign(data);
      await this.compcorpRepository.flush()
      return exam

  }

  async updateAvantropometrica(id_exam: number, data: UpdateAvantropometrica) {

    const exam = await this.avantropometricaRepository.findOneOrFail(id_exam)
    wrap(exam).assign(data);
    await this.avantropometricaRepository.flush()
    return exam

}

// async updateExam(id_exam: number,exam:string, data: UpdateAvantropometrica|UpdateCompcorpDto) {

//   if(exam==="compcorp"){
//     const exam = await this.compcorpRepository.findOneOrFail(id_exam)
//     wrap(exam).assign(data);
//     await this.compcorpRepository.flush()
//     return exam
//   }
//   if(exam==="avantropometrica"){
//     const exam = await this.avantropometricaRepository.findOneOrFail(id_exam)
//     wrap(exam).assign(data);
//     await this.avantropometricaRepository.flush()
//     return exam
//   }


// }

}
