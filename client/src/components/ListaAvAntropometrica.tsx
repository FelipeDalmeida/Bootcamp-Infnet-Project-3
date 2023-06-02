import Button from './Button';
import { useAxios } from '../service/useAxios'
import type { Antropometrica } from '../types/types';
import Text from './Text';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import { useParams } from 'react-router-dom';
import ArrowSearch from './ArrowSearch';
import { FaPlusCircle } from 'react-icons/fa';
import Tools from './Tools';
import Select from './Select';
import Container from './Container';

const text = {
    labelEstatura: "Estatura",
    labelComprimento_Pe: "Comprimento do Pé",
    labelAltura_Ombro: "Altura do Ombro",
    labelLargura_Ombro: "Largura do Ombro",
    labelEnvergadura: "Envergadura",
    labelAltura_Quadril: "Altura do Quadril",
    labelLargura_Quadril: "Largura do Quadril",
    labelAltura_Joelho: "Altura do Joelho",
    labelAltura_Tornozelo: "Altura do Tornozelo",
    labelData_Avaliacao: "Data da Avaliação",
    labelTitle: "Avaliação Antropometrica",
    labelNoList: "Sem avaliações cadastradas",
    labelButtonCadastrar: "Cadastar Avaliação",
    tools: "Configurações de pesquisa",
    limit: "Quantidade",
    changeConfig: "Salvar",
    direction: "Direção"
}

const ListaAvAntropometrica = ({ }) => {

    const navigate = useNavigate();
    const goToPage = (page: string) => { navigate(page) }
    const params = useParams()
    const id = params.id;

    const [openModal, setOpenModal] = useState(false)
    const [btnDisable, isBtnDisabled] = useState({
        btnNext: false,
        btnPrevious: true,
    })

    const [examesParams, setExamesParams] = useState({
        offset: 0,
        direction: "desc",
        limit: 5,
        orderby: "data_avaliacao",
    })




    const [{
        data: { count: examesCount, exames: listaAvAntropometrica } = {
            count: 0,
            exames: []
        }
    }, getAvAntropometrica] = useAxios<{ count: number, exames: Antropometrica[] }>({
        url: `exames/avantropometrica/all/${id}`,
        method: "get",
    });


    const setParams = async () => {
        await getAvAntropometrica({
            params: examesParams,
        })
        if (examesParams.limit >= Number(examesCount)) {
            isBtnDisabled({
                btnNext: true,
                btnPrevious: true,
            })
        } else if (examesParams.limit <= Number(examesCount)) {
            isBtnDisabled({
                ...btnDisable,
                btnNext: false,
            })
        }
    }


    useEffect(() => {
        getAvAntropometrica({
            params: examesParams,
        }).then((res) => {
            if (examesParams.limit >= Number(res.data.count)) {
                isBtnDisabled({
                    btnNext: true,
                    btnPrevious: true,
                })
            } else if (examesParams.limit <= Number(res.data.count)) {
                isBtnDisabled({
                    ...btnDisable,
                    btnNext: false,
                })
            }

        })
        console.log("Atualizado")
    }, [])

    return (
        <Container type={"large"}
            content={<>
                <Text className={"text-center mb-10 text-4xl"} type={"h1"} text={text.labelTitle} />

                <Tools
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    modalTitle={text.tools}
                    content={
                        <div className={"grid grid-cols-12 gap-4"}>
                            <Select
                                value={examesParams.limit}
                                onChange={(e) => { setExamesParams({ ...examesParams, limit: Number(e.target.value) }) }}
                                divClassName={"col-span-12 md:col-span-6"}
                                label={text.limit}
                                options={
                                    [
                                        <option value={5}>5</option>,
                                        <option value={10}>10</option>,
                                        <option value={15}>15</option>,
                                        <option value={20}>20</option>,
                                        <option value={25}>25</option>
                                    ]
                                }
                            />
                            <Select
                                value={examesParams.direction}
                                onChange={(e) => { setExamesParams({ ...examesParams, direction: e.target.value }) }}
                                divClassName={"col-span-12 md:col-span-6"}
                                label={text.direction}
                                options={
                                    [
                                        <option value={"asc"}>Mais Antigos</option>,
                                        <option value={"desc"}>Mais Novos</option>
                                    ]
                                }
                            />
                        </div>}
                    lowerContent={
                        <Button title={text.changeConfig} onClick={() => { setParams(); setOpenModal(false) }} />
                    }
                />

                <div className={"border-b  border-b-blue-400 px-10 grid grid-cols-2 sm:grid-cols-5  gap-0"}>
                    <div className={"self-center hidden sm:block col-start-0 col-span-4"}><Text className={"font-bold text-center sm:text-left"} text={text.labelData_Avaliacao} /></div>
                    <div className={"self-center hidden sm:block"}></div>
                </div>

                <>{listaAvAntropometrica ? (listaAvAntropometrica?.length > 0) ? listaAvAntropometrica.map(({
                    id,
                    data_avaliacao,
                }: Antropometrica, index: number) => {



                    return <div className={" border-b  border-b-blue-400  px-10 grid grid-cols-2 sm:grid-cols-5  gap-0 "} key={index}>

                        <div className={"self-center col-start-0 col-span-4 text-center sm:text-left"}><Text className={"sm:hidden font-bold text-center"} text={text.labelData_Avaliacao} />{`${data_avaliacao}`}</div>

                        <Button title={"Exibir"} className={"w-full col-start-0 col-span-2 sm:col-start-5 sm:w-30 "} onClick={() => goToPage(`/antropometrica/${id}`)} />
                    </div>


                }) : <Text className={"text-rose-700 text-center my-10 text-3xl"} type={"h2"} text={text.labelNoList} /> :
                    <Text className={"text-rose-700 text-center my-10 text-3xl"} type={"h2"} text={text.labelNoList} />}</>

                <button title='Adicionar Avaliação' className={`absolute top-3 right-6`}>{<FaPlusCircle className={"text-3xl text-blue-500 hover:text-blue-800 h-10 w-10"} onClick={() => goToPage(`/cadastroantropometrica/${id}`)} />}</button>
                {(listaAvAntropometrica?.length > 0) ?
                    <ArrowSearch
                        btnDisableNext={btnDisable.btnNext}
                        btnDisablePrev={btnDisable.btnPrevious}
                        isBtnDisabled={isBtnDisabled}
                        Params={examesParams}
                        setParams={setExamesParams}
                        count={examesCount}
                        get={getAvAntropometrica}
                    />
                    : ""}

            </>}
        />)


}


export default ListaAvAntropometrica