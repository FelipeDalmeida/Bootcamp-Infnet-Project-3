import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PacientesService } from './pacientes.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { CreateCompcorpDto } from './dto/create-compcorp.dto';
import { UpdateCompcorpDto } from './dto/update-compcorp.dto copy';

@Controller('pacientes')
export class PacientesController {
  constructor(private readonly pacientesService: PacientesService) {}

  @Post()
  create(@Body() createPacienteDto: CreatePacienteDto) {
    return this.pacientesService.create(createPacienteDto);
  }

  @Get()
  findAll() {
    return this.pacientesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pacientesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePacienteDto: UpdatePacienteDto) {
    return this.pacientesService.update(+id, updatePacienteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pacientesService.remove(+id);
  }



  //Exames
  @Post(':id/:exam')
  createExam(@Param('id') id: string,@Param('exam') exam: string,@Body() data: CreateCompcorpDto) {
    return this.pacientesService.createExam(+id,exam,data);
  }

  @Get(':id/:exam')
  findAllExams(@Param('id') id: string, @Param('exam') exam: string) {
    return this.pacientesService.findAllExams(+id, exam);
  }

  @Get(':id/:exam/:id_exam')
  findOneExam(@Param('exam') exam: string, @Param('id_exam') id_exam:string) {
    return this.pacientesService.findOneExam(+id_exam, exam);
  }
  
  @Delete(':id/:exam/:id_exam')
  deleteExam(@Param('exam') exam: string, @Param('id_exam') id_exam:string) {
    return this.pacientesService.deleteExam(+id_exam, exam);
  }

  @Patch(':id/:exam/:id_exam')
  updateExam(@Param('exam') exam: string, @Param('id_exam') id_exam:string,@Body() data:UpdateCompcorpDto){
    return this.pacientesService.updateExam(+id_exam,exam,data)
  }
}
