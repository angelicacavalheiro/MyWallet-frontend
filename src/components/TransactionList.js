/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import { useHistory } from "react-router-dom";
import { useEffect, useState, useContext } from 'react';
import { BsPlusCircle, BsDashCircle } from 'react-icons/bs';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import UserContext from '.././contexts/UserContext';
import axios from "axios"
import Balance from './Balance';

export default function TransactionList(){

    const history = useHistory()
    const {user, setUser, setTransactionType} = useContext(UserContext);

    const [moviments, setMoviments] = useState(null)
    const [userName, setUserName] = useState(null)

    function redirectToNewTransaction(event) {
        setTransactionType(event)
        history.push('/newTransaction') //só pra testar
    }

    function redirectToLogout(){
        localStorage.clear();
        setUser("")
        history.push('/')
    }

    useEffect(() => {

        const config = {
            headers:{
                Authorization: `Bearer ${user.token}`
            }
        }

        axios.get(`${process.env.REACT_APP_API_URL}movimento`, config)
        .then(res => {
            setMoviments(res.data)
        })

        axios.get(`${process.env.REACT_APP_API_URL}sign-in`, config)
        .then(res => {
            setUserName(res.data)
        })
        .catch(err => {
            console.log(err)
        })

    } , []);

    return(
        <Container>
            <TopStyled>
                {(userName != null) ? <Title> Olá, {userName[0].toUpperCase() + userName.substr(1)}</Title> : " "}
                <RiLogoutBoxRLineStyled onClick={() => redirectToLogout()}/>
            </TopStyled>

            {
                 moviments == null || moviments.length === 0
                 ?
                 <NoTransactions>Não há registros de entrada ou saída</NoTransactions>
                 :
                 (
                    <ShowTransactions>
                    {moviments.map((moviment, index) => (
                        <div key={index} style={moviment.entrada === "true" ? {color: "#03AC00"}: {color: "#C70000"} }>
                            <h1>{moviment.data}</h1>
                            <h2>{moviment.descricao}</h2>
                            <h3>{(moviment.valor).replace('.', ',')}</h3>
                        </div>
                    ))}
                        <Balance/>
                    </ShowTransactions>
                 )
            }
            <Options>
                <button onClick={() => redirectToNewTransaction("input")}>
                    <BsPlusCircleStyled/> Nova <br/> entrada
                </button>
                <button onClick={() => redirectToNewTransaction("output")}>
                    <BsDashCircleStyled/> Nova  <br/> saída
                </button>
            </Options>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    background: #D36582;

    button{
        width: 155px;
        height: 114px;
        background: #253C78;
        border-color: #253C78;
        border-radius: 5px;
        font-family: Raleway;
        font-weight: bold;
        font-size: 20px;
        line-height: 23px;
        color: #ffeecf;
    }

	p {
        font-family: Raleway;
        font-weight: bold;
        font-size: 15px;
        line-height: 18px;
        color: #ffeecf;
        width: 227px;
        height: 18px;
        text-align: center;
        margin: 36px auto 192px auto;
	}
`;
const TopStyled = styled.div`
    display: flex;
    justify-content: space-between;
    width: 326px;
    margin: 25px auto 22px auto;
    color: #ffeecf;
`;

const Title = styled.div`
    font-family: Raleway;
    font-weight: bold;
    font-size: 26px;
    line-height: 31px;
`;

const RiLogoutBoxRLineStyled = styled(RiLogoutBoxRLine)`
    font-size: 35px;
`;

const NoTransactions = styled.div`
    width: 326px;
    height: 446px;
    background: #ffeecf;
    border-radius: 5px;
    margin: 0 auto 13px auto;

    font-family: Raleway;
    font-size: 20px;
    line-height: 23px;
    color: #868686;
    display:flex;
    padding: 200px 72px 200px 73px;
    align-items: center;
    text-align: center;
`;

const ShowTransactions = styled.div`
    width: 326px;
    height: 446px;
    background: #ffeecf;
    border-radius: 5px;
    margin: 0 auto 13px auto;
    overflow-y: scroll;

    &::-webkit-scrollbar {
    width: 8px;
    }
    &::-webkit-scrollbar-track {
    background: #ffeecf;
    border-radius: 5px;
    }
    &::-webkit-scrollbar-thumb {
    background-color: #C6C6C6;
    border-radius: 5px;
    }
    h1{
        color: #253C78;
        width: 60px;
    }
    h2{
        color: #000000;
        width: 175px;
    }
    h3{
        width: 72px;
        display: flex;
        justify-content: flex-end;
    }
    div{
        display: flex;
        height: 24px;
        width: 307px;
        margin: 23px auto 0 auto;
        font-family: Raleway;
        font-size: 16px;
    }
`;

const Options = styled.div `
    width: 325px;
    margin: 0 auto 16px auto;
    justify-content: space-between;
    display:flex;
    color: #ffeecf;
    button{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        text-align: left;
        font-size: 17px;
    }
`;

const BsPlusCircleStyled = styled(BsPlusCircle)`
    font-size: 20px;
`;

const BsDashCircleStyled = styled(BsDashCircle)`
    font-size: 20px;
`;
