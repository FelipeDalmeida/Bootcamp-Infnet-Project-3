import { PrimaryKey, Property, Entity, OneToMany, Collection, ManyToOne } from "@mikro-orm/core";
import { Compcorp } from "../exames/compcorp/compcorp.entity";
import { Avantropometrica } from "src/exames/avantropometrica/avantropometrica.entity";
import { User } from "src/user/user.entity";

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

    @OneToMany(()=>Avantropometrica,(avantropometrica)=>avantropometrica.paciente)
    avantropometrica=new Collection<Avantropometrica>(this)

    @ManyToOne(()=>User)
    user:User
}
