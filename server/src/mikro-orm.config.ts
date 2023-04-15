import { Paciente } from './pacientes/entities/paciente.entity';

export default {
    entities:[Paciente],
    port:3306,
    dbName:"examesNest",
    host:"127.0.0.1",
    user:"root",
    password:"password",
    type:"mysql"

  };