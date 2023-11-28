import styled from "styled-components"
import { BsQuestionLg } from 'react-icons/bs'

export const Input = styled.input`
    padding: 8px;
    width: 300px;
    height: 28px;
    border-radius: 24px;
    background-color: var(--grey-6);
    outline: none;
    border: 2px solid transparent;
    color: var(--grey-0);
    font-size: var(--font-size-4);
    font-weight: 600;
    transition: 0.3s ease;
    max-width: 100%;

    &:focus{
        border: 2px solid var(--grey-0);
    }

    &::placeholder{
        text-align: center;
        opacity: 1;
    }

    @media(max-width: 800px){
        width: 100%;
    }
`

export const InputEdit = styled.input`
    padding: 8px;
    width: 300px;
    height: 28px;
    border-radius: 24px;
    background-color: var(--grey-6);
    outline: none;
    border: 2px solid transparent;
    color: var(--grey-0);
    font-size: var(--font-size-4);
    font-weight: 400;
    transition: 0.3s ease;
    max-width: 100%;

    &:focus{
        border: 2px solid var(--grey-0);
    }

    &::placeholder{
        opacity: 1;
    }

    @media(max-width: 800px){
        width: 100%;
    }
`

export const DivInputCalculate = styled.div`
    display: flex;
    justify-content: space-between;
    position: relative;
    height: 30px;

    button{
        position: absolute;
        right: 5px;
        top: 4px;
        background-color: transparent;
    }

    p{
        display: flex;
        font-size: var(--font-size-5);
        text-align: justify;
        width: 180px;
        height: fit-content;
        background-color: var(--white-fixed);
        border: 2px solid var(--grey-0);
        padding: 5px;
        margin-right: -190px;
        margin-left: 10px;
        margin-top: -10px;

        @media (max-width: 800px) {
            position: absolute;
            margin: 0;
            margin-top: 5px;
            right: 13%;
            top: 30px;
        }
    }

    @media(max-width: 800px){
        width: 100%;
        flex-direction: column;
    }
`

export const IconQuest = styled(BsQuestionLg)`
    color: var(--grey-0);
`