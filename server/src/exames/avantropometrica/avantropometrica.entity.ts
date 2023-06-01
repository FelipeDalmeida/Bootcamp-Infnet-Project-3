import { PrimaryKey, Property, Entity, ManyToOne } from "@mikro-orm/core";
import { Paciente } from "../../pacientes/paciente.entity";
import { User } from "src/user/user.entity";

@Entity()
export class Avantropometrica {
    @PrimaryKey()
    id:number;

    @Property()
    estatura: number;

    @Property()
    comprimento_pe: number;

    @Property()
    altura_ombro: number;

    @Property()
    largura_ombro: number;

    @Property()
    envergadura: number;

    @Property()
    altura_quadril: number;

    @Property()
    largura_quadril: number;

    @Property()
    altura_joelho: number;

    @Property()
    altura_tornozelo: number
    
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