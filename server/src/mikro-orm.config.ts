import { Avantropometrica } from './exames/avantropometrica/avantropometrica.entity';
import { Compcorp } from './exames/compcorp/compcorp.entity';
import { Paciente } from './pacientes/paciente.entity';
import { User } from './user/user.entity';

export default {
    entities:[Paciente,User,Avantropometrica,Compcorp],
    port:3306,
    dbName:"examesNest",
    host:"127.0.0.1",
    user:"root",
    password:"password",
    type:"mysql"

  };