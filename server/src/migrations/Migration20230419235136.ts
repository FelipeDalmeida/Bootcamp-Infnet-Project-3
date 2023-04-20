import { Migration } from '@mikro-orm/migrations';

export class Migration20230419235136 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `compcorp` drop foreign key `compcorp_paciente_id_foreign`;');

    this.addSql('alter table `compcorp` add constraint `compcorp_paciente_id_foreign` foreign key (`paciente_id`) references `paciente` (`id`) on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `compcorp` drop foreign key `compcorp_paciente_id_foreign`;');

    this.addSql('alter table `compcorp` add constraint `compcorp_paciente_id_foreign` foreign key (`paciente_id`) references `paciente` (`id`) on update cascade;');
  }

}
