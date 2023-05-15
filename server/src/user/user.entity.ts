import { Entity, Property, PrimaryKey, DateTimeType, Unique, OneToMany, Collection, BeforeCreate } from "@mikro-orm/core";
import * as bcrypt from 'bcrypt'; 
import { Avantropometrica } from "src/exames/avantropometrica/avantropometrica.entity";
import { Compcorp } from "src/exames/compcorp/compcorp.entity";
import { Paciente } from "src/pacientes/paciente.entity";



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

    @OneToMany(()=>Paciente,(paciente)=>paciente.user)
    paciente=new Collection<Paciente>(this)

    @OneToMany(()=>Avantropometrica,(avantropometrica)=>avantropometrica.user)
    avantropometrica=new Collection<Avantropometrica>(this)

    @OneToMany(()=>Compcorp,(compcorp)=>compcorp.user)
    compcorp=new Collection<Compcorp>(this)

    async comparePassword(password:string){
        const isPasswordEqual = await bcrypt.compare(password,this.password);
        return isPasswordEqual;
    }

    @BeforeCreate()
    async hashPassword(){
        this.password=await bcrypt.hash(this.password,10)
    }
}