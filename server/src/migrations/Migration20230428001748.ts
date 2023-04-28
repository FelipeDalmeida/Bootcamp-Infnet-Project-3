import { Migration } from '@mikro-orm/migrations';

export class Migration20230428001748 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `avantropometrica` (`id` int unsigned not null auto_increment primary key, `estatura` int not null, `comprimento_pe` int not null, `altura_ombro` int not null, `largura_ombro` int not null, `envergadura` int not null, `altura_quadril` int not null, `largura_quadril` int not null, `altura_joelho` int not null, `altura_tornozelo` int not null, `data_avaliacao` varchar(255) not null, `paciente_id` int unsigned not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `avantropometrica` add index `avantropometrica_paciente_id_index`(`paciente_id`);');

    this.addSql('alter table `avantropometrica` add constraint `avantropometrica_paciente_id_foreign` foreign key (`paciente_id`) references `paciente` (`id`) on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists `avantropometrica`;');
  }

}
