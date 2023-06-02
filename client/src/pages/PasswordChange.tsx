import { useState } from "react"
import Input from "../components/Input"
import Text from "../components/Text"
import Container from "../components/Container"
import CriaForm from "../components/Criaform"
import Button from "../components/Button"
import { patchPassword } from "../service/api/patchPassword"
import { useNavigate } from "react-router-dom"

const text = {
  
    labelSenha: "Senha",
    labelSenhaAtual:"Senha Atual",
    labelConfirmarSenha: "Confirmar Senha",
    labelTitle: "Trocar senha",
    labelButton: "Trocar Senha",    
    labelAtualizacaoSuccess:"Atualizado com sucesso",
    labelAtualizacaoFail:"Falha na atualização",
}


const PasswordChange = ({})=>{
    const navigate = useNavigate();
    const goToPage = (page: string) => { navigate(`${page}`) }
    const [senhas,setSenhas]=useState({oldPassword:"",password:"",confirmPassword:"",error:""})
    
    const atualizaSenha=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        if(senhas.password===senhas.confirmPassword){
            setSenhas({...senhas,error:""})
            const response = await patchPassword({
                oldPassword:senhas.oldPassword,
                password:senhas.password,
            });
            if(response.success){
                alert(text.labelAtualizacaoSuccess)
                goToPage('/usuario')
            } else {
                alert(text.labelAtualizacaoFail)
            }
        } else {
            setSenhas({...senhas,error:"Senhas não coincidem"})
        }
      

       

    } 

    const inputs = [
        <Input label={text.labelSenhaAtual} type={"password"} value={senhas.oldPassword} onChange={(e) => setSenhas({ ...senhas, oldPassword: e.target.value })} />,
        <Input label={text.labelSenha} type={"password"} value={senhas.password} onChange={(e) => setSenhas({ ...senhas, password: e.target.value })} />,
        <Input label={text.labelConfirmarSenha} type={"password"} value={senhas.confirmPassword} onChange={(e) => setSenhas({ ...senhas, confirmPassword: e.target.value })} error={senhas.error} />
    ]

    
    return(
        <Container 
        type={"small"}
        content={<>
 
                <Text className={"text-center mt-6 text-4xl"} type={"h1"} text={text.labelTitle} />
                <CriaForm inputs={inputs} className={"my-2 grid-cols-1"} />
                <div className={"mx-10 "}>
                    <Button title={text.labelButton} className={"m-0 my-3 p-2 w-full "} onClick={(e) => atualizaSenha(e)} />
                </div>
                </>
        }/>
    )
}

export default PasswordChange