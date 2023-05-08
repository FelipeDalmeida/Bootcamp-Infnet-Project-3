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
    const [
        {
            data: { accessToken, user } = {
                accessToken: "",
                user: {}
            }
        },
        realizaLogin] = useAxios<{ accessToken: string; user: Partial<User>; }>(
            {
                url: '/auth/login',
                method: 'post',
                data: loginData,

            },

            {
                manual: true,
            }
        )




    const sendLogin = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();



        await realizaLogin().then(response => {
            if (response) {
                console.log(response.data.user)
                AuthToken.set(response.data.accessToken);


                setLoginData({ ...loginData, error: "" })
                setUser({ ...user, isAuthenticated: true,...response.data.user });

                goToPage("/usuario")
                // const nome = criaNome(loginData.email)

                
                // setUser(nome)
            }
        })
            .catch((error) => {
                if (error) {
                    setLoginData({ ...loginData, error: "Erro de Login" })
                    console.log(error)

                }
            })

    }


    const inputs = [
        <Input label={text.labelEmail} type={"email"} value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />,
        <Input label={text.labelSenha} type={"password"} value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} error={loginData.error} />
    ]

    return <div className={"h-auto p-2 grid grid-cols-12 gap-4 "}>

        <div className={"sm:relative my-10 pb-10 border border-slate-200 rounded-2xl shadow-2xl shadow-blue-500/50  box-border  col-start-0 col-span-12 md:col-start-4 md:col-span-6 lg:col-start-5 lg:col-span-4"}>
            <div className={"h-40 flex justify-center"}><Img img={Logo} /></div>
            <Text className={"text-center mt-6 text-4xl"} type={"h1"} text={text.labelTitle} />
            <CriaForm inputs={inputs} className={"my-2 grid-cols-1"} />
            <div className={"mx-10 "}>
                <Button title={text.labelButton} className={"m-0 my-3 p-2 w-full "} onClick={(e)=>sendLogin(e)} />
                <Button type={"button"} title={text.labelButtonRegister} className={"m-0 my-3 p-2 w-full "} onClick={() => { goToPage('/registro') }} />
            </div>
        </div>
    </div>
}

export default Login