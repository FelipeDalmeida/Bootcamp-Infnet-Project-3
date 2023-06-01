import { PrimaryKey, Property, Entity, ManyToOne } from "@mikro-orm/core";
import { Paciente } from "../../pacientes/paciente.entity";
import { User } from "src/user/user.entity";

@Entity()
export class Compcorp {
    @PrimaryKey()
    id:number;

    @Property()
    massa: number;

    @Property()
    imc: number;

    @Property()
    gordura_corporal: number;

    @Property()
    gordura_visceral: number;

    @Property()
    metabolismo_basal: number;

    @Property()
    musculos_esqueleticos: number;

    @Property()
    idade_corporal: number;

    @Property()
    data_avaliacao:string;

    @ManyToOne(()=>Paciente,{
        onDelete:"cascade"
    })
    paciente:Paciente

    @ManyToOne(()=>User,{
        onDelete:"cascade"
    })
    user:User
}