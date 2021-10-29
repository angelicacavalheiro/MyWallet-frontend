import styled from 'styled-components';
import { Link, useHistory } from "react-router-dom";
import { useState } from 'react';
import Loader from "react-loader-spinner";
import axios from "axios"

export default function Register(){

    const[name, setName] = useState("")
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[confirmPassword, setConfirmPassword] = useState("")
    const[loading, setLoading] = useState(false)
    const history = useHistory()
    
    function requestRegistration(event) {    
        setLoading(true)
        history.push('/register') //só pra testar    
        event.preventDefault(); // impede o redirecionamento   

        const body = {
            nome: name,
            email,
            senha: password,
            confirma_senha: confirmPassword
        }

        axios.post('https://mywallet-driven.herokuapp.com/sign-up', body)
        .then(res => {
            setLoading(false)
            console.log(res.data)
            history.push('/')
        })

        .catch(err => {
            setLoading(false)
            console.log(err)
            alert("tente novamente")
    })
    }

    return(
        <Container loading={loading} >
        <Logo> MyWallet </Logo>
        <form onSubmit={requestRegistration}>

            <input type="text" name="input" required placeholder="Nome" 
            value={name} onChange={(e) => setName(e.target.value)}/>

            <input type="email" email="input" required placeholder="E-mail" 
            value={email} onChange={(e) => setEmail(e.target.value)}/>

            <input type="password" password="input" placeholder="Senha" 
            value={password} onChange={(e) => setPassword(e.target.value)}/>

            <input type="password" password="input" placeholder="Confirme a senha" 
            value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>            

            {(loading === true) ? 
            <button> <Loader type="ThreeDots" color="#FFFFFF" height={45} width={80} /> </button>
             : <button onClick={requestRegistration}> Cadastrar </button>}

            <Link to={`/`} style={{textDecoration: 'none'}}>
                <p>Já tem uma conta? Entre agora!</p>
            </Link>
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

const Logo = styled.div`
    width: 147px;
    height: 50px;
    margin: 95px auto 28px auto;

    font-family: Saira Stencil One;
    font-size: 32px;
    line-height: 50px;
    color: #FFFFFF;	
`;