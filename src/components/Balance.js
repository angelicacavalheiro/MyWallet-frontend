import styled from 'styled-components';
import { useEffect, useState, useContext } from 'react';
import UserContext from '.././contexts/UserContext';
import axios from "axios"

export default function Balance(){

    const {user} = useContext(UserContext);
    const [moviments, setMoviments] = useState(null)
    let saldo = 0;

    useEffect(() => {

        const config = {
            headers:{
                Authorization: `Bearer ${user.token}`
            }
        }

        axios.get(`${process.env.REACT_APP_HOST_API}movimento`, config)
        .then(res => {
            setMoviments(res.data)
        })
    } , []);

    function calculateBalance(){
        moviments.map((moviment) => {
            if(moviment.valor != null)   {
                moviment.entrada == "true"
                ?
                    saldo = saldo + parseFloat(moviment.valor)
                :
                    saldo = saldo - parseFloat(moviment.valor)
            }
        })
    }

    if(moviments === null){
        return ""
    }

    calculateBalance()

    return(
        <ShowBalance >
            <h4>SALDO</h4>
            <h5 style={saldo >= 0 ? {color: "#03AC00"} : {color: "#C70000"} }> {(saldo).toString().replace('.', ',')} </h5>
        </ShowBalance>
    )
}

const ShowBalance = styled.section`
    padding-left: 10px;
    border-radius: 5px;
    background-color: #ffffff;
    margin: 10px auto 0 auto;
    display: flex;
    height: 24px;
    width: 313px;
    font-family: Raleway;
    font-size: 17px;
    line-height: 20px;
    justify-content: space-between;
    h4{
        font-weight: bold;
        color: #000000;
    }
    h5{
        text-align: right;
    }
`;

