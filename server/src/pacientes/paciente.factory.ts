import { Factory, Faker } from '@mikro-orm/seeder';
import { Paciente } from './paciente.entity';
import { User } from 'src/user/user.entity';


function getRandomInt(min:number, max:number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
}
function getSexo() {
    const sorteio=Math.floor(Math.random()*2)
    if(sorteio ===0){
        return "Masculino"
    }
    else{
        return "Feminino"
    }
}


export class PacienteFactory extends Factory<Paciente>{
    model = Paciente;

    definition(faker: Faker): Partial<Paciente> {
      return {
        nome:faker.name.fullName(),
        idade:getRandomInt(10,100),
        sexo:getSexo(),
        email:faker.internet.email(),
        cpf:`${getRandomInt(10000000000,99999999999)}`,
        celular:faker.phone.number("(21) #####-####"),
        data_nascimento:`${faker.date.birthdate()}`,
      };
    }

}