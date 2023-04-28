import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { AvantropometricaFactory } from 'src/exames/avantropometrica/avantropometrica.factory';
import { CompcorpFactory } from 'src/exames/compcorp/compcorp.factory';
import { PacienteFactory } from 'src/pacientes/paciente.factory';

export class PacienteSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const paciente = await new PacienteFactory(em)
    .each((paciente)=>{
      paciente.compcorp.set(new CompcorpFactory(em).make(10))
      paciente.avantropometrica.set(new AvantropometricaFactory(em).make(10))
    })
      .create(25);
  }
}