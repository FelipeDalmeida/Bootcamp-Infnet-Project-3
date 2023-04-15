import { Migration } from '@mikro-orm/migrations';

export class Migration20230415012253 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `paciente` (`id` int unsigned not null auto_increment primary key, `nome` varchar(255) not null, `idade` int not null, `sexo` varchar(255) not null, `email` varchar(255) not null, `cpf` varchar(255) not null, `celular` varchar(255) not null, `data_nascimento` varchar(255) not null, `data_cadastro` datetime not null) default character set utf8mb4 engine = InnoDB;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists `paciente`;');
  }

}
