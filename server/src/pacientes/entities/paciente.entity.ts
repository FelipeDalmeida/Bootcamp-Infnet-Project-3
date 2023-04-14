import { PrimaryKey, Property, Entity } from "@mikro-orm/core";

@Entity()
export class Paciente {
    @PrimaryKey()
    id:number;

    @Property()
    nome:string;
}
