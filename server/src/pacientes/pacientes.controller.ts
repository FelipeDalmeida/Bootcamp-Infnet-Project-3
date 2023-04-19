import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PacientesService } from './pacientes.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { CreateCompcorpDto } from './dto/create-compcorp.dto';

@Controller('pacientes')
export class PacientesController {
  constructor(private readonly pacientesService: PacientesService) {}

  @Post()
  create(@Body() createPacienteDto: CreatePacienteDto) {
    return this.pacientesService.create(createPacienteDto);
  }

  @Post(':id/compcorp')
  createExam(@Param('id') id: string,@Body() data: CreateCompcorpDto) {
    return this.pacientesService.createExam(+id,data);
  }

  @Get()
  findAll() {
    return this.pacientesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pacientesService.findOne(+id);
  }

  @Get(':id/compcorp')
  findAllCompcorp(@Param('id') id: string) {
    return this.pacientesService.findAllCompcorp(+id);
  }

  @Get(':id/compcorp/:id_exam')
  findOneCompcorp(@Param('id') id: string,@Param('id_exam') id_exam:string) {
    return this.pacientesService.findOneCompcorp(+id,+id_exam);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePacienteDto: UpdatePacienteDto) {
    return this.pacientesService.update(+id, updatePacienteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pacientesService.remove(+id);
  }
}
