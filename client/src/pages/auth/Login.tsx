import CriaForm from "../../components/Criaform"
import Input from "../../components/Input"
import Text from "../../components/Text"
import Button from "../../components/Button"
import { useEffect, useState } from "react"
import Img from "../../components/Img"
import Logo from '../../assets/img/logo192.png'
import { useNavigate } from "react-router-dom"
import { useAxios } from "../../service/useAxios"
import { criaNome } from "../../service/stringManipulation"
import { User } from "../../types/types"
import { AuthToken } from "../../service/authToken"
import { useGlobalStore } from "../../service/useGlobalStore"
import { login } from "../../service/api/login"
import Container from "../../components/Container"

//@TODO: Deletar ou o useAxios ou o API

const text = {
    labelEmail: "E-mail",
    labelSenha: "Senha",
    labelTitle: "Login",
    labelButton: "Entrar",
    labelButtonRegister: "Registrar-se"
}

const Login = () => {
    const navigate = useNavigate();
    const goToPage = (page: string) => { navigate(`${page}`) }

    const setUser = useGlobalStore((state) => state.setUser);
    const [loginData, setLoginData] = useState({ email: "", password: "", error: "" })



    const sendLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { email, password } = loginData;
        const response = await login(email, password);
        if (response !== null) {
            const { accessToken, user } = response;
            AuthToken.set(accessToken);
            setUser({ ...user, isAuthenticated: true });
            navigate("/cadastro");
        } else {
            setLoginData({ ...loginData, error: "Erro de Login" })
        }
    }



    const inputs = [
        <Input label={text.labelEmail} type={"email"} value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />,
        <Input label={text.labelSenha} type={"password"} value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} error={loginData.error} />
    ]


    return(
        <Container 
        type={"auth"}
        content={<>
            <div className={"h-40 flex justify-center"}><Img img={Logo} /></div>
                <Text className={"text-center mt-6 text-4xl"} type={"h1"} text={text.labelTitle} />
                <CriaForm inputs={inputs} className={"my-2 grid-cols-1"} />
                <div className={"mx-10 "}>
                    <Button title={text.labelButton} className={"m-0 my-3 p-2 w-full "} onClick={(e) => sendLogin(e)} />
                    <Button type={"button"} title={text.labelButtonRegister} className={"m-0 my-3 p-2 w-full "} onClick={() => { goToPage('/registro') }} />
                </div>
                </>
        }/>
    )
   
}

export default Login