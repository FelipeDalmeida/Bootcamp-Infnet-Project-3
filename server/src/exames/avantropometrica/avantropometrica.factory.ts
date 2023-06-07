import { Factory, Faker } from '@mikro-orm/seeder';
import { Avantropometrica } from './avantropometrica.entity';
import { User } from 'src/user/user.entity';
import { Paciente } from 'src/pacientes/paciente.entity';


function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}


export class AvantropometricaFactory extends Factory<Avantropometrica>{
  model = Avantropometrica;

  definition(faker: Faker): Partial<Avantropometrica> {
    return {
      estatura: getRandomInt(50,200),
      comprimento_pe: getRandomInt(1,40),
      altura_ombro: getRandomInt(1,150),
      largura_ombro: getRandomInt(1,150),
      envergadura: getRandomInt(1,150),
      altura_quadril: getRandomInt(1,150),
      largura_quadril: getRandomInt(1,150),
      altura_joelho: getRandomInt(1,150),
      altura_tornozelo: getRandomInt(1,150),
      data_avaliacao: faker.date.recent().toDateString(),
    };
  }

}