import styled from 'styled-components'
import Swal from 'sweetalert2';
import { Link, useHistory } from "react-router-dom"
import { useState, useContext } from 'react'
import UserContext from '.././contexts/UserContext'
import Loader from "react-loader-spinner"
import axios from "axios"

export default function Login(){

    const {setUser} = useContext(UserContext);
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[loading, setLoading] = useState(false)
    const history = useHistory()

    function requestLogin(event) {
        setLoading(true)
        event.preventDefault(); // impede o redirecionamento

        const body = {email, senha: password}

        axios.post(`${process.env.REACT_APP_API_URL}sign-in`, body)
        .then(res => {
            setUser(res.data);
            localStorage.setItem('@user', JSON.stringify(res.data));
            history.push('/transactions')
            setLoading(false)
        })

        .catch(err => {
            setLoading(false)
            console.log(err)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo deu errado!'
            })
        })
    }

    return(
        <Container >
        <Logo> MyWallet </Logo>
        <form  onSubmit={requestLogin}>

            <input type="email" email="input" required placeholder="E-mail"
            value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />

            <input type="password" password="input" placeholder="Senha"
            value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading}/>

            <button onClick={requestLogin} disabled={loading}>
                        {(loading) ?
                        <Loader type="ThreeDots" color="#ffeecf" height={45} width={80} />
                        :  "Entrar"}
            </button>

            <Link to={`/register`} style={{textDecoration: 'none'}} disabled={loading}>
                <p>Primeira vez? Cadastre-se</p>
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
        margin: 36px auto 192px auto;
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

const Logo = styled.div`
    width: 147px;
    height: 50px;
    margin: 159px auto 24px auto;
    font-family: Saira Stencil One;
    font-size: 32px;
    line-height: 50px;
    color: #ffeecf;
`;