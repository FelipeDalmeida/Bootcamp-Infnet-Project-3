import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe, UseGuards } from '@nestjs/common';
import { PacientesService } from './pacientes.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { CreateCompcorpDto } from '../exames/compcorp/dto/create-compcorp.dto';
import { UpdateCompcorpDto } from '../exames/compcorp/dto/update-compcorp.dto';
import { ListPacientesDto } from './dto/list-pacientes.dto';
import { ListExamDto } from 'src/exames/list-exames.dto';
import { CreateAvantropometricaDto } from 'src/exames/avantropometrica/dto/create-avantropometrica.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('pacientes')
export class PacientesController {
  constructor(private readonly pacientesService: PacientesService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createPacienteDto: CreatePacienteDto) {
    return this.pacientesService.create(createPacienteDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(
    @Query(
      new ValidationPipe({
        transform:true,
        transformOptions:{enableImplicitConversion:true},
        forbidNonWhitelisted:true
      }),  
    )
    ListPacientesDto:ListPacientesDto
  ) {
    return await this.pacientesService.findAll(ListPacientesDto);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pacientesService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePacienteDto: UpdatePacienteDto) {
    return this.pacientesService.update(+id, updatePacienteDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pacientesService.remove(+id);
  }



  //Exames
  @UseGuards(AuthGuard)
  @Post(':id_paciente/compcorp')
  createCompcorp(@Param('id_paciente') id: string,@Param('exam') exam: string,@Body() data: CreateCompcorpDto) {
    return this.pacientesService.createCompcorp(+id,data);
  }

  @UseGuards(AuthGuard)
  @Post(':id_paciente/avantropometrica')
  createAvantropometrica(@Param('id_paciente') id: string,@Param('exam') exam: string,@Body() data: CreateAvantropometricaDto) {
    return this.pacientesService.createAvantropometrica(+id,data);
  }
  
}
