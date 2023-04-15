import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { PacienteFactory } from 'src/pacientes/paciente.factory';

export class PacienteSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const paciente = await new PacienteFactory(em)
      .create(25);
  }
}