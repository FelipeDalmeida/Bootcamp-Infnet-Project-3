import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe } from '@nestjs/common';
import { ExamesService } from './exames.service';
import { ListExamDto } from 'src/exames/list-exames.dto';
import { UpdateCompcorpDto } from './compcorp/dto/update-compcorp.dto';
import { UpdateAvantropometrica } from './avantropometrica/dto/update-avantropometrica.dto';

@Controller('exames')
export class ExamesController {
  constructor(private readonly examesService: ExamesService) {}

  @Get(':exam/all/:id_paciente')
  findAllExams(@Query(
    new ValidationPipe({
      transform:true,
        transformOptions:{enableImplicitConversion:true},
        forbidNonWhitelisted:true
    })
  ) ListExamDto:ListExamDto,
  @Param('id_paciente') id_paciente: string, 
  @Param('exam') exam: string) {
    return this.examesService.findAllExams(ListExamDto,+id_paciente, exam);
  }

  @Get(':exam/:id_exam')
  findOneExam(@Param('exam') exam: string, @Param('id_exam') id_exam:string) {
    return this.examesService.findOneExam(+id_exam, exam);
  }
  
  @Delete(':exam/:id_exam')
  deleteExam(@Param('exam') exam: string, @Param('id_exam') id_exam:string) {
    return this.examesService.deleteExam(+id_exam, exam);
  }

  @Patch('compcorp/:id_exam')
  updateCompcorp(@Param('id_exam') id_exam:string,@Body() data:UpdateCompcorpDto){
    return this.examesService.updateCompcorp(+id_exam,data)
  }

  @Patch('avantropometrica/:id_exam')
  updateupdateAvantropometrica(@Param('id_exam') id_exam:string,@Body() data:UpdateAvantropometrica){
    return this.examesService.updateAvantropometrica(+id_exam,data)
  }

  // @Patch('teste/:exam/:id_exam')
  // updateExam(@Param('id_exam') id_exam:string,@Param('exam') exam:string, @Body() data:UpdateAvantropometrica|UpdateCompcorpDto){
  //   return this.examesService.updateExam(+id_exam,exam,data)
  // }
}
