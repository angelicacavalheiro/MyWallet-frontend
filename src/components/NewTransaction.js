/* eslint-disable react/jsx-no-duplicate-props */
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { useHistory } from "react-router-dom";
import { useState, useContext } from 'react';
import UserContext from '.././contexts/UserContext';
import Loader from "react-loader-spinner";
import axios from "axios"

export default function NewTransaction(){

    const {user, transactionType} = useContext(UserContext);
    const[value, setValue] = useState("")
    const[description, setDescription] = useState("")
    const[loading, setLoading] = useState(false)
    const history = useHistory()
    let input, output = false

    function requestTransaction(event) {

        event.preventDefault();

        setLoading(true)

        if (transactionType === "input"){
            input = true
            output = false
        } else {
            input = false
            output = true
        }

        if(value <= 0){
            setLoading(false)
            return  Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'O valor inserido precisa ser maior do que zero!'
            })
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

        axios.post(`${process.env.REACT_APP_API_URL}movimento`, body, config)
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
        {(transactionType === "input") ?
                " entrada"
                :
                " saída"
                }
        </Title>
        <form onSubmit={requestTransaction}>
            <input
                type="number"
                pattern='^[1-9]\d{0,2}(\.\d{3})*,\d{2}$'
                min="1"
                step="any"
                required
                placeholder="Valor"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={loading}
            />

            <input
                type="text"
                description="input"
                placeholder="Descrição"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={loading}
            />

            {(loading) ?
            <button> <Loader type="ThreeDots" color="#ffeecf" height={45} width={80} disabled={loading}/> </button>
             :
            <button onClick={requestTransaction}> Salvar {(transactionType === "input") ? "entrada" : "saída"} </button>}
        </form>
    </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    background: #D36582;

    p {
        font-family: Raleway;
        font-weight: bold;
        font-size: 15px;
        line-height: 18px;
        color: #ffeecf;
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
        opacity: ${props => props.disabled ? 0.7 : 1};
        background: ${props => props.disabled ? "#F2F2F2" : "#ffeecf"};
        pointer-events: ${props => props.disabled ? "none" : "visiblePainted"};
    }
    button{
        width: 326px;
        height: 46px;
        background: #253C78;
        border-radius: 4.63636px;
        border-color: #253C78;
        margin: 0 auto 13px auto;
        padding: 11px auto 12px auto;
        font-family: Raleway;
        font-weight: bold;
        font-size: 20px;
        line-height: 23px;
        color: #ffeecf;
        opacity: ${props => props.disabled ? 0.7 : 1};
        pointer-events: ${props => props.disabled ? "none" : "visiblePainted"};
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
    color: #ffeecf;
    width: 326px;
    margin: 25px auto 40px auto;
    color: #ffeecf;
`;