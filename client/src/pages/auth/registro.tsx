import CriaForm from "../../components/Criaform"
import Input from "../../components/Input"
import Text from "../../components/Text"
import Button from "../../components/Button"
import { useState } from "react"
import Img from "../../components/Img"
import Logo from '../../assets/img/logo192.png'
import { useNavigate } from "react-router-dom"
import { useAxios } from "../../service/useAxios"
import { criaNome } from "../../service/stringManipulation"
import { AuthToken } from "../../service/authToken"
import { useGlobalStore } from "../../service/useGlobalStore"
//import { register } from "../../service/api/register"

//@TODO: Deletar ou o useAxios ou o API

const text = {
    labelEmail: "E-mail",
    labelSenha: "Senha",
    labelNome: "Nome",
    labelConfirmEmail: "Confirme o e-mail",
    labelTitle: "Registro",
    labelButton: "Registrar",
    labelButtonLogin: "Ir para Login"
}

const Register = () => {
    const navigate = useNavigate();
    const goToPage = (page: string) => { navigate(`${page}`) }

    const setUser = useGlobalStore((state) => state.setUser);
    const [registro, setRegistro] = useState({ nome: "", email: "", password: "", error: "", confirmEmail: "", emailError: "" })

    const [, realizaRegistro] = useAxios(
        {
            url: '/auth/register',
            method: 'post',
            data: {
                nome: registro.nome,
                email: registro.email,
                password: registro.password
            },

        },

        {
            manual: true,
        }
    )


    const registar = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (registro.email === registro.confirmEmail) {
            setRegistro({ ...registro, emailError: "" })
            await realizaRegistro().then(response => {
                if (response) {
                    const { accessToken, user } = response.data;
                    AuthToken.set(accessToken);
                    setUser({ ...user, isAuthenticated: true });
                    goToPage("/cadastro")
                }
            }).catch((error) => {
                console.log(error, error)
                if (error) {
                    setRegistro({ ...registro, error: "Erro no registro" })
                }
            })
        } else {
            setRegistro({ ...registro, emailError: "E-mail diferente!" })
        }

        // if(registro.email===registro.confirmEmail){
        //     setRegistro({ ...registro, emailError: "" })

        //     const response = await register({
        //         nome:registro.nome,
        //         email:registro.email,
        //         password:registro.password
        //     })

        //     if(response.success &&response.accessToken){
        //         const { accessToken, user } = response;
        //         AuthToken.set(accessToken)
        //         setUser({ ...user, isAuthenticated: true });
        //         goToPage("/cadastro") 
        //     } else if(!response){
        //         setRegistro({ ...registro, error: "Erro no registro" })
        //     }
        // } else {
        //     setRegistro({ ...registro, emailError: "E-mail diferente!" })
        // }




    }

    const inputs = [
        <Input label={text.labelNome} type={"email"} value={registro.nome} onChange={(e) => setRegistro({ ...registro, nome: e.target.value })} />,
        <Input label={text.labelEmail} type={"email"} value={registro.email} onChange={(e) => setRegistro({ ...registro, email: e.target.value })} />,
        <Input label={text.labelConfirmEmail} type={"email"} value={registro.confirmEmail} onChange={(e) => setRegistro({ ...registro, confirmEmail: e.target.value })} error={registro.emailError} />,
        <Input label={text.labelSenha} type={"password"} value={registro.password} onChange={(e) => setRegistro({ ...registro, password: e.target.value })} error={registro.error} />,

    ]

    return <div className={"h-auto p-2 grid grid-cols-12 gap-4 "}>

        <div className={"sm:relative my-10 pb-10 border border-slate-200 rounded-2xl shadow-2xl shadow-blue-500/50  box-border  col-start-0 col-span-12 md:col-start-4 md:col-span-6 lg:col-start-5 lg:col-span-4"}>
            <div className={"h-40 flex justify-center"}><Img img={Logo} /></div>
            <Text className={"text-center mt-6 text-4xl"} type={"h1"} text={text.labelTitle} />
            <CriaForm inputs={inputs} className={"my-2 grid-cols-1"} />

            <div className={"mx-10 "}>
                <Button type={"submit"} title={text.labelButton} className={"m-0 my-3 p-2 w-full "} onClick={registar} />
                <Button type={"button"} title={text.labelButtonLogin} className={"m-0 my-3 p-2 w-full "} onClick={() => { goToPage('/') }} />
            </div>
        </div>
    </div>
}

export default Register