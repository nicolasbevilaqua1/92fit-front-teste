import Header from "./components/Header";
import styled from "styled-components"
import { API_URL, colors } from "./constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./hooks/useAuthHook";
import { ToastContainer } from "react-toastify";
import { toastPromise } from "./ToastEmitter";
import { useSelector } from "react-redux";



export default function CustomRankingView() {
    // const [leaderboard, setLeaderboard] = useState([]);
    const [code, setCode] = useState();
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const token = useSelector((state) => state.app.token);
    const userName = useSelector((state) => state.app.name);
    const userId = useSelector((state) => state.app.id);

    useAuth({secure: true});

    function handleCreate(e){
        e.preventDefault();
        console.log(name)

        toastPromise(axios.post(`${API_URL}/ranking/create`, {
            userId,
            name,
            userName
        }, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }), {
            pending: 'Criando ranking personalizado...',
            id: 'criar_personalizado',
            // error: 
            success: 'Ranking criado com sucesso!'
        })
    }

    function handleEnter(e){
        e.preventDefault();

        toastPromise(axios.post(`${API_URL}/ranking/enter`, {
            userId,
            code,
            name: userName
        }, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }), {
            pending: 'Entrando no ranking personalizado...',
            id: 'entrar_personalizado',
            // error: 
            success: 'Inscrição no ranking com sucesso!'
        })
    }


    return (
        <Container>
            <ToastContainer/>
            <Header>
                <li onClick={() => navigate('/')}>Home</li>
                <li onClick={() => navigate('/ranking/custom')}>Meus rankings</li>
            </Header>

            <Body>

                <Title>Rankings personalizados</Title>
                <Form onSubmit={(e) => handleCreate(e)}>
                    <Title>Criar um ranking personalizado</Title>
                    <Input type="text" placeholder="Nome do ranking" value={name} onChange={(e) => setName(e.target.value)}/>
                    <SubmitButton>Criar</SubmitButton>
                </Form>
                <Form onSubmit={(e) => handleEnter(e)}>
                    <Title>Entrar em um ranking personalizado</Title>
                    <Input type="text" placeholder="Código do grupo. Ex: 123456"  value={code} onChange={(e) => setCode(Number(e.target.value))}/>
                    <SubmitButton>Entrar</SubmitButton>
                </Form>

                

            </Body>

            


        </Container>
    );
}


const Container =  styled.div`
    display: flex;
    flex-direction: column;
    user-select: none;
    font-family: Roboto;
`

const Body = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 2rem;
    padding-left: 2rem;
    padding-right: 2rem;
    min-height: 80vh;
    gap: 2rem;
    padding-bottom: 4rem;
`

const Title = styled.h1`
    color: ${colors.blackText};
    font-weight: 500;
    font-size: 1.5rem;
    text-align: center;
    
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    gap: 2rem;
    background-color: white;
    padding: 2rem;
    border-radius: 16px;
    max-width: 300px;
`

const Input = styled.input`
    width: calc(100% - 1rem - 4px);
    padding: .5rem;
    border: 2px solid ${colors.grayBorder};
    border-radius: 0.5rem;
    font-family: Roboto;
    font-weight: 300;
    color: ${colors.blackText};
`

const SubmitButton = styled.button`
    width: 100%;
    padding: .5rem;
    background-color: ${colors.primary};
    border: 2px solid ${colors.primary};
    border-radius: 8px;
    color: #fff;
    font-family: Roboto;
    font-weight: 500;
    font-size: 1rem;
    margin-top: -1rem;
    cursor: pointer;
`