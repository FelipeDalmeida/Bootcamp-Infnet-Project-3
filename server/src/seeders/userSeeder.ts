import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { UserFactory } from 'src/user/user.factory';


export class UserSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const user = await new UserFactory(em)
      .create(25);
  }
}