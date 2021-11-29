import styled from 'styled-components';
import { useHistory } from "react-router-dom";
import { useState, useContext } from 'react';
import UserContext from '.././contexts/UserContext';
import Loader from "react-loader-spinner";
import axios from "axios"

export default function NewTransaction(){

    const {user, transactionType} = useContext(UserContext);
    const[value, setValue] = useState()
    const[description, setDescription] = useState("")
    const[loading, setLoading] = useState(false)
    const history = useHistory()
    let input, output = false

    function requestTransaction(event) {

        event.preventDefault();

        setLoading(true)

        if (transactionType == "input"){
            input = true
            output = false
        } else {
            input = false
            output = true
        }

        if(value <= 0){
            setLoading(false)
            return alert("o valor precisa ser maior que zero")
        }

        const config = {
            headers:{
                Authorization: `Bearer ${user.token}`
            }
        }

        const body = {
            valor: parseFloat(value).toFixed(2).replace(',', '.'),
            entrada: input,
            saida: output,
            descricao: description
        }

        axios.post(`${process.env.REACT_APP_HOST_API}movimento`, body, config)
        .then(res => {
            setLoading(false)
            history.push('/transactions')
        })
        .catch(err => {
            setLoading(false)
            console.log(err)
        })
    }

    return(
        <Container>
        <Title> Nova
        {(transactionType == "input") ?
                " entrada"
                :
                " saída"
                }
        </Title>
        <form onSubmit={requestTransaction}>
            <input type="number" pattern='^[1-9]\d{0,2}(\.\d{3})*,\d{2}$' min="1" step="any" value="input" required placeholder="Valor"
            value={value} onChange={(e) => setValue(e.target.value)}/>

            <input type="text" description="input" placeholder="Descrição"
            value={description} onChange={(e) => setDescription(e.target.value)}/>

            {(loading === true) ?
            <button> <Loader type="ThreeDots" color="#FFFFFF" height={45} width={80} /> </button>
             :
            <button onClick={requestTransaction}> Salvar {(transactionType == "input") ? "entrada" : "saída"} </button>}
        </form>
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
        margin: 32px auto 114px auto;
    }
    input{
        width: 326px;
        height: 58px;
        border: 1px solid #D5D5D5;
        padding: 18px 0 17px 15px;
        border-radius: 5px;
        margin: 0 auto 13px auto;
        font-family: Raleway;
        font-size: 20px;
        line-height: 23px;
        color: #000000;
        opacity: ${props => props.loading ? 0.7 : 1};
        background: ${props => props.loading ? "#F2F2F2" : "#FFFFFF"};
        pointer-events: ${props => props.loading ? "none" : "visiblePainted"};
    }
    button{
        width: 326px;
        height: 46px;
        background: #A328D6;
        border-radius: 4.63636px;
        border-color: #A328D6;
        margin: 0 auto 13px auto;
        padding: 11px auto 12px auto;
        font-family: Raleway;
        font-weight: bold;
        font-size: 20px;
        line-height: 23px;
        color: #FFFFFF;
        opacity: ${props => props.loading ? 0.7 : 1};
        pointer-events: ${props => props.loading ? "none" : "visiblePainted"};
    }
    form {
        text-align: center;
        display: flex;
        flex-direction: column;
    }
`;

const Title = styled.div`
    font-family: Raleway;
    font-weight: bold;
    font-size: 26px;
    line-height: 31px;
    color: #FFFFFF;
    width: 326px;
    margin: 25px auto 40px auto;
    color: #FFFFFF;
`;