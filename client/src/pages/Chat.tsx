import { useEffect, useState } from "react"
import Container from "../components/Container"
import Input from "../components/Input"
import { Message, User } from "../types/types";
import MessageContainer from "../components/MessageContainer";
import { useGlobalStore } from "../service/useGlobalStore";
import { getUsers } from "../service/api/getUsers";

const text = {
    labelMessagePlaceholder: "Digite aqui sua menssagem"
}
const initialMessages: Message[] = [];
const initialUsers: User[] = [];

const Chat = ({ }) => {

    const [newMessage, setNewMessage] = useState("")
    const [messages, setMessages] = useState(initialMessages)
    const [users,setUsers]=useState(initialUsers)
    const user = useGlobalStore((state) => state.user);

    const onSendMessage = async () => {
        console.log("Enviado")
    }

    async function onLoadUsers() {
        const allUsers = await getUsers();
        return allUsers
      }

    useEffect(()=>{



        onLoadUsers().then(response=>{
            console.log(response)
            setUsers(response)
            setMessages([

                {
                    id: 2,
                    content: "Oii",
                    sender: 69,
                    created_at: "18/02/1994",
                },
                {
                    id: 3,
                    content: "Opa",
                    sender: 26,
                    created_at: "18/02/1994",
                },
    
                {
                    id: 4,
                    content: "Tudo bem?",
                    sender: 69,
                    created_at: "18/02/1994",
                },
    
                {
                    id: 5,
                    content: "Tudo e você?",
                    sender: 26,
                    created_at: "18/02/1994",
                },
    
                {
                    id: 6,
                    content: "Tudo certo!",
                    sender: 69,
                    created_at: "18/02/1994",
                },
            ])
        })

        
    },[])


    return (
        <Container type={"small-no-pb"} content={<>
            <div className={"overflow-auto h-[calc(100vh-160px-80px)]"}>
                {messages.map((message) => {

                    // console.log("users",users)
                  
                    let userPos=users.map(e => e.id).indexOf(message.sender)

                    return <MessageContainer
                        key={message.id}
                        isCreator={message.sender === user.id}
                        content={message.content}
                        created_at={message.created_at}
                        user={users[userPos].nome}
                    />
                })}
            </div>
            <div className={""}>
                <input
                    type="text"
                    placeholder={text.labelMessagePlaceholder}
                    className="w-full p-4 border border-slate-200 rounded-b-2xl outline-none"
                    value={newMessage}
                    onChange={(event) => setNewMessage(event.target.value)}
                    onKeyDown={(event) => event.key === "Enter" && onSendMessage()}
                />
            </div>
        </>}
        />)
}


export default Chat