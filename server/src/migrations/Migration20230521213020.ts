import { Migration } from '@mikro-orm/migrations';

export class Migration20230521213020 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `user` add `user_picture` varchar(5500) null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `user` drop `user_picture`;');
  }

}
