import { DivBox, DivBoxGray, DivBoxInfoMobile, DivBoxMobile, ItemListReward, SpanInfo, SpanInfoMobile, TitleInfo, TitleInfoMobile } from "./style"

interface iCardReward {
    rescue_code?: string;
    status?: string;
    data?: string;
    recompensa?: string;
    nome_bar?: string;
}

const CardReward = ({ rescue_code, status, data, recompensa, nome_bar }: iCardReward) => {
    return (
        <ItemListReward>
            <DivBox>
                <TitleInfo>Código:</TitleInfo>
                <TitleInfo>Status:</TitleInfo>
                <TitleInfo>Data:</TitleInfo>
                <TitleInfo>Recompensa:</TitleInfo>
                <TitleInfo>Nome do Bar:</TitleInfo>
            </DivBox>

            <DivBoxGray>
                <SpanInfo>{rescue_code}</SpanInfo>
                <SpanInfo>{status}</SpanInfo>
                <SpanInfo>{data}</SpanInfo>
                <SpanInfo>{recompensa}</SpanInfo>
                <SpanInfo>{nome_bar}</SpanInfo>
            </DivBoxGray>

            <DivBoxMobile>
                <DivBoxInfoMobile>
                    <TitleInfoMobile>ID Recompensa:</TitleInfoMobile>
                    <SpanInfoMobile>{rescue_code}</SpanInfoMobile>
                </DivBoxInfoMobile>

                <DivBoxInfoMobile>
                    <TitleInfoMobile>Status:</TitleInfoMobile>
                    <SpanInfoMobile>{status}</SpanInfoMobile>
                </DivBoxInfoMobile>

                <DivBoxInfoMobile>
                    <TitleInfoMobile>Data:</TitleInfoMobile>
                    <SpanInfoMobile>{data}</SpanInfoMobile>
                </DivBoxInfoMobile>

                <DivBoxInfoMobile>
                    <TitleInfoMobile>Recompensa:</TitleInfoMobile>
                    <SpanInfoMobile>{recompensa}</SpanInfoMobile>
                </DivBoxInfoMobile>


                <DivBoxInfoMobile>
                    <TitleInfoMobile>Nome do Bar:</TitleInfoMobile>
                    <SpanInfoMobile>{nome_bar}</SpanInfoMobile>
                </DivBoxInfoMobile>
            </DivBoxMobile>
        </ItemListReward>
    )
}

const CardRewardWithoutTitle = ({ rescue_code, status, data, recompensa, nome_bar }: iCardReward) => {
    return (
        <ItemListReward>
            <DivBoxGray>
                <SpanInfo>{rescue_code}</SpanInfo>
                <SpanInfo>{status}</SpanInfo>
                <SpanInfo>{data}</SpanInfo>
                <SpanInfo>{recompensa}</SpanInfo>
                <SpanInfo>{nome_bar}</SpanInfo>
            </DivBoxGray>

            <DivBoxMobile>
                <DivBoxInfoMobile>
                    <TitleInfoMobile>ID Recompensa:</TitleInfoMobile>
                    <SpanInfoMobile>{rescue_code}</SpanInfoMobile>
                </DivBoxInfoMobile>

                <DivBoxInfoMobile>
                    <TitleInfoMobile>Status:</TitleInfoMobile>
                    <SpanInfoMobile>{status}</SpanInfoMobile>
                </DivBoxInfoMobile>

                <DivBoxInfoMobile>
                    <TitleInfoMobile>Data:</TitleInfoMobile>
                    <SpanInfoMobile>{data}</SpanInfoMobile>
                </DivBoxInfoMobile>

                <DivBoxInfoMobile>
                    <TitleInfoMobile>Recompensa:</TitleInfoMobile>
                    <SpanInfoMobile>{recompensa}</SpanInfoMobile>
                </DivBoxInfoMobile>

                <DivBoxInfoMobile>
                    <TitleInfoMobile>Nome do bar:</TitleInfoMobile>
                    <SpanInfoMobile>{nome_bar}</SpanInfoMobile>
                </DivBoxInfoMobile>
            </DivBoxMobile>
        </ItemListReward>
    )
}

export { CardReward, CardRewardWithoutTitle }