import styled from 'styled-components';
import { Link, useHistory } from "react-router-dom";
import { useState } from 'react';


export default function TransactionList(){

    const history = useHistory()

    function redirectToNewTransaction() {            
        history.push('/newTransaction') //só pra testar           
    }

    return(
        <Container>
        <Title> Olá, fulano </Title>

        <ShowTransactions>Não há registros de entrada ou saída</ShowTransactions>            

        <Options>
            <button onClick={redirectToNewTransaction}> + Nova Entrada </button>
            <button onClick={redirectToNewTransaction}> - Nova Saída </button>
        </Options>
        
        
    </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;	
    width: 100vw;
    height: 100vh;
    background: #8C11BE;    
	
	p {
        font-family: Raleway;
        font-weight: bold;
        font-size: 15px;
        line-height: 18px;
        color: #FFFFFF;
        width: 227px;
        height: 18px;
        text-align: center;
        margin: 36px auto 192px auto;
	}
    button{
        width: 155px;
        height: 114px;
        background: #A328D6;
        border-radius: 5px;
        border-color: #A328D6;
        font-family: Raleway;
        font-weight: bold;
        font-size: 20px;
        line-height: 23px;
        color: #FFFFFF;

    }
    
`;

const ShowTransactions = styled.div`
    width: 326px;
    height: 446px;
    background: #FFFFFF;
    border-radius: 5px;   
    margin: 0 auto 13px auto;

    font-family: Raleway;
    font-size: 20px;
    line-height: 23px;
    color: #868686;
    display:flex;
    padding: 200px 72px 200px 73px;
    align-items: center;
`;

const Options = styled.div `
    width: 325px;
    margin: 0 auto 16px auto;
    justify-content: space-between;    
    display:flex;
`;

const Title = styled.div`
    height: 50px;
    margin: 28px auto 22px 24px;
    font-family: Raleway;
    font-style: normal;
    font-weight: bold;
    font-size: 26px;
    line-height: 31px;
    color: #FFFFFF;
`;