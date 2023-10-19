import { 
    HeaderGlobal, 
    DivBox, 
    Figure, 
    TitleLogo, 
    ImgLogo, 
    NavLinks, 
    LinkSection, 
    LinkLog, 
    BoxLinkLog, 
    MenuIcon,
    CloseMenuIcon,
    LinkSectionMobile,
    NavLinksMobile,
    DivBoxMobile,
    LinkLogMobile,
} from './style'
import IconLogo from '../../assets/images/icon-barperks.svg'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";


const Header = () => {
    const [menuMobile, openMenuMobile] = useState(false)
      const navigate = useNavigate();

    return (
        <HeaderGlobal>
            <DivBox>
                <Figure onClick={() => navigate('/')}>
                    <TitleLogo>BarPerks</TitleLogo>
                    <ImgLogo src={IconLogo} alt="icone-logo"/>
                </Figure>

                {
                    menuMobile === false ? 
                    <MenuIcon size={'24px'} color={'#000'} cursor={'pointer'} onClick={() => openMenuMobile(true)}/>
                    :
                    <CloseMenuIcon size={'22px'} color={'#000'} cursor={'pointer'} onClick={() => openMenuMobile(false)}/>
                }

                <NavLinks>
                    <LinkSection to={'/'}>Início</LinkSection>
                    <LinkSection to={'/sobre'}>Sobre</LinkSection>
                    <LinkSection to={'/planos'}>Planos</LinkSection>
                    <BoxLinkLog>
                        <LinkLog href={'/inscricao'}>Inscreva-se</LinkLog>
                        <LinkLog href={'/login'} >Login</LinkLog>
                    </BoxLinkLog>
                </NavLinks>
            </DivBox>

            {
                menuMobile !== false ?
                <NavLinksMobile>
                    <DivBoxMobile>
                        <LinkSectionMobile href={'/'}>Início</LinkSectionMobile>
                        <LinkSectionMobile href={'/sobre'}>Sobre</LinkSectionMobile>
                        <LinkSectionMobile href={'/planos'}>Planos</LinkSectionMobile>
                    </DivBoxMobile>

                    <LinkLogMobile href={'/inscricao'}>Inscreva-se</LinkLogMobile>
                    <LinkLogMobile href={'/login'}>Login</LinkLogMobile>
                </NavLinksMobile>
                :
                <></>
            }

        </HeaderGlobal>
    )

}

export default Header