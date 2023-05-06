import useAxios from "axios-hooks";
import { User } from "../../types/types";
import { useEffect, useState } from "react";
import { stringify } from "querystring";

const text = {
    labelNome: "Nome",
    labelIdade: "Idade",
    labelSexo: "Sexo",
    labelData_Nascimento: "Data de nasciemnto",
    labelData_Cadastro: "Data de Cadastro",
    labelButtonAtualizar: "Atualizar",
    labelPen: "Editar Paciente",
    labelCpf: "CPF",
    labelCelular: "Celular",
    labelEmail: "E-mail",
    labelPrint: "Gerar Laudo"
}


const Usuario = ({ }) => {




    const [
        {
            data: infoUsuario
        }, 
        getUsuario] = useAxios<Partial<User>>(
            {
                url: `/auth/user`,
                method: "get",
            },
            {
                manual: true,
            }
        );


    useEffect(() => {
        getUsuario().then(response => {
            console.log(response.data)
        })

    }, [])

    return <>{infoUsuario?JSON.stringify(infoUsuario):""}</>
}

export default Usuario