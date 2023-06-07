import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { AvantropometricaFactory } from 'src/exames/avantropometrica/avantropometrica.factory';
import { CompcorpFactory } from 'src/exames/compcorp/compcorp.factory';
import { PacienteFactory } from 'src/pacientes/paciente.factory';
import { UserFactory } from 'src/user/user.factory';


export class UserSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const user = await new UserFactory(em)
      .each((user) => {
        user.paciente.set(new PacienteFactory(em)
          // .each(paciente => {
          //   paciente.compcorp.set(new CompcorpFactory(em).make(10))
          //   paciente.avantropometrica.set(new AvantropometricaFactory(em).make(10))
          // })
          .make(5))

      })
      .create(10);
  }
}

// export class DataBaseSeeder extends Seeder {         
//   async run(em: EntityManager): Promise<void> {
//     const user = await new UserFactory(em)
//       .each((user) => {
//         user.paciente.set(new PacienteFactory(em)
//           .each(paciente => {
//             paciente.compcorp.set(new CompcorpFactory(em).make(10))
//             paciente.avantropometrica.set(new AvantropometricaFactory(em).make(10))
//           })
//           .make(5))

//       })
//       .create(10);
//   }
// }