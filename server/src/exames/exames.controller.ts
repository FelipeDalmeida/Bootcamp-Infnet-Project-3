import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe, Req } from '@nestjs/common';
import { ExamesService } from './exames.service';
import { ListExamDto } from 'src/exames/list-exames.dto';
import { UpdateCompcorpDto } from './compcorp/dto/update-compcorp.dto';
import { UpdateAvantropometrica } from './avantropometrica/dto/update-avantropometrica.dto';

@Controller('exames')
export class ExamesController {
  constructor(private readonly examesService: ExamesService) {}

  @Get(':exam/all/:id_paciente')
  async findAllExams(@Query(
    new ValidationPipe({
      transform:true,
        transformOptions:{enableImplicitConversion:true},
        forbidNonWhitelisted:true
    })
  ) ListExamDto:ListExamDto,
  @Param('id_paciente') id_paciente: string, 
  @Param('exam') exam: string) {
    return await this.examesService.findAllExams(ListExamDto,+id_paciente, exam);
  }

  @Get(':exam/:id_exam')
  findOneExam(@Param('exam') exam: string, @Param('id_exam') id_exam:string) {
    return this.examesService.findOneExam(+id_exam, exam);
  }
  
  @Delete(':exam/:id_exam')
  async deleteExam(@Param('exam') exam: string, @Param('id_exam') id_exam:string, @Req() req:Request) {
    const payload = await req['user'];
    const userId =payload.id;
    return this.examesService.deleteExam(+id_exam, exam,userId);
  }

  @Patch('compcorp/:id_exam')
  async updateCompcorp(@Param('id_exam') id_exam:string,@Body() data:UpdateCompcorpDto, @Req() req:Request){
    const payload = await req['user'];
    const userId =payload.id;
    return this.examesService.updateCompcorp(+id_exam,data,userId)
  }

  @Patch('avantropometrica/:id_exam')
  async updateupdateAvantropometrica(@Param('id_exam') id_exam:string,@Body() data:UpdateAvantropometrica, @Req() req:Request){
    const payload = await req['user'];
    const userId =payload.id;
    return this.examesService.updateAvantropometrica(+id_exam,data,userId)
  }

  // @Patch('teste/:exam/:id_exam')
  // updateExam(@Param('id_exam') id_exam:string,@Param('exam') exam:string, @Body() data:UpdateAvantropometrica|UpdateCompcorpDto){
  //   return this.examesService.updateExam(+id_exam,exam,data)
  // }
}
