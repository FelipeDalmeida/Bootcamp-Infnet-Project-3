import { Entity, Property, PrimaryKey, DateTimeType, Unique } from "@mikro-orm/core";

@Entity()
export class User{
    @PrimaryKey()
    id:number;

    @Unique()
    @Property()
    email:string;

    @Property()
    nome:string;

    @Property()
    password:string;

    @Property()
    created_at:Date = new Date()


}