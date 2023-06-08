import { User } from "../types/types";
import { useEffect, useState } from "react";
import Input from "../components/Input";
import CriaForm from "../components/Criaform";
import { uploadAvatar } from "../service/api/uploadAvatar";
import { useGlobalStore } from "../service/useGlobalStore";
import { getMyself } from "../service/api/getMyself";
import Container from "../components/Container";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import Button from "../components/Button";
import { patchMyself } from "../service/api/patchMyself";
import { useNavigate } from "react-router-dom";


const text = {
    labelNome: "Nome",
    labelEmail: "E-mail",
    labelPrint: "Gerar Laudo",
    uploadSuccess: "Upload feito com sucesso!",
    uploadFailure: "Erro no upload!",
    labelButtonAtualizar: "Atualizar",
    labelAtualizacaoSuccess: "Atualizado com sucesso",
    labelAtualizacaoFail: "Falha na atualização",
    labelTrocarSenha:"Trocar senha"
}

const usuarioDefault: User = {
    id: 0,
    nome: "",
    email: "",
    userPicture: null
}


const Usuario = () => {
    const navigate = useNavigate();
    const goToPage = (page: string) => { navigate(`${page}`) }
    const [usuario, setUsuario] = useState<User>(usuarioDefault)
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        getMyself().then((user) => {
            setUsuario(user);
        });
    }, [])


    const editarForm = () => {
        setDisabled(!disabled)
    }

    async function onPictureSelect(e: React.ChangeEvent<HTMLInputElement>) {
        const picture = e.target.files?.[0];

        if (picture !== undefined) {
            const response = await uploadAvatar(picture);
            if (response.success) {
                alert(text.uploadSuccess);
                setUsuario({
                    ...usuario,
                    userPicture: `${response.pictureUrl}?${new Date().getTime()}`,
                });

            } else {
                alert(text.uploadFailure);
            }
        }
        //console.log("picture", usuario.userPicture)
    }


    const atualizaUsuario = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const response = await patchMyself({
            nome: usuario.nome,
            email: usuario.email
        });

        if (response.success) {
            alert(text.labelAtualizacaoSuccess)
            setDisabled(true)
            //console.log(response)
        } else {
            alert(text.labelAtualizacaoFail)
        }

    }

    const inputs = [
        <Input label={text.labelNome} type={"text"} onChange={(e) => setUsuario({ ...usuario, nome: e.target.value })} value={usuario.nome} disabled={disabled} />,
        <Input label={text.labelEmail} type={"email"} onChange={(e) => setUsuario({ ...usuario, email: e.target.value })} value={usuario.email} disabled={disabled} />,
    ]

    return (
        <Container type={"small"}
            content={<>
                <div className={"h-40 flex justify-center items-center"}>
                    <input
                        type="file"
                        accept="image/jpeg"
                        id="select-picture"
                        className="hidden"
                        onChange={(e) => onPictureSelect(e)}
                    />
                    <label htmlFor="select-picture" className="cursor-pointer">
                        <img
                            src={
                                usuario.userPicture
                                    ? `http://localhost:8080/${usuario.userPicture}`
                                    : "/default-avatar.png"
                            }
                            className="w-24 h-24 rounded-full"
                        />
                    </label>
                </div>
                <CriaForm inputs={inputs} className={"my-2 grid-cols-1"} />
                {/* <button className={`absolute  top-2 left-6 ${disabled ? "hidden" : ""}`}>{<FaTrashAlt className={"text-red-700 h-10 w-5"} onClick={() => { console.log("deletaForm") }} />}</button> */}
                <button className={`absolute top-3 right-6`}>{<FaPen className={"text-sky-700 h-10 w-5"} onClick={() => { editarForm() }} />}</button>
                <div className={`mx-10 ${disabled ? "hidden" : ""}`}>
                    <Button title={text.labelButtonAtualizar} className={"m-0 p-2 w-full md:absolute md:right-12 md:bottom-6 md:w-60"} onClick={async (e) => await atualizaUsuario(e)} />
                    {/* <p className="text-sm text-500 leading-tight">
                        <button className="text-blue-500 text-bold hover:underline cursor-pointer" onClick={() => { goToPage('/password-change') }}>
                            {text.labelTrocarSenha}
                        </button>
                    </p> */}
                </div>
            </>}
        />)
}

export default Usuario