import useAxios from "axios-hooks"
import { useEffect, useState } from "react"
import Button from "../components/Button"
import CriaForm from "../components/Criaform"
import Input from "../components/Input"
import { Pacientes } from "../types/types"
import Text from "../components/Text"
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom"
import { FaTrashAlt, FaPen, FaPrint } from "react-icons/fa";
import { delay } from "../service/delay"
import ListaCompCorp from "../components/ListaComposicaoCorporal"
import ListaAvAntropometrica from "../components/ListaAvAntropometrica"
import Select from "../components/Select"
import { pacienteSchema } from "../schemas/pacienteSchema"
import { setFormErrorsValid } from "../service/formValidation"
import Container from "../components/Container"

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
    labelPrint:"Gerar Laudo"
}

const PacientePage = ({ }) => {
    const params = useParams()
    const id = params.id;
    const navigate = useNavigate();
    const goToPage = (page: string) => { navigate(page) }


    const forminicial: Pacientes = {

        nome: "",
        idade: 0,
        sexo: "",
        data_nascimento: "",
        data_cadastro: "",
        email: "",
        cpf: "",
        celular: "",
        user:0,
    }

    const [form, setForm] = useState(forminicial);
    const [disabled, setDisabled] = useState(true)
    const [errors, setErrors] = useState<any>({
        nome: "",
        idade: "",
        sexo: "",
        data_nascimento: "",
        data_cadastro: "",
        email: "",
        cpf: "",
        celular: ""
    })

    const [{ data: infoPaciente }, getPaciente] = useAxios<Pacientes>(
        {
            url: `/pacientes/${id}`,
            method: "get",
        },
        {
            manual: true,
        }
    );

    const [, editPaciente] = useAxios<Pacientes>(
        {
            url: `/pacientes/${id}`,
            method: "patch",
        },
        {
            manual: true,
        }
    )

    const [, deletePaciente] = useAxios<Pacientes>(
        {
            url: `/pacientes/${id}`,
            method: "delete",
        },
        {
            manual: true,
        }
    );


    const editarForm = () => {
        setDisabled(!disabled)
    }

    const atualizaForm = async(e: any) => {

        e.preventDefault();

        const validForm = await pacienteSchema.safeParseAsync(form);

        const erros: any = {
            nome: "",
            idade: "",
            sexo: "",
            data_nascimento: "",
            data_cadastro: "",
            email: "",
            cpf: "",
            celular: ""
        }

        if (!validForm.success) {



            setFormErrorsValid(validForm, errors, setErrors, erros)
            console.log(errors)
            return false
        }

        const { nome, idade, sexo, email, celular, cpf, data_nascimento } = validForm.data
        await editPaciente({
            data: {
                nome: nome,
                idade: idade,
                sexo: sexo,
                data_nascimento: data_nascimento,
                cpf: cpf,
                email: email,
                celular: celular
            }
        })

        setErrors(erros)

        console.log("Atualizado")
        setDisabled(true)
    }

    const deletaForm = async () => {
        deletePaciente()
        await delay(0.5)
        goToPage(`/pacientes`)
    }

    useEffect(() => {
        getPaciente()
        console.log(infoPaciente)
        console.log("Atualizado")
    }, [])

    useEffect(() => {
        if (infoPaciente) {
            setForm({...infoPaciente,idade:String(infoPaciente.idade)});
        }
    }, [infoPaciente]);

    const inputs = [

        <Input label={text.labelNome} onChange={(e: any) => setForm({ ...form, nome: e.target.value })} value={form.nome} disabled={disabled} error={errors.nome}/>,
        <Input label={text.labelIdade} onChange={(e: any) => setForm({ ...form, idade:e.target.value })} value={form.idade} disabled={disabled} error={errors.idade}/>,
        <Select label={"Sexo"} value={form.sexo} onChange={(e: any) => setForm({ ...form, sexo: e.target.value })} error={errors.sexo}
        options={[
            <option value={"Masculino"}>Masculino</option>,
            <option value={"Feminino"}>Feminino</option>,]
        } disabled={disabled} />,
        <Input label={text.labelCpf} onChange={(e: any) => setForm({ ...form, cpf: e.target.value })} value={form.cpf} disabled={disabled} error={errors.cpf}/>,
        <Input label={text.labelCelular} onChange={(e: any) => setForm({ ...form, celular: e.target.value })} value={form.celular} disabled={disabled} error={errors.celular}/>,
        <Input label={text.labelEmail} onChange={(e: any) => setForm({ ...form, email: e.target.value })} value={form.email} disabled={disabled} error={errors.email}/>,
        <Input label={text.labelData_Nascimento} onChange={(e: any) => setForm({ ...form, data_nascimento: e.target.value })} value={form.data_nascimento} disabled={disabled} error={errors.data_nascimento}/>,
        <Input label={text.labelData_Cadastro} onChange={(e: any) => setForm({ ...form, data_cadastro: e.target.value })} value={form.data_cadastro} disabled={true} error={errors.nome}/>,
    ]

    return (<>
    <Container type={"large"} 
            content={<>
            <form className={""}>
                <Text className={"text-center mt-6 text-4xl"} type={"h1"} text={`${form.nome}`} />
                <CriaForm inputs={inputs} className={"grid-cols-1 md:grid-cols-2 lg:grid-cols-3"} />


            </form>

            <button className={`absolute  top-2 left-6 ${disabled ? "hidden" : ""}`}>{<FaTrashAlt className={"text-red-700 h-10 w-5"} onClick={async()=>await deletaForm()} />}</button>
            <button className={`absolute top-3 right-6`}>{<FaPen className={"text-blue-500 hover:text-blue-800 h-10 w-5"} onClick={() => { editarForm() }} title={text.labelPen} />}</button>
            {/* <button className={`absolute top-3 right-16`}>{<FaPrint className={"text-blue-500 hover:text-blue-800 h-10 w-5"} onClick={() => { goToPage(`/laudo/${id}`) }} title={text.labelPrint} />}</button> */}
            <div className={`mx-10 ${disabled ? "hidden" : ""}`}>
                <Button title={text.labelButtonAtualizar} className={"m-0 p-2 w-full md:absolute md:right-12 md:bottom-6 md:w-60"} onClick={async(e)=>await atualizaForm(e)} />
            </div>
         </>}   
        />

        <div>
            <ListaCompCorp />
            <ListaAvAntropometrica />
        </div>
    </>)
}

export default PacientePage