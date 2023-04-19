import { PrimaryKey, Property, Entity, OneToMany, ManyToOne } from "@mikro-orm/core";
import { Paciente } from "./paciente.entity";

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

    @ManyToOne(()=>Paciente)
    paciente:Paciente
}