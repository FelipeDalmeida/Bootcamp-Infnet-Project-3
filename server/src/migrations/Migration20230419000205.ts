import { Migration } from '@mikro-orm/migrations';

export class Migration20230419000205 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `compcorp` (`id` int unsigned not null auto_increment primary key, `massa` int not null, `imc` int not null, `gordura_corporal` int not null, `gordura_visceral` int not null, `metabolismo_basal` int not null, `musculos_esqueleticos` int not null, `idade_corporal` int not null, `data_avaliacao` varchar(255) not null, `paciente_id` int unsigned not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `compcorp` add index `compcorp_paciente_id_index`(`paciente_id`);');

    this.addSql('alter table `compcorp` add constraint `compcorp_paciente_id_foreign` foreign key (`paciente_id`) references `paciente` (`id`) on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists `compcorp`;');
  }

}
