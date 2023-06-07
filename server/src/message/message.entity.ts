import { Entity, ManyToOne, PrimaryKey, Property, TextType } from "@mikro-orm/core";
import { User } from "src/user/user.entity";


@Entity()
export class Message {
    @PrimaryKey()
    id:number;

    @Property({type:TextType })
    content: string;

    @ManyToOne(()=>User,{
        onDelete:'cascade'
    })
    sender: User;

    @Property()
    created_at:Date = new Date();
}
