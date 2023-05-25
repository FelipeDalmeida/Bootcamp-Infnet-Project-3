interface ContainerProps {
    content:  any;
}

const Container =({content}:ContainerProps)=>{


        return (<div className={" h-screen p-2 grid grid-cols-12 gap-4 "}>

        <div className={"sm:relative self-center my-10 pb-10 border border-slate-200 rounded-2xl shadow-2xl shadow-blue-500/50  box-border  col-start-0 col-span-12 md:col-start-4 md:col-span-6 lg:col-start-5 lg:col-span-4"}>
            {content}
        </div>
    </div>)


}

export default Container