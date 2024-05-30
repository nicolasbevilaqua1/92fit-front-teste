import styled from "styled-components";
import Header from "./components/Header";
import { API_URL, colors } from "./constants";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import axios from "axios";
import { toastError, toastSuccess } from "./ToastEmitter";
import useAuth from "./hooks/useAuthHook";



export default function RecoverPasswordView(){
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [codeSent, setCodeSent] = useState(false);

    useAuth({secure: false});
    

    function handleSubmit(event) {
        event.preventDefault();

        axios.post(`${API_URL}/auth/recovery`, {
            email,
        }).then(function(response) {
            console.log(response);
            toastSuccess('Código enviado ao email!');
            setCodeSent(true);
        }).catch(function(error) {
            toastError(error.response.data.message)
        });
    }

    function handleRecovery(event) {
        event.preventDefault();

        axios.post(`${API_URL}/auth/changePassword`, {
            email,
            newPassword,
            code: Number(code)
        }).then(function(response) {
            console.log(response);
            toastSuccess('Senha alterada com sucesso!', () => navigate('/login'))
        }).catch(function(error) {
            toastError(error.response.data.message)
        });
    }



    return(
        <Container>
            <ToastContainer/>
            <Header>
                <li onClick={() => navigate('/login')}>Login</li>
                <li onClick={() => navigate('/signup')}>Cadastro</li>
            </Header>

            <FormContainer>


            <Form onSubmit={(e) => codeSent ? handleRecovery(e) : handleSubmit(e)}>
                {!codeSent && <h2>Esqueci a senha</h2>}
                {!codeSent && <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}></Input>}
                {!codeSent && <p>Um código será enviado ao email cadastrado.</p>}
                {!codeSent && <SubmitButton>Enviar </SubmitButton>}

                {codeSent && <h2>Recuperação de senha</h2>}
                {codeSent && <Input placeholder="Insira o código" type="text" value={code} onChange={(e) => setCode(e.target.value)}></Input>}
                {codeSent && <Input placeholder="Insira sua nova senha" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}></Input>}
                {codeSent && <SubmitButton>Enviar </SubmitButton>}
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
        margin-bottom: 1.5rem;
    }

    p {
        font-size: .8rem;
        font-weight: 300;
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