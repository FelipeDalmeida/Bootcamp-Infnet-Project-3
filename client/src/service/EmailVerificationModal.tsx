import { useState } from "react"
import Modal from "../components/Modal"
import Input from "../components/Input"
import Button from "../components/Button"
import { useGlobalStore } from "./useGlobalStore"
import { requestEmailVerificationCode } from "./api/requestVerificationCode"
import { verifyEmail } from "./api/verifyEmail"


const text = {
    title: "Verifique seu e-mail",
    content(email: string) {
        return (
            <>
                É necessário que você verifique o seu email. Por favor,
                digite o código enviado para o email: <strong>{email}</strong>.
            </>
        );
    },
    inputLabel: "Código",
    buttonTitle: "Enviar",
    resendEmail: "Não recebeu o email?",
    resendEmailLink: "Solicite um novo código.",
    resendEmailSuccess: "Um novo código foi enviado para o seu email!",
    resendEmailFailure: "Houve um erro ao enviar um novo código.",
    verifyEmailSuccess: "Seu email foi verificado com sucesso!",
    verifyEmailFailure:
        "Houve um erro ao verificar o seu email.",
}

export function EmailVerificationModal() {
    const user = useGlobalStore((state) => state.user);
    const setUser = useGlobalStore((state) => state.setUser);
    const [open, setOpen] = useState(!user.isEmailVerified);
    const [code,setCode] = useState("")
    const [error,setErro]=useState("")


    const contentModal = <div className={"text-start md:text-justify"}>
        {text.content(user.email)}

    </div>


    const lowerContentModal = <div className={"flex w-full flex-col "}>
        <Input label={text.inputLabel} className={"!mx-0"} value={code} onChange={(e)=>setCode(e.target.value)} error={error}/>
        <Button title={text.buttonTitle} className={"w-full !m-0 !my-2 p-2 "} onClick={(e) => {verify(e)}} />
        <p className="text-sm text-500 leading-tight">
            {text.resendEmail}{" "}
            <button className="text-blue-500 text-bold hover:underline cursor-pointer" onClick={() => { onRequestEmailVerificationCode() }}>
                {text.resendEmailLink}
            </button>
        </p>
    </div>


    async function onRequestEmailVerificationCode() {
        const { success } = await requestEmailVerificationCode();
        if (success) {
            alert(text.resendEmailSuccess)
        } else {
            alert(text.resendEmailFailure)
        }
    }

    async function verify(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const { success } = await verifyEmail(code,user.id);
        if (success) {
            setErro("");
            setUser({ isEmailVerified: true });
            setOpen(false)
        } else {
            setErro(text.verifyEmailFailure);
        }
    }


    return <Modal
        open={open}
        setOpen={setOpen}
        neverCloseModal={true}
        title={text.title}
        content={contentModal}
        lowerContent={lowerContentModal}
    />
}

// export default EmailVerificationModal