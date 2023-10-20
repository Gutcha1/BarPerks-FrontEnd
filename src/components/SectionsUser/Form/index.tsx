import { zodResolver } from "@hookform/resolvers/zod";
import { InputCalculatePoints, InputUser, InputUserRegisterClient, InputUserRegisterPoints, InputUserRegisterProduct, InputUserSearchClient } from "../Input"
import { DivBoxInput, DivBtns, Form, Label, Span, InputFile, DivInputsYellow, SpanFile, ButtonCalculate, DivInputCalculate, DivQrCode } from "./style"
import { SubmitHandler, useForm } from "react-hook-form";
import { iFormAdminEdit, iFormRegisterClient, iFormSearchClient, iFormSearchPub, iFormUserEdit, iFormUserRegisterPoints, iRegisterProduct } from "../../../interfaces/user/user.interface";
import { userEditSchema, userRegisterClientSchema, userRegisterPointsSchema, userRegisterProductSchema, userSearchClientSchema, userSearchPubSchema } from "../../../schemas/user.schema";
import { ButtonEditProducts, ButtonListRegisterClient, ButtonUser, ButtonUserSmall } from "../Button";
import { useCallback, useContext, useState } from "react";
import { ClientContext } from "../../../contexts/clienteContext";
import { useDropzone } from "react-dropzone";
import { AdminContext } from "../../../contexts/administradorContext";
import QrCode from "react-qr-code"

const FormUserAdminEdit = () => {
    const { dropFile, setFile, adminInfo, updateAdmin } = useContext(AdminContext)

    const onDrop = useCallback((file: File[]) => {
        setFile(file[0])
    }, [setFile])

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            "image/jpeg": [".jpg", ".jpeg"],
            "image/png": [".png"]
        }
    })

    const { register, handleSubmit, formState: { errors } } = useForm<iFormUserEdit>({
        resolver: zodResolver(userEditSchema),
    });

    const submitEditUser: SubmitHandler<iFormUserEdit> = (data: iFormUserEdit) => {
        const newData: iFormAdminEdit = {
            name: data.name ? data.name : adminInfo?.name,
            social_number: data.cpf ? data.cpf : adminInfo?.social_number,
            email: data.email ? data.email : adminInfo?.email,
            password: data.password ? data.password : '',
            telephone: data.telephone ? data.telephone : adminInfo?.telephone,
        }

        if (newData.password === ''){
            delete newData.password
        }
        
        updateAdmin(newData, adminInfo!.id)
    };

    return (
        <Form onSubmit={handleSubmit(submitEditUser)}>
            <DivBoxInput>
                <Label htmlFor="nome">Nome:</Label>
                <InputUser id="nome" name="name" type="text" register={register} placeholder={adminInfo?.name}/>
                { errors.name?.message ? <Span>{errors.name.message}</Span> : null }
            </DivBoxInput>

            <DivBoxInput>
                <Label htmlFor="cpf">CPF/CNPJ:</Label>
                <InputUser id="cpf" name="cpf" type="text" register={register} placeholder={adminInfo?.social_number}/>
                { errors.cpf?.message ? <Span>{errors.cpf.message}</Span> : null }
            </DivBoxInput>

            <DivBoxInput>
                <Label htmlFor="mail">Email:</Label>
                <InputUser id="mail" name="email" type="email" register={register} placeholder={adminInfo?.email}/>
                { errors.email?.message ? <Span>{errors.email.message}</Span> : null }
            </DivBoxInput>

            <DivBoxInput>
                <Label htmlFor="pass">Senha:</Label>
                <InputUser id="pass" name="password" type="password" register={register}/>
                { errors.password?.message ? <Span>{errors.password.message}</Span> : null }
            </DivBoxInput>

            <DivBoxInput>
                <Label htmlFor="confPassword">Redigite a Senha:</Label>
                <InputUser id="confPassword" name="passwordRepeated" type="password" register={register}/>
                { errors.passwordRepeated?.message ? <Span>{errors.passwordRepeated.message}</Span> : null }
            </DivBoxInput>

            <DivBoxInput>
                <Label htmlFor="telephone">Telefone/Celular:</Label>
                <InputUser id="telephone" name="telephone" type="text" register={register} placeholder={adminInfo?.telephone}/>
                { errors.telephone?.message ? <Span>{errors.telephone.message}</Span> : null }
            </DivBoxInput>

            <DivBoxInput { ...getRootProps() }>
                <Label htmlFor="photo">Foto:</Label>
                <InputFile id="photo" type="button" value="Escolher arquivo"/>
                <InputFile style={{display: "none"}} id="photo" placeholder="Escolher arquivo" { ...getInputProps() } />
                <span style={{display: 'flex', marginLeft: '5px', cursor: 'pointer'}}>{dropFile === null ? 'Nenhum arquivo selecionado...' : dropFile.name}</span>
            </DivBoxInput>

            <DivBtns>
                <ButtonUserSmall text="Remover Usuário" type="submit"/>
                <ButtonUserSmall text="Salvar" type="submit"/>
            </DivBtns>
        </Form>
    )
}

const FormUserRegisterPoints = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<iFormUserRegisterPoints>({
        resolver: zodResolver(userRegisterPointsSchema),
    });

    const submitRegisterPoints: SubmitHandler<iFormUserRegisterPoints> = async (data: iFormUserRegisterPoints) => {
        const newData = {
            name: "notname",
            cpf: data.cpf,
            points: value,
        }

        updatePointsRegisterClient(newData)
    };

    const [ value, setValue ] = useState('')
    const [ calculate, setCalculate ] = useState(false)
    const { updatePointsRegisterClient, linkQrCode } = useContext(AdminContext)

    return (
        <Form onSubmit={handleSubmit(submitRegisterPoints)} style={{alignItems: "center", gap: "15px", marginTop: "20px"}}>
            <InputUserRegisterPoints id="socialNumber" name="cpf" type="text" register={register} placeholder="CPF do cliente"/>
            { errors.cpf?.message ? <Span style={{marginTop: "-15px"}}>{errors.cpf.message}</Span> : null }

            <InputCalculatePoints register={register} setValue={setValue}/>
            { errors.points?.message ? <Span style={{marginTop: "-15px"}}>{errors.points.message}</Span> : null }

            <ButtonCalculate type="button" onClick={() => setCalculate(true)}>Calcular</ButtonCalculate>

            <DivInputCalculate>
                <h4>A pontuação gerada foi:</h4>
                <input type="text" placeholder="---" value={calculate && value !== "" ? `${value} pts` : ""}/>
            </DivInputCalculate>

            <ButtonUser type="submit" text="Registrar Pontuação"/>

            <DivQrCode>
                <h3>Valide sua pontuação. Basta escanear o QrCode:</h3>

                <QrCode
                    value={linkQrCode ? `${window.location.origin}/usuario/qrcode/${linkQrCode}` : ""}
                />

                <span>Ou digite o código:</span>

                <span className="link-qrcode">{linkQrCode}</span>
            </DivQrCode>
        </Form>
    )
}

const FormUserRegisterProducts = () => {
    const { registerProduct, dropFile, setFile } = useContext(AdminContext)

    const { register, handleSubmit, formState: { errors } } = useForm<iRegisterProduct>({
        resolver: zodResolver(userRegisterProductSchema),
    });

    const onDrop = useCallback((file: File[]) => {
        setFile(file[0])
    }, [setFile])

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            "image/jpeg": [".jpg", ".jpeg"],
            "image/png": [".png"]
        }
    })

    const submitProduct: SubmitHandler<iRegisterProduct> = (data: iRegisterProduct) => {
        registerProduct(data)
    };
    
    return (
        <Form onSubmit={handleSubmit(submitProduct)} style={{alignItems: "center", gap: "15px"}}>
            <InputUserRegisterProduct name="name" type="text" register={register} placeholder="Nome do Produto"/>
            { errors.name?.message ? <Span style={{marginTop: "-15px"}}>{errors.name.message}</Span> : null }

            <InputUserRegisterProduct name="code" type="text" register={register} placeholder="Código do Produto"/>
            { errors.code?.message ? <Span style={{marginTop: "-15px"}}>{errors.code.message}</Span> : null }

            <InputUserRegisterProduct name="value" type="text" register={register} placeholder="Pontos Necessários"/>
            { errors.value?.message ? <Span style={{marginTop: "-15px"}}>{errors.value.message}</Span> : null }

            <DivBoxInput { ...getRootProps() } style={{display: "flex", flexDirection: "column"}}>
                <Label style={{display: "flex"}} htmlFor="photo">Foto do produto:</Label>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <InputFile type="button" id="photo" value="Escolher arquivo"/>
                    <InputFile style={{display: "none"}} id="photo" placeholder="Escolher arquivo" { ...getInputProps() } />
                    <SpanFile>{dropFile === null ? 'Nenhum arquivo selecionado...' : dropFile.name}</SpanFile>
                </div>
            </DivBoxInput>

            <ButtonUser type="submit" text="Registrar Produto" margin="10px"/>
            <ButtonEditProducts/>
        </Form>
    )
}

const FormUserRegisterClient = () => {
    const { registerClient } = useContext(AdminContext)
    const { register, handleSubmit, formState: { errors } } = useForm<iFormRegisterClient>({
        resolver: zodResolver(userRegisterClientSchema),
    });


    const submitClient: SubmitHandler<iFormRegisterClient> = (data: iFormRegisterClient) => {
        data.points = "0"

        registerClient(data)
    };

    return (
        <Form style={{alignItems: "center", gap: "15px"}} onSubmit={handleSubmit(submitClient)}>
            <InputUserRegisterClient name="name" type="text" register={register} placeholder="Nome"/>
            { errors.name?.message ? <Span style={{marginTop: "-15px"}}>{errors.name.message}</Span> : null }

            <InputUserRegisterClient name="cpf" type="text" register={register} placeholder="CPF"/>
            { errors.cpf?.message ? <Span style={{marginTop: "-15px"}}>{errors.cpf.message}</Span> : null }

            <InputUserRegisterClient name="email" type="email" register={register} placeholder="E-mail"/>
            { errors.email?.message ? <Span style={{marginTop: "-15px"}}>{errors.email.message}</Span> : null }

            <InputUserRegisterClient name="telephone" type="text" register={register} placeholder="Telefone/Celular"/>
            { errors.telephone?.message ? <Span style={{marginTop: "-15px"}}>{errors.telephone.message}</Span> : null }

            <ButtonUser type="submit" text="Cadastrar" margin="30px"/>
        </Form>
    )
}

const FormUserSearchClient = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<iFormSearchClient>({
        resolver: zodResolver(userSearchClientSchema),
    });

    const { getClient } = useContext(AdminContext)

    const submitSearchClient: SubmitHandler<iFormSearchClient> = (data: iFormSearchClient) => {
        getClient(data)
    };

    return (
        <Form style={{alignItems: "center", gap: "15px"}} onSubmit={handleSubmit(submitSearchClient)}>
            <InputUserSearchClient name="name" type="text" register={register} placeholder="Nome"/>
            { errors.name?.message ? <Span style={{marginTop: "-15px"}}>{errors.name.message}</Span> : null }

            <InputUserSearchClient name="cpf" type="text" register={register} placeholder="CPF"/>
            { errors.cpf?.message ? <Span style={{marginTop: "-15px"}}>{errors.cpf.message}</Span> : null }

            <ButtonUser type="submit" text="Buscar" margin="20px"/>
            <ButtonListRegisterClient type="button" text="Lista Completa" margin="0px"/>
        </Form>
    )
}

const FormUserEdit = () => {
    const { clientInfo, dropFile, setFile, updateClient } = useContext(ClientContext)

    const onDrop = useCallback((file: File[]) => {
        setFile(file[0])
    }, [setFile])

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            "image/jpeg": [".jpg", ".jpeg"],
            "image/png": [".png"]
        }
    })

    const { register, handleSubmit, formState: { errors } } = useForm<iFormUserEdit>({
        resolver: zodResolver(userEditSchema),
    });

    const submitEditUser: SubmitHandler<iFormUserEdit> = (data: iFormUserEdit) => {
        const newData: iFormUserEdit = {
            name: data.name ? data.name : clientInfo?.name,
            birth_date: data.birth_date ? data.birth_date : clientInfo?.birth_date,
            cpf: data.cpf ? data.cpf : clientInfo?.cpf,
            email: data.email ? data.email : clientInfo?.email,
            password: data.password ? data.password : '',
            telephone: data.telephone ? data.telephone : clientInfo?.telephone,
        }

        if (newData.password === ''){
            delete newData.password
        }
        
        updateClient(newData, clientInfo!.id)
    };

    return (
        <Form onSubmit={handleSubmit(submitEditUser)}>
            <DivBoxInput>
                <Label htmlFor="nome">Nome:</Label>
                <InputUser id="nome" name="name" type="text" register={register} placeholder={clientInfo?.name}/>
                { errors.name?.message ? <Span>{errors.name.message}</Span> : null }
            </DivBoxInput>

            <DivBoxInput>
                <Label htmlFor="age">Data de Nascimento:</Label>
                <InputUser id="age" name="birth_date" type="text" register={register} placeholder={clientInfo?.birth_date}/>
                { errors.birth_date?.message ? <Span>{errors.birth_date.message}</Span> : null }
            </DivBoxInput>

            <DivBoxInput>
                <Label htmlFor="cpf">CPF:</Label>
                <InputUser id="cpf" name="cpf" type="text" register={register} placeholder={clientInfo?.cpf}/>
                { errors.cpf?.message ? <Span>{errors.cpf.message}</Span> : null }
            </DivBoxInput>

            <DivBoxInput>
                <Label htmlFor="mail">Email:</Label>
                <InputUser id="mail" name="email" type="email" register={register} placeholder={clientInfo?.email}/>
                { errors.email?.message ? <Span>{errors.email.message}</Span> : null }
            </DivBoxInput>

            <DivBoxInput>
                <Label htmlFor="pass">Senha:</Label>
                <InputUser id="pass" name="password" type="password" register={register}/>
                { errors.password?.message ? <Span>{errors.password.message}</Span> : null }
            </DivBoxInput>

            <DivBoxInput>
                <Label htmlFor="confPassword">Redigite a Senha:</Label>
                <InputUser id="confPassword" name="passwordRepeated" type="password" register={register}/>
                { errors.passwordRepeated?.message ? <Span>{errors.passwordRepeated.message}</Span> : null }
            </DivBoxInput>

            <DivBoxInput>
                <Label htmlFor="telephone">Telefone/Celular:</Label>
                <InputUser id="telephone" name="telephone" type="text" register={register} placeholder={clientInfo?.telephone}/>
                { errors.phone?.message ? <Span>{errors.phone.message}</Span> : null }
            </DivBoxInput>

            <DivBoxInput { ...getRootProps() }>
                <Label htmlFor="photo">Foto:</Label>
                <InputFile type="button" id="photo" value="Escolher arquivo"/>
                <InputFile style={{display: "none"}} id="photo" placeholder="Escolher arquivo" { ...getInputProps() } />
                <SpanFile>{dropFile === null ? 'Nenhum arquivo selecionado...' : dropFile.name}</SpanFile>
            </DivBoxInput>

            <DivBtns style={{marginTop: "10px"}}>
                <ButtonUserSmall text="Salvar" type="submit"/>
            </DivBtns>
        </Form>
    )
}

const FormSearchPub = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<iFormSearchPub>({
        resolver: zodResolver(userSearchPubSchema),
    });

    const { getPub } = useContext(ClientContext)

    const submitSearchPub: SubmitHandler<iFormSearchPub> = (data: iFormSearchPub) => {
        getPub(data)
    };

    return (
        <Form onSubmit={handleSubmit(submitSearchPub)}>
            <DivInputsYellow>
                <div>
                    <div>
                        <input type="text" placeholder="Nome do Bar" { ...register("name") }/>
                        { errors.name?.message ? <Span style={{margin: "0", color: "var(--grey-0)"}}>{errors.name.message}</Span> : null }
                    </div>
                    <div>
                        <input type="text" placeholder="CPF/CNPJ" { ...register("socialNumber") }/>
                        { errors.socialNumber?.message ? <Span style={{margin: "0", color: "var(--grey-0)"}}>{errors.socialNumber.message}</Span> : null }
                    </div>
                </div>

                <button type="submit">Buscar</button>
            </DivInputsYellow>
        </Form>
    )
}

export { 
    FormUserAdminEdit, 
    FormUserRegisterPoints, 
    FormUserRegisterProducts,
    FormUserRegisterClient,
    FormUserSearchClient,
    FormUserEdit,
    FormSearchPub
}