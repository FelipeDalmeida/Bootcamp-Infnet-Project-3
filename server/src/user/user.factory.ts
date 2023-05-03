import { Factory, Faker } from '@mikro-orm/seeder';
import { User } from './user.entity';



export class UserFactory extends Factory<User>{
    model = User;

    definition(faker: Faker): Partial<User> {
      return {
        nome:faker.name.fullName(),
        email:faker.internet.email(),
        password:faker.internet.password(),
      };
    }

}