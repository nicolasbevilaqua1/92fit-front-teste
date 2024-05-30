import styled from "styled-components";
import Header from "./components/Header";
import { API_URL, colors } from "./constants";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";
import { toastError, toastSuccess } from "./ToastEmitter";
import { useDispatch } from "react-redux";
import { appSlice } from "./storage/store";
import useAuth from "./hooks/useAuthHook";



export default function LoginView(){
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    useAuth({secure: false});
    

    function handleSubmit(event) {
        event.preventDefault();

        axios.post(`${API_URL}/auth/login`, {
            email,
            password,
        }).then(function(response) {
            console.log(response);

            dispatch(appSlice.actions.updateData({
                email: response.data.email,
                id: response.data.id,
                token: response.data.token,
                name: response.data.name,
            }))
            
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('email', response.data.email);
            localStorage.setItem('id', response.data.id);
            localStorage.setItem('name', response.data.name);
            
            toastSuccess('Login bem-sucedido!', () => navigate('/'))
        }).catch(function(error) {
            toastError(error.response.data.message)
        });
    }

    return(
        <Container>
            <ToastContainer/>
            <Header>
                <li onClick={() => navigate('/signup')}>Cadastro</li>
                <li onClick={() => navigate('/ranking')}>Ranking</li>
            </Header>

            <FormContainer>


                <Form onSubmit={(e) => handleSubmit(e)}>
                    <h2>Entrar</h2>
                    <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}></Input>
                    <Input placeholder="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)}></Input>
                    <ForgotPassword onClick={() => navigate('recover')}>Esqueci a senha</ForgotPassword>
                    <SubmitButton>Enviar </SubmitButton>
                </Form>

            </FormContainer>

        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    user-select: none;
`

const FormContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70vh;
    padding-left: 2rem;
    padding-right: 2rem;
    `

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    padding: 2rem;
    gap: .5rem;
    border-radius: 2rem;
    font-family: Roboto;
    width: 100%;
    max-width: 250px;

    h2 {
        font-size: 1.5rem;
        font-weight: 500;
        margin-bottom: 2rem;
    }
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

const Div1 = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: .4rem;

    & > * {
        width: 50%;
    }
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
    margin-top: 1rem;
    cursor: pointer;
`

const ForgotPassword = styled.p`
    color: ${colors.primary};
    font-size: .7rem;
    align-self: flex-end;
    cursor: pointer;
`