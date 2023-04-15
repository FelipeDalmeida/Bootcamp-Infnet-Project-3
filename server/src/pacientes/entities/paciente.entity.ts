import { PrimaryKey, Property, Entity } from "@mikro-orm/core";

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
}
