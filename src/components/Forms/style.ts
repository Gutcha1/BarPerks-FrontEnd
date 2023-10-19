import styled from 'styled-components'

export const FormStyle = styled.form`
    display: flex;
    flex-direction: column;
    width: 350px;
    margin: 0 auto;

    @media(max-width: 800px){
        width: 280px;
    }
`

export const Span = styled.span`
    color: var(--alert-1);
    font-size: var(--font-size-6);
    font-weight: 500;
    margin-top: -10px;
    margin-bottom: 15px;
`

export const DivBox = styled.div`
    display: flex;
    margin: 0 auto;
    flex-direction: column;

    @media(max-width: 800px){
        display: none;
    }
`

export const DivBoxMobile = styled.div`
    display: flex;
    margin: 0 auto;
    flex-direction: column;

    @media(min-width: 800px){
        display: none;
    }
`

export const LinkForgotPassword = styled.a`
    display: flex;
    font-size: var(--font-size-4);
    font-weight: 600;
    color: var(--grey-0);
    cursor: pointer;
    transition: 0.3s ease;
    margin-top: -5px;
    margin-bottom: 15px;

    &:hover{
        text-decoration: underline;
        transition: 0.3s ease;
    }
`

export const SpanLogin = styled.span`
    display: flex;
    margin: 0 auto;
    color: var(--grey-0);
    font-weight: 600;
    font-size: var(--font-size-3);
    margin-top: 20px;
`

export const DivIcons = styled.div`
    display: flex;
    margin: 0 auto;
    gap: 10px;
    margin-top: 10px;
`

export const IconImage = styled.img`
    width: 40px;
    height: 40px;
    border: 2px solid transparent;
    transition: 0.3s ease;
    cursor: pointer;
    border-radius: 50%;
    padding: 5px;

    &:hover{
        border: 2px solid var(--grey-0);
        transition: 0.3s ease;
    }
`

export const InputFile = styled.input`
    color: var(--gray-0);
    font-size: var(--font-size-4);
    font-size: 500;
    outline: none;
    border: none;
    padding: 10px 0;
    transition: 0.2s ease;
    margin-bottom: 15px;
`

export const LabelFile = styled.label`
    color: var(--gray-0);
    font-size: var(--font-size-2);
    font-size: 600;
    margin-top: 5px;
`