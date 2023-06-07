import { useEffect, useState, useRef } from "react"
import Container from "../components/Container"
import Input from "../components/Input"
import { Message, User } from "../types/types";
import MessageContainer from "../components/MessageContainer";
import { useGlobalStore } from "../service/useGlobalStore";
import { getUsers } from "../service/api/getUsers";
import { getMessages } from "../service/api/getMessages";
import { postMessage } from "../service/api/postMessage";
import { listenMessengerNotifications } from "../service/api/listenMessengerNotifications";

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
    const messagesRef = useRef(initialMessages);
    const messagesScrollRef = useRef<HTMLDivElement | null>();


    async function onLoadUsers() {
        const allUsers = await getUsers();
        return allUsers
      }

    async function getAllMessages(){
        const allMessages=await getMessages()
        return allMessages
    }

    async function createMessage(){
        if(newMessage===""){
            return
        }
        // const nextMessage:Message={
        //     id:Date.now(),
        //     content:newMessage,
        //     created_at:new Date().toJSON(),
        //     sender:user.id
        // }
        //setMessages([...messages,nextMessage])
        postMessage(newMessage)
        setNewMessage("")
    }

    useEffect(() => {
        messagesRef.current = messages;
        if (messagesScrollRef.current !== null) {
          messagesScrollRef.current?.scrollTo(
            0,
            messagesScrollRef.current.scrollHeight
          );
        }
      }, [messages]);

    useEffect(()=>{



        onLoadUsers().then(response=>{
            setUsers(response)
            getAllMessages().then(response=>{
                setMessages(response)
            })
        })
        listenMessengerNotifications((message)=>{
            setMessages([...messagesRef.current,message])
        })
        
    },[])


    return (
        <Container type={"small-no-pb"} content={<>
            <div className={"overflow-auto h-[calc(100vh-160px-80px)]"} ref={(ref) => (messagesScrollRef.current = ref)}>
                {messages.map((message) => {
                    let userPos=users.map(e => e.id).indexOf(message.sender)
                    return <MessageContainer
                        key={message.id}
                        isCreator={message.sender === user.id}
                        content={message.content}
                        created_at={message.created_at}
                        user={userPos>=0?users[userPos].nome:""}
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
                    onKeyDown={(event) => event.key === "Enter" && createMessage()}
                />
            </div>
        </>}
        />)
}


export default Chat