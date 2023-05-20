import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { User } from "../user/user.entity";

@Entity()
export class Email{
    @PrimaryKey()
    id:Number;

    @Property()
    code:string;

    @Property()
    createdAt:Date=new Date()

    @ManyToOne(()=>User,{
        onDelete:"cascade"
    })
    user: User;
}