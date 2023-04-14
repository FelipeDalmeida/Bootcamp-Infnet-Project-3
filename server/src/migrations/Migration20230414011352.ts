import { Migration } from '@mikro-orm/migrations';

export class Migration20230414011352 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `paciente` (`id` int unsigned not null auto_increment primary key, `nome` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');
  }

}
