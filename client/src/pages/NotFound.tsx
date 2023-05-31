import Text from "../components/Text"
const NotFound =({})=>{

    return <div className="h-[calc(100vh-5rem)] flex flex-col items-center justify-center">

        <Text type={"h1"} text={"404"} className={"text-9xl text-sky-900"}/>
        <Text type={"h3"} text={"Página Não Encontrada"} className={"text-xl text-sky-700"}/>


    </div>
}

export default NotFound