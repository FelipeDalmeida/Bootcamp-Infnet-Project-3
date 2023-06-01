import { Migration } from '@mikro-orm/migrations';

export class Migration20230601022500 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `paciente` drop foreign key `paciente_user_id_foreign`;');

    this.addSql('alter table `compcorp` drop foreign key `compcorp_user_id_foreign`;');

    this.addSql('alter table `avantropometrica` drop foreign key `avantropometrica_user_id_foreign`;');

    this.addSql('alter table `paciente` add constraint `paciente_user_id_foreign` foreign key (`user_id`) references `user` (`id`) on update cascade on delete cascade;');

    this.addSql('alter table `compcorp` add constraint `compcorp_user_id_foreign` foreign key (`user_id`) references `user` (`id`) on update cascade on delete cascade;');

    this.addSql('alter table `avantropometrica` add constraint `avantropometrica_user_id_foreign` foreign key (`user_id`) references `user` (`id`) on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `paciente` drop foreign key `paciente_user_id_foreign`;');

    this.addSql('alter table `compcorp` drop foreign key `compcorp_user_id_foreign`;');

    this.addSql('alter table `avantropometrica` drop foreign key `avantropometrica_user_id_foreign`;');

    this.addSql('alter table `paciente` add constraint `paciente_user_id_foreign` foreign key (`user_id`) references `user` (`id`) on update cascade;');

    this.addSql('alter table `compcorp` add constraint `compcorp_user_id_foreign` foreign key (`user_id`) references `user` (`id`) on update cascade;');

    this.addSql('alter table `avantropometrica` add constraint `avantropometrica_user_id_foreign` foreign key (`user_id`) references `user` (`id`) on update cascade;');
  }

}
