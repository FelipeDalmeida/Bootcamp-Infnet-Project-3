import * as dotenv from 'dotenv';
import { Avantropometrica } from './exames/avantropometrica/avantropometrica.entity';
import { Compcorp } from './exames/compcorp/compcorp.entity';
import { Paciente } from './pacientes/paciente.entity';
import { User } from './user/user.entity';
import { Email } from './email/email.entity';
import { Message } from './message/message.entity';
dotenv.config();

export default {
    entities:[Paciente,User,Avantropometrica,Compcorp,Email,Message],
    port:process.env.MYSQL_PORT,
    dbName:process.env.MYSQL_DB,
    host:process.env.MYSQL_HOST,
    user:process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    type:"mysql"

  };