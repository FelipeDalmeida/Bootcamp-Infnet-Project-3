import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { CompcorpFactory } from 'src/pacientes/factory/compcorp.factory';
import { PacienteFactory } from 'src/pacientes/factory/paciente.factory';

export class PacienteSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const paciente = await new PacienteFactory(em)
    .each((paciente)=>{
      paciente.compcorp.set(new CompcorpFactory(em).make(10))
    })
      .create(25);
  }
}