import { Module } from '@nestjs/common';
import { ExamesService } from './exames.service';
import { ExamesController } from './exames.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Compcorp } from './compcorp/compcorp.entity';
import { Avantropometrica } from './avantropometrica/avantropometrica.entity';

@Module({
  imports:[MikroOrmModule.forFeature([Compcorp,Avantropometrica])],
  controllers: [ExamesController],
  providers: [ExamesService]
})
export class ExamesModule {}
