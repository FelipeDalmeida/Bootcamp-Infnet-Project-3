import { Factory, Faker } from '@mikro-orm/seeder';
import { Compcorp } from './compcorp.entity';


function getRandomInt(min:number, max:number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
}


export class CompcorpFactory extends Factory<Compcorp>{
    model = Compcorp;

    definition(faker: Faker): Partial<Compcorp> {
      return {
        massa:getRandomInt(10,100),
        imc:getRandomInt(15,35),
        gordura_corporal:getRandomInt(15,35),
        gordura_visceral:getRandomInt(2,15),
        metabolismo_basal:getRandomInt(1000,3000),
        musculos_esqueleticos:getRandomInt(15,35),
        idade_corporal:getRandomInt(1,100),
        data_avaliacao:faker.date.recent().toDateString()
      };
    }

}