import useAxios from "axios-hooks";
import { User } from "../types/types";
import { useEffect, useState } from "react";
import Input from "../components/Input";
import CriaForm from "../components/Criaform";
import { uploadAvatar } from "../service/api/uploadAvatar";


const text = {
    labelNome: "Nome",
    labelEmail: "E-mail",
    labelPrint: "Gerar Laudo",
    uploadSuccess: "Upload feito com sucesso!",
    uploadFailure: "Erro no upload!"

}

const usuarioDefault: User = {
    id: 0,
    nome: "",
    email: "",
    userPicture: null
}


const Usuario = () => {


    const [usuario, setUsuario] = useState<User>(usuarioDefault)
    const [
        {
            data: infoUsuario
        },
        getUsuario] = useAxios<User>(
            {
                url: `/users/myself`,
                method: "get",
            },
            {
                manual: true,
            }
        );


    useEffect(() => {
        getUsuario().then(response => {
            console.log(response.data)
            if (response.data) {
                console.log(response.data)
                setUsuario({
                    id: response.data.id,
                    nome: response.data.nome,
                    email: response.data.email,
                    userPicture: response.data.userPicture
                })
            }

        })

    }, [])

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
        console.log("picture",usuario.userPicture)
    }

    const inputs = [
        <Input label={text.labelNome} type={"text"} value={usuario.nome} disabled={true} />,
        <Input label={text.labelEmail} type={"email"} value={usuario.email} disabled={true} />,
    ]

    return (<div className={"h-auto p-2 grid grid-cols-12 gap-4 "}>

        <div className={"sm:relative my-10 pb-10 border border-slate-200 rounded-2xl shadow-2xl shadow-blue-500/50  box-border  col-start-0 col-span-12 md:col-start-4 md:col-span-6 lg:col-start-5 lg:col-span-4"}>
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
        </div>
    </div>)
}

export default Usuario