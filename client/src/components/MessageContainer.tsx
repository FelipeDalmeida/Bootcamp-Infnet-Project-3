
interface MessageContainerProps{
    isCreator:boolean;
    content:string;
    created_at:string;
    user?:string|undefined;
}

const MessageContainer=({isCreator,content,created_at,user}:MessageContainerProps)=>{


    if(isCreator){
        return(
    
            <div className={"w-8/12 p-3 m-4 border bg-lime-500 float-right border-slate-200 rounded-2xl"}>
                {content}
                <div className={" italic text-xs text-right"}>{created_at}</div>
            </div>
       
        );
    }
    return(
    
        <div className={"w-8/12 p-3 m-4 border border-slate-200 float-left rounded-2xl"}>
            <div className={"text-center"}>
                <span className={"px-3 bg-sky-100 font-bold rounded-2xl"}>{user?user:"Usuário indefinido"}</span>
            </div>
            {content}
            <div className={" italic text-xs text-right"}>{created_at}</div>
        </div>
   
    );
}

export default MessageContainer