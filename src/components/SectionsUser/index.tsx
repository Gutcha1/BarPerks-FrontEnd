import CardUser from "./CardUser"
import { FormSearchPub, FormUserAdminEdit, FormUserEdit, FormUserRegisterClient, FormUserRegisterPoints, FormUserRegisterProducts, FormUserSearchClient } from "./Form"
import { DivPlan, DivSearchPub, ListCards, ListCardsPub, ListCardsRewards, SectionUser, SpanName, Title, TitlePub } from "./style"
import { BiSolidUser } from "react-icons/bi"
import img from "../../assets/images/4seta-vector.svg"
import { CardReward, CardRewardWithoutTitle } from "./CardReward"
import CardPub from "./CardPub"
import { useContext } from "react"
import { ClientContext } from "../../contexts/clienteContext"
import { AdminContext } from "../../contexts/administradorContext"

const SectionUserAdminEdit = () => {
    const { adminInfo } = useContext(AdminContext)

    return (
        <SectionUser>
            <Title style={{fontSize: "var(--font-size-1)"}}>{ adminInfo?.photo_url ? <img style={{borderRadius: "50%", width: "42px", height: "42px"}} src={adminInfo.photo_url}/> : <BiSolidUser size="32px"/> }Detalhes do Estabelecimento</Title>
            <SpanName>{adminInfo?.name}</SpanName>

            <FormUserAdminEdit/>
        </SectionUser>
    )
}

const SectionRegisterPoints = () => {
    return (
        <SectionUser>
            <Title style={{justifyContent: "center", marginBottom: "10px"}}>Registrar Pontuação</Title>

            <FormUserRegisterPoints/>
        </SectionUser>
    )
}

const SectionRegisterProducts = () => {
    return (
        <SectionUser>
            <Title style={{justifyContent: "center", marginBottom: "30px"}}>Cadastrar Produtos</Title>

            <FormUserRegisterProducts/>
        </SectionUser>
    )
}

const SectionRegisterClient = () => {
    return (
        <SectionUser>
            <Title style={{justifyContent: "center", marginBottom: "30px"}}>Cadastrar Cliente</Title>

            <FormUserRegisterClient/>
        </SectionUser>
    )
}

const SectionSearchUser = () => {
    const { searchUser } = useContext(AdminContext)

    return (
        <SectionUser>
            <Title style={{justifyContent: "center", marginBottom: "30px"}}>Buscar Usuário</Title>

            <FormUserSearchClient/>

            <ListCards>
                {
                    searchUser.length > 0 ? searchUser.map((item, index) => {
                    return (
                        <CardUser key={index} id={item.id} client_id={item.client.id} name={item.name} cpf={item.cpf} email={item.email} telephone={item.telephone} photo_url={item.client.photo_url ? item.client.photo_url : img}/>
                    );
                  }): null
                }
            </ListCards>
        </SectionUser>
    )
}

const SectionUserEdit = () => {
    const { clientInfo } = useContext(ClientContext)

    return (
        <SectionUser>
            <Title style={{fontSize: "var(--font-size-1)"}}>{clientInfo?.photo_url ? <img style={{width: "42px", height: "42px", borderRadius: "50%"}} src={clientInfo.photo_url} alt="image-user"/> : <BiSolidUser size="32px"/>}Meu Perfil</Title>
            <SpanName>{clientInfo?.name}</SpanName>

            <FormUserEdit/>
        </SectionUser>
    )
}

const SectionRewardHistoric = () => {
    const { listHistoryRewards } = useContext(ClientContext)

    function formataStringData(data: string) {
        const ano  = data.split("-")[0];
        const mes  = data.split("-")[1];
        const dia  = data.split("-")[2];
      
        return `${dia}-${mes}-${ano}`;
    }

    return (
        <SectionUser style={{width: "100vw", padding: "0px"}}>
            <Title style={{justifyContent: "center", marginTop: "20px"}}>Histórico de Resgates</Title>

            <ListCardsRewards>
                {
                    listHistoryRewards.length > 0 ? 
                    <CardReward 
                        rescue_code={listHistoryRewards[0].code_rescue}
                        status={listHistoryRewards[0].status === "disponivel" ? "Disponível" : "Resgatada"} 
                        data={formataStringData(listHistoryRewards[0].date)} 
                        nome_bar={listHistoryRewards[0].pub.name}
                        recompensa={listHistoryRewards[0].reward_name}
                        key="1"                        
                    />
                    :
                    <CardReward
                    status=""
                    data=""
                    nome_bar=""
                    recompensa=""
                    key="1"                        
                />
                }
                {
                    listHistoryRewards.length > 1 ? 
                    listHistoryRewards.map((item, index) => {
                        if(index >= 1) {
                            return (
                                <CardRewardWithoutTitle
                                    rescue_code={item.code_rescue}
                                    status={item.status === 'disponivel' ? "Disponível" : "Resgatada"}
                                    data={formataStringData(item.date)}
                                    nome_bar={item.pub.name}
                                    recompensa={item.reward_name}
                                    key={index}
                                />
                            )
                        }
                    })
                    : null
                }
            </ListCardsRewards>
        </SectionUser>
    )
}

const SectionRedeemReward = () => {
    const { searchPub, listProducts, filterListProducts, setFilterListProducts } = useContext(ClientContext)

    function filterList(element: React.KeyboardEvent<HTMLInputElement>){
        // setFilterListProducts(listProducts)
        const target = element.target as HTMLInputElement;

        if(target.value){
            const listFilter = listProducts.filter((item) => {
                if(item.name.includes(target.value)){
                    return item
                }
            })

            setFilterListProducts(listFilter)
        }
        else{
            setFilterListProducts([])
        }
    }

    return (
        <SectionUser>
            <Title style={{justifyContent: "center", marginTop: "20px"}}>Resgatar Recompensas</Title>

            <FormSearchPub/>

            {
                searchPub ?
                <DivSearchPub>
                    <figure>
                        <img src={searchPub.pub.photo_url} alt="img-usuario"/>
                        <div>
                            <h2>{searchPub.pub.name}</h2>
                            <span>{`${searchPub.name} - ${searchPub.points}pts`}</span>
                        </div>
                    </figure>

                    <input type="text" placeholder="Buscar produto" onKeyUp={(element) => filterList(element)}/>
                </DivSearchPub> 
                : null
            }

            {
                listProducts.length > 0 && filterListProducts.length === 0 ?
                <ListCardsPub>
                    {
                        listProducts.map((item, index) => {
                            return (
                                <CardPub key={index} name={item.name} photo={item.photo_url} value={item.value}/>
                            )
                        })
                    }
                </ListCardsPub>
                : null
            }
            {
                filterListProducts.length > 0 ? 
                <ListCardsPub>
                    {
                        filterListProducts.map((item, index) => {
                            return (
                                <CardPub key={index} name={item.name} photo={item.photo_url} value={item.value}/>
                            )
                        })
                    }
                </ListCardsPub>                
                : null
            }
        </SectionUser>
    )
}

const SectionUserPlan = () => {
    const { adminInfo, buyPlan, plan } = useContext(AdminContext)

    const date: string[] = plan?.created_at ? plan.created_at.split('-') : ["0000", "00", "00"]
    const dateUpdate: string[] = plan?.updated_at ? plan.updated_at.split('-') : ["0000", "00", "00"]

    const initialDate = plan?.created_at === plan?.updated_at ? `${date[2]}-${date[1]}-${date[0]}` : `${dateUpdate[2]}-${dateUpdate[1]}-${dateUpdate[0]}`
    const expiresStandart = plan?.created_at === plan?.updated_at ? `${date[2]}-${+date[1] <= 6 ? +date[1] + 6 : +date[1] - 6}-${+date[1] > 6 ? +date[0] + 1 : date[0]}` : `${dateUpdate[2]}-${+dateUpdate[1] <= 6 ? +dateUpdate[1] + 6 : +dateUpdate[1] - 6}-${+dateUpdate[1] > 6 ? +dateUpdate[0] + 1 : dateUpdate[0]}`
    const expiresPremium = plan?.created_at === plan?.updated_at ? `${date[2]}-${date[1]}-${+date[0] + 1}` : `${dateUpdate[2]}-${dateUpdate[1]}-${+dateUpdate[0] + 1}`

    return (
        <SectionUser>
            <TitlePub>{adminInfo?.name}</TitlePub>

            <DivPlan>
                <h3>Assinaturas</h3>
                <span className="span">Gerencie suas assinaturas aqui</span>
                <span className="span-line"></span>

                <span className="span">Plano: {plan?.name} {plan?.name == "Sem Plano" ? "- limite de 100 clientes" : plan?.name == "Plano Padrão" ? "- limite de 500 clientes" : null}</span>
                <span className="span">Data de início: {initialDate}</span>
                <span className="span">Data de expiração: {plan?.name == "Sem Plano" ? "Sem Tempo Limite" : plan?.name == "Plano Premium" ? expiresPremium : expiresStandart}</span>

                {
                    plan?.name == "Sem Plano" ?
                    <>
                        <h3 className="title-plans">Planos Disponíveis para Compra</h3>
                        
                        <div className="box-btns">
                            <button type="button" className="btn-plan" onClick={() => buyPlan("padrao")}>Padrão</button>
                            <button type="button" className="btn-plan" onClick={() => buyPlan("premium")}>Premium</button>
                        </div>
                    </>
                    :
                    null                
                }

            </DivPlan>
        </SectionUser>
    )
}

export { 
    SectionUserAdminEdit, 
    SectionRegisterPoints,
    SectionRegisterProducts,
    SectionRegisterClient,
    SectionSearchUser,
    SectionUserEdit,
    SectionRewardHistoric,
    SectionRedeemReward,
    SectionUserPlan,
}