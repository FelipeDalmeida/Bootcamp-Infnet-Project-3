import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe, Request, Req } from '@nestjs/common';
import { PacientesService } from './pacientes.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { CreateCompcorpDto } from '../exames/compcorp/dto/create-compcorp.dto';
import { ListPacientesDto } from './dto/list-pacientes.dto';
import { CreateAvantropometricaDto } from 'src/exames/avantropometrica/dto/create-avantropometrica.dto';

@Controller('pacientes')
export class PacientesController {
  constructor(private readonly pacientesService: PacientesService) {}


  @Post()
  async create(@Body() createPacienteDto: CreatePacienteDto, @Request() req:Request ) {
    const payload = await req['user'];
    const userId =payload.id;
    createPacienteDto.user=userId
    const response = await this.pacientesService.create(createPacienteDto);
    console.log(response)
    return response
  }

  
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
  @Post(':id_paciente/compcorp')
  async createCompcorp(@Param('id_paciente') id: string,@Param('exam') exam: string,@Body() data: CreateCompcorpDto, @Request() req:Request) {
    const payload = await req['user'];
    const userId =payload.id;
    return await this.pacientesService.createCompcorp(+id,data,userId);
  }

  @Post(':id_paciente/avantropometrica')
  async createAvantropometrica(@Param('id_paciente') id: string,@Param('exam') exam: string,@Body() data: CreateAvantropometricaDto, @Request() req:Request) {
    const payload = await req['user'];
    const userId =payload.id;
    return await this.pacientesService.createAvantropometrica(+id,data,userId);
  }
  
}
