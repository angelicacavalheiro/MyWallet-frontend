import styled from 'styled-components';
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState, useContext } from 'react';
import UserContext from '.././contexts/UserContext';
import axios from "axios"
import Balance from './Balance';


export default function TransactionList(){

    const history = useHistory()
    const {user, setTransactionType} = useContext(UserContext);

    const [moviments, setMoviments] = useState(null)

    function redirectToNewTransaction(event) {         
        setTransactionType(event)                 
        history.push('/newTransaction') //só pra testar           
    }

    useEffect(() => {

        const config = {
            headers:{
                Authorization: `Bearer ${user.token}`
            }
        }

        axios.get('http://localhost:4000/movimento', config)
        .then(res => {
            setMoviments(res.data)
        })  
    } , []);


    return(
        <Container>
            <Title> Olá, fulano</Title>    

            {
                 moviments == null || moviments.length == 0
                 ?
                 <NoTransactions>Não há registros de entrada ou saída</NoTransactions>                 
                 :
                 (
                    <ShowTransactions>
                    {moviments.reverse().map((moviment) => (                
                        <div style={moviment.entrada === "true" ? {color: "#03AC00"}: {color: "#C70000"} }>                       
                            <h1>{moviment.data}</h1>  
                            <h2>{moviment.descricao}</h2>              
                            <h3>{moviment.valor}</h3>                                                    
                        </div>                
                    ))}
                        <Balance/>
                    </ShowTransactions> 
                 )
            }            

            <Options>
                <button onClick={() => redirectToNewTransaction("input")}> + Nova Entrada </button>
                <button onClick={() => redirectToNewTransaction("output")}> - Nova Saída </button>
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

const NoTransactions = styled.div`
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
    text-align: center;
`;

const ShowTransactions = styled.div`
    width: 326px;
    height: 446px;
    background: #FFFFFF;
    border-radius: 5px;   
    margin: 0 auto 13px auto;
    overflow-y: scroll;
    
    &::-webkit-scrollbar {
    width: 8px;
    }
    &::-webkit-scrollbar-track {
    background: #C6C6C6;
    border-radius: 5px;
    }
    &::-webkit-scrollbar-thumb {
    background-color: #8C11BE;
    border-radius: 5px;
    }
    h1{
        color: #C6C6C6;
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
`;

const Title = styled.div`
    height: 50px;
    margin: 28px auto 22px 45px;
    font-family: Raleway;
    font-style: normal;
    font-weight: bold;
    font-size: 26px;
    line-height: 31px;
    color: #FFFFFF;
`;