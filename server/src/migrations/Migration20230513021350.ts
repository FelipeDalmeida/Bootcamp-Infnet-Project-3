import { Migration } from '@mikro-orm/migrations';

export class Migration20230513021350 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `paciente` add `user_id` int unsigned not null;');
    this.addSql('alter table `paciente` add constraint `paciente_user_id_foreign` foreign key (`user_id`) references `user` (`id`) on update cascade;');
    this.addSql('alter table `paciente` add index `paciente_user_id_index`(`user_id`);');

    this.addSql('alter table `compcorp` add `user_id` int unsigned not null;');
    this.addSql('alter table `compcorp` add constraint `compcorp_user_id_foreign` foreign key (`user_id`) references `user` (`id`) on update cascade;');
    this.addSql('alter table `compcorp` add index `compcorp_user_id_index`(`user_id`);');

    this.addSql('alter table `avantropometrica` add `user_id` int unsigned not null;');
    this.addSql('alter table `avantropometrica` add constraint `avantropometrica_user_id_foreign` foreign key (`user_id`) references `user` (`id`) on update cascade;');
    this.addSql('alter table `avantropometrica` add index `avantropometrica_user_id_index`(`user_id`);');
  }

  async down(): Promise<void> {
    this.addSql('alter table `paciente` drop foreign key `paciente_user_id_foreign`;');

    this.addSql('alter table `compcorp` drop foreign key `compcorp_user_id_foreign`;');

    this.addSql('alter table `avantropometrica` drop foreign key `avantropometrica_user_id_foreign`;');

    this.addSql('alter table `paciente` drop index `paciente_user_id_index`;');
    this.addSql('alter table `paciente` drop `user_id`;');

    this.addSql('alter table `compcorp` drop index `compcorp_user_id_index`;');
    this.addSql('alter table `compcorp` drop `user_id`;');

    this.addSql('alter table `avantropometrica` drop index `avantropometrica_user_id_index`;');
    this.addSql('alter table `avantropometrica` drop `user_id`;');
  }

}
