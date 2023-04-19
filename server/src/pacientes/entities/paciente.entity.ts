import { PrimaryKey, Property, Entity, OneToMany, Collection } from "@mikro-orm/core";
import { Compcorp } from "./compcorp.entity";

@Entity()
export class Paciente {
    @PrimaryKey()
    id:number;

    @Property()
    nome:string;

    @Property()
    idade:number;

    @Property()
    sexo:string;

    @Property()
    email:string;

    @Property()
    cpf:string;

    @Property()
    celular:string;

    @Property()
    data_nascimento:string;

    @Property()
    data_cadastro: Date = new Date();

    @OneToMany(()=>Compcorp,(compcorp)=>compcorp.paciente)
    compcorp=new Collection<Compcorp>(this)
}
